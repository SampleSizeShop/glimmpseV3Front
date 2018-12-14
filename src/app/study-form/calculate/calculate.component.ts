import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
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
import {constants} from "../../shared/constants";

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
  private _currentSelected: number;
  private _resultForDisplay: Array<Object>;
  private _downloadData: SafeUrl;
  private _combinationsValueMap: Object;
  private _totalSampleSize: number;

  constructor(private study_service: StudyService,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private ref: ChangeDetectorRef) {
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
  }

  ngOnInit() {
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
        this.calculateTotalSampleSize(this.studyDesign['_isuFactors']['smallestGroupSize']);
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
        const tempContainer = {};
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

  showDetail(power, index) { // , totalSampleSize) {
    this.isShowDetail = true;
    this.detailPower = power;
    this.currentSelected = index;
    if (this.detailCluster) {
      this.detailClusterName = this.detailCluster.name;
    } else {
      this.detailClusterName = 'participants';
    }
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

  calculateTotalSampleSize(smallestGroupSize) {
    this.totalSampleSize = 0;
    for (const key of Object.keys(this.combinationsValueMap)) {
      this.totalSampleSize += this.combinationsValueMap[key];
    }
    this.totalSampleSize = this.totalSampleSize * smallestGroupSize;
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

  get totalSampleSize() {
    return this._totalSampleSize;
  }

  set totalSampleSize(value) {
    this._totalSampleSize = value;
  }

  get detailClusterName() {
    return this._detailClusterName;
  }

  set detailClusterName(value) {
    this._detailClusterName = value;
  }
}
