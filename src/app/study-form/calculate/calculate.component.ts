import { Component, OnInit } from '@angular/core';
import {StudyDesign} from '../../shared/study-design';
import {isNullOrUndefined} from 'util';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {testEnvironment} from '../../../environments/environment.test';

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

  constructor(private study_service: StudyService, private http: HttpClient) {
    this.studySubscription = this.study_service.studyDesign$.subscribe( study => {
      this._studyDesign = study;
    });
  }

  ngOnInit() {
    if (!isNullOrUndefined(this._studyDesign)) {
      this.outputString = JSON.stringify(this._studyDesign);
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
      this.jsonHeader()).toPromise().then(response => this.resultString = response).catch(this.handleError);
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
      value = ': Power -> ' + result.power;
    } else if (!isNullOrUndefined(result.samplesize)) {
      value = ': Sample size -> ' + result.samplesize;
    } else {
      const errors = this.resultString['model']['errors'];
      for (const key in errors) {
        if (errors[key]['errorname'] === value) {
          value = ': ' + errors[key]['errormessage'];
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
}
