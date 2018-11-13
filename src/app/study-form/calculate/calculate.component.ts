import { Component, OnInit } from '@angular/core';
import {StudyDesign} from '../../shared/study-design';
import {isNullOrUndefined} from 'util';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {testEnvironment} from '../../../environments/environment.test';
import {environment} from '../../../environments/environment';

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
  private _detailClusterLevels;
  private _detailClusterName: string;
  private _currentSelected: number;
  private _resultForDisplay;

  constructor(private study_service: StudyService, private http: HttpClient) {
    this.studySubscription = this.study_service.studyDesign$.subscribe( study => {
      this._studyDesign = study;
    });
    this._e2eTest = environment.e2eTest;
    this._isShowDetail = false;
  }

  ngOnInit() {
    if (!isNullOrUndefined(this._studyDesign)) {
      this.outputString = JSON.stringify(this._studyDesign);
      this.detailClusterLevels = this.getClusterLevels();
      this.detailClusterName = this.getClusterName();
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
        this.makeDisplayResult();
    }).catch(this.handleError);
  }

  makeDisplayResult() {
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

  getClusterLevels() {
    for ( const variable of this.studyDesign['_isuFactors']['variables']) {
      if (variable['origin'] === 'Cluster') {
        return variable['levels'];
      }
    }
    return null
  }

  getClusterName() {
    for ( const variable of this.studyDesign['_isuFactors']['variables']) {
      if (variable['origin'] === 'Cluster') {
        return this.detailClusterName = variable['name']
      }
    }
    return null
  }

  showLevelRelation(level1, level2, relationNumber) {
    return relationNumber + ' ' + level2 + ' in each ' + level1;
  }

  showLevelConclusion() {
    let totalCluster = 1;
    for (const level of this.detailClusterLevels) {
      totalCluster *= level['noElements'];
    }
    return '(a total of ' + totalCluster + ' ' + this.detailClusterName + ' in each ' + this.detailClusterLevels[0]['levelName'] + ')';
  }

  rowStyle(index) {
    if (this.isSelected(index)) {
      return 'col col-md-auto table-success';
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

  get detailClusterName() {
    return this._detailClusterName;
  }

  set detailClusterName(value) {
    this._detailClusterName = value;
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
}
