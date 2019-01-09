import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StudyDesign} from '../../shared/study-design';
import {isNullOrUndefined} from 'util';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {testEnvironment} from '../../../environments/environment.test';
import {environment} from '../../../environments/environment';
import {Cluster} from '../../shared/Cluster';
import {Predictor} from '../../shared/Predictor';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/navigation.service';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../../shared/constants';

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
  private _resultForDisplay: Array<Object>;
  private _downloadData: SafeUrl;
  private _combinationsValueMap: Object;
  private _showHelpTextSubscription: Subscription;
  private _smallestGroupSize: number;
  private _sumOfCombinationsValue: number;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private ref: ChangeDetectorRef,
              private navigation_service: NavigationService,
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
  }

  ngOnDestroy() {
    this.studySubscription.unsubscribe();
    this._withinIsuClusterSubscription.unsubscribe();
    this._betweenIsuPredictorsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  postModel() {
    const output = this.outputString;
    this.http.post(
      testEnvironment.calculateUrl,
      output,
      this.jsonHeader()).toPromise().then(response => {
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
    }).catch(this.handleError);
  }

  downloadResult() {
    this.makeCsvFile();
    this.ref.detectChanges();
    document.getElementById('downloadCsv').click();
  }

  makeCsvFile() {
    let csvContent = 'actualPower,alpha,test\r\n';
    for (const result of this.resultString.results) {
      for (const variability_scale_factor of this.studyDesign['_varianceScaleFactors']) {
        csvContent += this.getOutput(result) + ',';
        csvContent += this.studyDesign['_typeOneErrorRate'] + ',';
        csvContent += result.test + '\r\n';
      }
    }
    this.downloadData = this.sanitizer.bypassSecurityTrustUrl('data:text/csv;charset=utf-8,' + encodeURI(csvContent));
  }

  buildResultTable() {
    const results = [];

    for (const result of this.resultString.results) {
      results.push(result);
    }
    this.resultForDisplay = results;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
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
          texString = texString + col + ' & '
        });
        texString = texString.slice(0, texString.length - 2) + '\\\\';
      });
    }
    texString = texString.slice(0, texString.length - 2) + '\\end{bmatrix}$';
    return texString;
  }

  get hasResults(): boolean {
    return !isNullOrUndefined(this.resultString)
  }

  getOutput(result) {
    let value = result.test;
    if (!isNullOrUndefined(result.power)) {
      value = result.power;
    } else if (!isNullOrUndefined(result.samplesize)) {
      value = result.samplesize;
    } else {
      const errors = this.resultString['model']['errors'];
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

  error(result) {
    if ( !isNullOrUndefined(result['error'])) {
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
}
