import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StudyDesign} from '../../shared/model/study-design';
import {isNullOrUndefined} from 'util';
import {StudyService} from '../../shared/services/study.service';
import {Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Cluster} from '../../shared/model/Cluster';
import {Predictor} from '../../shared/model/Predictor';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';
import {GoogleAnalyticsService} from '../../shared/services/google-analytics.service';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../../shared/model/constants';
import {Result} from '../../shared/model/Results';
import * as math from 'mathjs';
import {timeout, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import { of } from 'rxjs'

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CalculateComponent implements OnInit, OnDestroy {
  private _studyDesign: StudyDesign;
  private _studySubscription: Subscription;
  private _withinIsuClusterSubscription: Subscription;
  private _betweenIsuPredictorsSubscription: Subscription;
  private _outputString: string;
  private _resultString;
  private _e2eTest: boolean;
  private _isShowDetail: boolean;
  private _detailPower: number;
  private _detailCluster: Cluster;
  private _detailClusterName: string;
  private _detailClusterLevels: Array<Object>;
  private _detailClusterOverview: Array<String>;
  private _detailPredictorCombination: Array<Array<string>>;
  private _detailPredictor: Array<Predictor>;
  private _detailSampleSize: number;
  private _currentSelected: number;
  private _resultForDisplay: Array<Result>;
  private _downloadData: SafeUrl;
  private _combinationsValueMap: Object;
  private _showHelpTextSubscription: Subscription;
  private _smallestGroupSize: number;
  private _sumOfCombinationsValue: number;
  private _selected_tab: string;
  private _resultSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private ref: ChangeDetectorRef,
              private navigation_service: NavigationService,
              private googleAnalyticsService: GoogleAnalyticsService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.studySubscription = this.study_service.studyDesign$.subscribe( study => {
      this._studyDesign = study;
    });

    this._withinIsuClusterSubscription = this.study_service.withinIsuCluster$.subscribe(
      cluster => {
        this.detailCluster = cluster;
        if (this.detailCluster) {
          this.detailClusterLevels = cluster.levels;
        }
      }
    );
    this._betweenIsuPredictorsSubscription = this.study_service.betweenIsuPredictors$.subscribe(
      predictor => {
        this.detailPredictor = predictor;
      }
    )
    this._e2eTest = environment.e2eTest;

    this._isShowDetail = false;
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this._selected_tab = 'results';
  }

  ngOnInit() {
    this._afterInit = true;
    if (!isNullOrUndefined(this._studyDesign)) {
      this.outputString = JSON.stringify(this._studyDesign);
      this.detailPredictorCombination = [];
    } else {
      this.outputString = 'HMMM......';
      this.resultString = 'no results yet';
    }
    this.selectTab('design');
  }

  ngOnDestroy() {
    this.studySubscription.unsubscribe();
    this._withinIsuClusterSubscription.unsubscribe();
    this._betweenIsuPredictorsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  get postModel(): Observable<any> {
    this.isShowDetail = false;
    const output = this.outputString;
    this.googleAnalyticsService.eventEmitter(
      'calculate',
      'calculate ' + this.googleEventValue,
      'calculate ' + this.googleEventValue,
      'calculate ' + this.googleEventValue,
      1);
    return this.http.post(
      environment.calculateUrl,
      output,
      this.jsonHeader()
    ).pipe(
      timeout(60000), catchError(error => this.handleError(error))
    );
  }

  calculateResults() {
    this._resultSubscription = this.postModel.subscribe(response => {
      this.resultString = response;
      this.buildResultTable();
      if (this.detailCluster) {
        this.detailClusterOverview = this.detailCluster.buildClusterOverview();
      }
      if (this.detailPredictor) {
        this.generateCombinations(this.detailPredictor);
      }
      this.buildCombinationsValueMap(this.studyDesign['_isuFactors']['betweenIsuRelativeGroupSizes']);
      this._sumOfCombinationsValue = this.getSumOfCombinationsValue();
    });
  }

  downloadResult() {
    this.makeCsvFile();
    this.ref.detectChanges();
    document.getElementById('downloadCsv').click();
  }

  makeCsvFile() {
    let csvContent = '';
    Object.keys( this.resultString.results[0]).forEach(key => {
      if (key !== 'model') {
        csvContent = csvContent + key.replace('_', ' ') + ',';
      }
    });
    csvContent = csvContent + 'means scale factor,variability scale factor\r\n';
    for (const result of this.resultString.results) {
      Object.keys(result).forEach(key => {
        if (key !== 'model') {
          csvContent = csvContent + result[key] + ',';
        }
      });
      csvContent = csvContent + result.model.means_scale_factor + ',' + result.model.variance_scale_factor + '\r\n';
    }
    this.downloadData = this.sanitizer.bypassSecurityTrustUrl('data:text/csv;charset=utf-8,' + encodeURI(csvContent));
  }

  buildResultTable() {
    const results = [];

    for (const result of this.resultString.results) {
      results.push(Result.fromJSON(JSON.stringify(result)));
    }
    this.resultForDisplay = results;
    this._selected_tab = 'results';
  }

  private handleError(error): Observable<any> {
    const samplesizeError = 'The inputs you gave did not allow computing a solution that met your requirements. \n' +
    '\n' +
    'It is possible that you are specifying a pattern corresponding to the null being true, for which power = alpha. \n' +
    'Switch to calculating power for one or more fixed sample sizes (defined from smallest group size), and examine the results.\n' +
    '\n' +
    'If the error still persists, please contact us at samplesizeshop@gmail.com.';
    const powerError = 'Sorry, something seems to have gone wrong with our calculations. Please contact us at samplesizeshop@gmail.com.';
    return of({
      'status': 200,
      'mimetype': 'application/json',
      'results': [{
        'test': null,
        'samplesize': this.isSamplesize() ? samplesizeError : powerError,
        'power': this.isSamplesize() ? samplesizeError : powerError,
        'model': {
          'essence_design_matrix': null,
          'repeated_rows_in_design_matrix': null,
          'full_beta': false,
          'hypothesis_beta': null,
          'c_matrix': null,
          'u_matrix': null,
          'sigma_star': null,
          'theta_zero': null,
          'alpha': null,
          'total_n': null,
          'theta': null,
          'm': null,
          'nu_e': null,
          'hypothesis_sum_square': null,
          'error_sum_square': null,
          'errors': [[this.isSamplesize() ? samplesizeError : powerError]],
          'test': null,
          'target_power': null,
          'smallest_group_size': null,
          'means_scale_factor': null,
          'variance_scale_factor': null,
          'smallest_realizable_design': null,
          'delta': null,
          'groups': null,
          'power_method': null,
          'quantile': null,
          'confidence_interval': null,
          'orthonormalize_u_matrix': false
        },
        'glimmpse_calc_version': '3.1.3'}]});
  }

  private jsonHeader() {
    const header = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return header;
  }

  toTex(matrix: Array<Array<number>>): string {
    let texString = '$\\begin{bmatrix}';
    if (isNullOrUndefined(matrix)) {
      texString = texString + '\\\\';
    } else {
      matrix.forEach(row => {
        row.forEach( col => {
          if (math.abs(col) < 0.00000000000001) {
            col = 0.00;
          }
          texString = texString + col.toPrecision(3) + ' & '
        });
        texString = texString.slice(0, texString.length - 2) + '\\\\';
      });
    }
    texString = texString.slice(0, texString.length - 2) + '\\end{bmatrix}$';
    return texString;
  }

  formatNumber(num: number) {
    if (isNullOrUndefined(num)) {
      return ''
    } else if (isNaN(Number(num.toString()))) {
      return num;
    } else {
      if (num < 0.00000000000001) {
        num = 0.00;
      }
      return num.toPrecision(3);
    }
  }

  private resultsContainModel() {
    if (!isNullOrUndefined(this.resultString)
      && !isNullOrUndefined(this.resultString.results)
      && this.resultString.results.length > 0
      && !isNullOrUndefined(this.resultString.results[0].model)) {
      return true;
    } else {
      return false;
    }
  }

  private matrixWithLabel(label, m) {
    if (m !== null) {
      const mtex = this.toTex(m);
      return '$' + label + mtex.substring(1, mtex.length);
    } else {
      return '';
    }
  }

  get essence_design_matrix_tex() {
    if (this.resultsContainModel()) {
      return this.matrixWithLabel('Es(\\mathbf{X}) = ', this.resultString.results[0].model.essence_design_matrix);
    } else {
      return 'No model in results'
    }
  }

  get full_beta_tex() {
    if (this.isFullBeta) {
      return this.matrixWithLabel('\\mathbf{B} = ', this.resultString.results[0].model.hypothesis_beta);
    } else {
      return 'No model in results'
    }
  }

  get isFullBeta() {
    if (this.resultsContainModel()
      && !isNullOrUndefined(this.resultString.results[0].model.full_beta)
      && this.resultString.results[0].model.full_beta) {
      return true
    } else {
      return false
    }
  }

  get isHypothesisBeta() {
    if (this.resultsContainModel()
      && !isNullOrUndefined(this.resultString.results[0].model.hypothesis_beta)
      && !this.resultString.results[0].model.full_beta) {
      return true
    } else {
      return false
    }
  }

  get hypothesis_beta_tex() {
    if (this.isHypothesisBeta) {
      return this.matrixWithLabel('\\mathbf{B}_{hyp} = ', this.resultString.results[0].model.hypothesis_beta);
    } else {
      return 'No model in results'
    }
  }

  get c_matrix_tex() {
    if (this.resultsContainModel()) {
      return this.matrixWithLabel('\\mathbf{C} = ', this.resultString.results[0].model.c_matrix);
    } else {
      return 'No model in results'
    }
  }
  get u_matrix_tex() {
    if (this.resultsContainModel()) {
      return this.matrixWithLabel('\\mathbf{U} = ', this.resultString.results[0].model.u_matrix);
    } else {
      return 'No model in results'
    }
  }
  get sigma_star_description_tex() {
    if (!this.resultsContainModel()) {
      return 'No model in results';
    }
    if (this.isCustomOrPolynomialHypothesis) {
      let description =  '$\\mathbf{\\Sigma}_{*} = \\mathbf{U}\'' +
        ' (\\mathbf{\\Sigma}_o \\otimes \\mathbf{\\Sigma}_r \\otimes \\mathbf{\\Sigma}_c) ' +
        ' \\mathbf{U}';
      if (this.resultString.results[0].model.sigma_star_gaussian_adjustment !== null) {
        description = description + ' - \\mathbf{U}\'\\mathbf{\\Sigma}_{yg}\\sigma_{g}^{-2}\\mathbf{\\Sigma}_{yg}\'\\mathbf{U}';
      }
      description = description + '$';
      return description;
    } else {
      let description =  '$\\mathbf{\\Sigma}_{*} = (\\mathbf{U}\'_{o} \\mathbf{\\Sigma}_o \\mathbf{U}_o) ' +
      ' \\otimes (\\mathbf{U}_r\' \\mathbf{\\Sigma}_r \\mathbf{U}_r) ' +
      '\\otimes (\\mathbf{U}_c\' \\mathbf{\\Sigma}_c \\mathbf{U}_c)';
      if (this.resultString.results[0].model.sigma_star_gaussian_adjustment !== null) {
        description = description + ' - \\mathbf{U}\'\\mathbf{\\Sigma}_{yg}\\sigma_{g}^{-2}\\mathbf{\\Sigma}_{yg}\'\\mathbf{U}'
      }
      description = description + '$';
      return description;
    }
  }
  get sigma_star_tex() {
    if (this.resultsContainModel()) {
      if (this.isCustomOrPolynomialHypothesis) {} else {}
      let outcome_component = this.toTex(this.resultString.results[0].model.sigma_star_outcome_component);
      outcome_component = outcome_component.substring(1, outcome_component.length - 1);
      let cluster_component = this.toTex(this.resultString.results[0].model.sigma_star_cluster_component);
      cluster_component = cluster_component.substring(1, cluster_component.length - 1);
      let repeated_measure_component = this.toTex(this.resultString.results[0].model.sigma_star_repeated_measure_component);
      repeated_measure_component = repeated_measure_component.substring(1, repeated_measure_component.length - 1);
      let gaussian_adjustment = this.toTex(this.resultString.results[0].model.sigma_star_gaussian_adjustment);
      gaussian_adjustment = gaussian_adjustment.substring(1, gaussian_adjustment.length - 1);
      let sigma_star = this.toTex(this.resultString.results[0].model.sigma_star);
      sigma_star = sigma_star.substring(1, sigma_star.length - 1);

      let start = '$= ';
      let end  = '';

      if (this.isCustomOrPolynomialHypothesis) {
        start = start + '\\mathbf{U}\' \\otimes (';
        end = ') \\otimes \\mathbf{U}' + end;
      }

      if (this.resultString.results[0].model.sigma_star_gaussian_adjustment !== null) {
        return start + outcome_component + ' \\otimes ' + repeated_measure_component + ' \\otimes ' + cluster_component
          + ' - ' + gaussian_adjustment + end + ' = ' + sigma_star + '$';
      } else {
        return start + outcome_component + ' \\otimes ' + repeated_measure_component + ' \\otimes ' + cluster_component
          + end + ' = ' + sigma_star + '$';
      }
    } else {
      return 'No model in results'
    }
  }
  get theta_zero_tex() {
    if (this.resultsContainModel()) {
      return this.matrixWithLabel('\\mathbf{\\Theta}_{0} = ', this.resultString.results[0].model.theta_zero);
    } else {
      return 'No model in results'
    }
  }
  get alpha_tex() {
    if (this.resultsContainModel()) {
      return '$\\alpha = ' + this.resultString.results[0].model.alpha + '$';
    } else {
      return 'No model in results'
    }
  }
  get theta_tex() {
    if (this.resultsContainModel()) {
      return this.matrixWithLabel('\\mathbf{\\Theta} = ', this.resultString.results[0].model.theta);
    } else {
      return 'No model in results'
    }
  }
  get m_tex() {
    if (this.resultsContainModel()) {
      return this.matrixWithLabel('\\mathbf{M} = ', this.resultString.results[0].model.m);
    } else {
      return 'No model in results'
    }
  }
  get nu_e_tex() {
    if (this.resultsContainModel()) {
      return '$\\nu_e = ' + this.resultString.results[0].model.nu_e + '$';
    } else {
      return 'No model in results'
    }
  }
  get rep_n_tex() {
    if (this.resultsContainModel()) {
      return 'No. of replicated rows in design matrix: ' + this.resultString.results[0].model.repeated_rows_in_design_matrix;
    } else {
      return 'No model in results'
    }
  }
  get delta_tex() {
    if (this.resultsContainModel()) {
      return this.matrixWithLabel('Es(\\mathbf{\\Delta}) = ', this.resultString.results[0].model.delta);
    } else {
      return 'No model in results'
    }
  }

  get hasResults(): boolean {
    return !isNullOrUndefined(this.resultString)
  }

  getOutput(result) {
    let value = null;
    if (result.model.errors.length === 0) {
      value = result.power;
    } else {
      const errors = result.model.errors;
      for (const key in errors) {
        if (errors[key]['errorname'] === value) {
          value = errors[key]['errormessage'];
          break;
        }
      }
    }

    return value;
  }

  showDetail(power, index, totalSampleSize) {
    this.isShowDetail = true;
    this.detailPower = power;
    this.currentSelected = index;

    if (this.detailCluster) {
      this.detailClusterName = this.detailCluster.name;
    } else {
      this.detailClusterName = 'participants';
    }
    if (totalSampleSize) {
      this.detailSampleSize = totalSampleSize;
    }
    this.smallestGroupSize = totalSampleSize / this._sumOfCombinationsValue;
  }

  buildCombinationsValueMap(betweenIsuRelativeGroupSizes) {
    this.combinationsValueMap = {};
    for (const elem of betweenIsuRelativeGroupSizes) {
      for (const row of elem['_table'] ) {
        for (const col of row ) {
          const tempkey = [];
          col['id'].forEach( groupName => {
            tempkey.push(groupName['value']);
          })
          this.combinationsValueMap[tempkey.join('@')] = col['value']
        }
      }
    }
  }

  getSumOfCombinationsValue() {
    let sum = 0;
    for (const key of Object.keys(this.combinationsValueMap)) {
      sum += this.combinationsValueMap[key];
    }

    return sum
  }

  generateCombinations(predictors: Predictor[], current_combination = []) {
    const length_array = predictors.length;
    if ( length_array !== 0 ) {
      for (const groupName of predictors[0].groups) {
        this.generateCombinations(predictors.slice(1, ), current_combination.concat(groupName));
      }
    } else {
      this.detailPredictorCombination.push(current_combination);
    }
  }

  rowStyle(index) {
    if (this.isSelected(index)) {
      return 'col col-md-auto table-info';
    } else if (this.error(this.resultForDisplay[index])) {
      return 'col col-md-auto table-danger';
    } else if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }

  isSelected(index: number) {
    return index === this.currentSelected;
  }

  isTabSelected(tab: string) {
    return this._selected_tab === tab ? true : false;
  }

  selectTab(tab: string) {
    this._selected_tab = tab;
  }

  isPower(): boolean {
    let ret = true;
    if (!isNullOrUndefined(this.studyDesign)) {
      ret =  this.studyDesign.solveFor === constants.SOLVE_FOR.POWER;
    }
    return ret;
  }

  isSamplesize(): boolean {
    let ret = true;
    if (!isNullOrUndefined(this.studyDesign)) {
      ret =  this.studyDesign.solveFor === constants.SOLVE_FOR.POWER;
    }
    return !ret;
  }

  get googleEventValue(): string {
    let ret = 'sample size';
    if (this.isPower()) { ret = 'power' }
    return ret;
  }

  hasConfidenceInterval(): boolean {
    let ret = false;
    if (!isNullOrUndefined(this.studyDesign)) {
      ret = !isNullOrUndefined(this.studyDesign.confidence_interval);
    }
    return ret;
  }

  error(result) {
    if ( !isNullOrUndefined(result.model.errors.length)
      && result.model.errors.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  dismissHelp() {
    this.helpTextModalReference.close();
  }

  showHelpText(content) {
    this.modalService.dismissAll();
    this.helpTextModalReference = this.modalService.open(content);
    this.helpTextModalReference.result.then(
      (closeResult) => {
        this.log.debug('modal closed : ' + closeResult);
      }, (dismissReason) => {
        if (dismissReason === ModalDismissReasons.ESC) {
          this.log.debug('modal dismissed when used pressed ESC button');
        } else if (dismissReason === ModalDismissReasons.BACKDROP_CLICK) {
          this.log.debug('modal dismissed when used pressed backdrop');
        } else {
          this.log.debug(dismissReason);
        }
      });
  }

  get outputString(): string {
    return this._outputString;
  }

  set outputString(value: string) {
    this._outputString = value;
  }

  get studySubscription(): Subscription {
    return this._studySubscription;
  }

  set studySubscription(value: Subscription) {
    this._studySubscription = value;
  }

  get resultString() {
    return this._resultString;
  }

  set resultString(value) {
    this._resultString = value;
  }

  get e2eTest(): boolean {
    return this._e2eTest;
  }

  get studyDesign() {
    return this._studyDesign;
  }

  get isShowDetail(): boolean {
    return this._isShowDetail;
  }

  set isShowDetail(value) {
    this._isShowDetail = value;
  }

  get detailPower(): number {
    return this._detailPower;
  }

  set detailPower(value) {
    this._detailPower = value;
  }

  get detailClusterLevels() {
    return this._detailClusterLevels;
  }

  set detailClusterLevels(value) {
    this._detailClusterLevels = value;
  }

  get currentSelected() {
    return this._currentSelected;
  }

  set currentSelected(value) {
    this._currentSelected = value;
  }

  get resultForDisplay() {
    return this._resultForDisplay;
  }

  set resultForDisplay(value) {
    this._resultForDisplay = value;
  }

  get downloadData() {
    return this._downloadData;
  }

  set downloadData(value) {
    this._downloadData = value;
  }

  get detailPredictorCombination() {
    return this._detailPredictorCombination;
  }

  set detailPredictorCombination(value) {
    this._detailPredictorCombination = value;
  }

  get detailPredictor() {
    return this._detailPredictor;
  }

  set detailPredictor(value) {
    this._detailPredictor = value;
  }

  get detailClusterOverview() {
    return this._detailClusterOverview;
  }

  set detailClusterOverview(value) {
    this._detailClusterOverview = value;
  }

  get detailCluster() {
    return this._detailCluster;
  }

  set detailCluster(value) {
    this._detailCluster = value;
  }

  get combinationsValueMap() {
    return this._combinationsValueMap;
  }

  set combinationsValueMap(value) {
    this._combinationsValueMap = value;
  }

  get detailClusterName() {
    return this._detailClusterName;
  }

  set detailClusterName(value) {
    this._detailClusterName = value;
  }
  get detailSampleSize() {
    return this._detailSampleSize;
  }

  set detailSampleSize(value) {
    this._detailSampleSize = value;
  }
  get smallestGroupSize(): number {
    return this._smallestGroupSize;
  }

  set smallestGroupSize(value: number) {
    this._smallestGroupSize = value;
  }

  get orthonormalized(): boolean {
    if (this.resultsContainModel()) {
      return this.resultString.results[0].model.orthonormalize_u_matrix;
    } else {
      return false;
    }
  }

  get isCustomOrPolynomialHypothesis(): boolean {
    if (this._studyDesign === null || this._studyDesign === undefined) {
      return false;
    }
    const uMatrixType = this._studyDesign.isuFactors.uMatrix.type;
    if ((uMatrixType === constants.CONTRAST_MATRIX_NATURE.CUSTOM_U_MATRIX || uMatrixType === constants.CONTRAST_MATRIX_NATURE.POLYNOMIAL)
    // && this._studyDesign.isuFactors.uMatrix.values.size() !== [1]
    ) {
      return true;
    } else {
      return false;
    }
  }
}
