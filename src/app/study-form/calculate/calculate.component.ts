import { Component, OnInit } from '@angular/core';
import {StudyDesign} from '../../shared/study-design';
import {isNullOrUndefined} from 'util';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {testEnvironment} from '../../../environments/environment.test';
import {environment} from '../../../environments/environment';
import {Cluster} from '../../shared/Cluster';
import {Predictor} from '../../shared/Predictor';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss']
})
export class CalculateComponent implements OnInit {
  private _studyDesign: StudyDesign;
  private _studySubscription: Subscription;
  private _outputString: string;
  private _resultString;
  private _e2eTest: boolean;
  private _isShowDetail: boolean;
  private _detailPower: number;
  private _detailCluster: Cluster;
  private _detailClusterLevels: Array<Object>;
  private _detailClusterOverview: Array<String>;
  private _detailPredictorCombination: Array<Array<string>>;
  private _detailPredictor: Array<Predictor>;
  private _currentSelected: number;
  private _resultForDisplay: Array<Object>;
  private _downloadData: Array<Object>;

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    headers: ['actualPower', 'alpha', 'test'],
    showTitle: false,
    title: '',
    useBom: false,
    removeNewLines: true,
    keys: ['actualPower', 'alpha', 'test']
  };

  constructor(private study_service: StudyService, private http: HttpClient) {
    this.studySubscription = this.study_service.studyDesign$.subscribe( study => {
      this._studyDesign = study;
    });
    this.study_service.withinIsuCluster$.subscribe(
      cluster => {
        this.detailCluster = cluster;
        this.detailClusterLevels = cluster.levels;
      }
    );
    this.study_service.betweenIsuPredictors$.subscribe(
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

  postModel() {
    const output = this.outputString;
    this.http.post(
      testEnvironment.calculateUrl,
      output,
      this.jsonHeader()).toPromise().then(response => {
        this.resultString = response;
        this.buildResultTable();
        this.makeCsvFile();
        this.detailClusterOverview = this.detailCluster.buildClusterOverview();
        const allGroup = this.getAllGroupOfPredictors();
        this.generateCombinations(allGroup);
        console.log(this.detailPredictorCombination);
    }).catch(this.handleError);
  }

  makeCsvFile() {
    this.downloadData = [];
    let tempContainer = {};

    for (const result of this.resultString.results) {
      for (const variability_scale_factor of this.studyDesign['_varianceScaleFactors']) {
        tempContainer = {};
        tempContainer['actualPower'] = this.getOutput(result);
        tempContainer['alpha'] = this.studyDesign['_typeOneErrorRate'];
        tempContainer['test'] = result.test;
        this.downloadData.push(tempContainer)
      }
    }
  }

  buildResultTable() {
    const resultArray = [];
    let tempContainer = {};

    for (const result of this.resultString.results) {
      for (const variability_scale_factor of this.studyDesign['_varianceScaleFactors']) {
        tempContainer = {};
        tempContainer['result'] = result;
        tempContainer['smallestGroupSize'] = this.studyDesign['_isuFactors']['smallestGroupSize'];
        tempContainer['scaleFactor'] = this.studyDesign['_scaleFactor'];
        tempContainer['variability_scale_factor'] = variability_scale_factor;
        tempContainer['test_type'] = result.test;
        tempContainer['typeOneErrorRate'] = this.studyDesign['_typeOneErrorRate'];
        resultArray.push(tempContainer);
      }
    }
    this.resultForDisplay = resultArray;
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

  hasWarning(result) {
    if (isNullOrUndefined(result.power) && isNullOrUndefined(result.samplesize) ) {
      return true;
    }
    return false;
  }

  showDetail(power, index) { // , totalSampleSize) {
    this.isShowDetail = true;
    this.detailPower = power;
    this.currentSelected = index;
  }

  getAllGroupOfPredictors() {
    const allGroup = [];
    for (const predictor of this.detailPredictor) {
      allGroup.push(predictor['valueNames']);
    }

    return allGroup
  }

  generateCombinations(group_array, current_combination = []) {
    const length_array = group_array.length;
    if ( length_array !== 0 ) {
      for (const groupName of group_array[0]) {
        this.generateCombinations(group_array.slice(1, ), current_combination.concat(groupName));
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


}
