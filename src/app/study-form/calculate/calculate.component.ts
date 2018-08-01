import { Component, OnInit } from '@angular/core';
import {StudyDesign} from '../../shared/study-design';
import {isNullOrUndefined} from 'util';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs/Subscription';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss']
})
export class CalculateComponent implements OnInit {
  private _studyDesign: StudyDesign;
  private _studySubscription: Subscription;
  private _outputString: string;
  private _resultString: string;

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
      'http://127.0.0.1:5000/api/calculate',
      output,
      this.jsonHeader()).toPromise().then(response => this.resultString = response as string).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private jsonHeader() {
    const header = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return header;
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

  get resultString(): string {
    return this._resultString;
  }

  set resultString(value: string) {
    this._resultString = value;
  }
}
