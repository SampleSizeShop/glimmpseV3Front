import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BetweenISUFactors} from '../shared/BetweenISUFactors';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../shared/study.service';

@Component({
  selector: 'app-between-isu',
  templateUrl: './between-isu.component.html',
  styleUrls: ['./between-isu.component.css']
})
export class BetweenIsuComponent implements OnInit {
  private _predictorForm: FormGroup;
  private _betweenISUFactors: BetweenISUFactors[];
  private _betweenIsuFactorsSubscription: Subscription;

  constructor(private _fb: FormBuilder, private _study_service: StudyService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.predictorForm = this.fb.group({
      predictorName: ['']
    });
  }

  get predictorForm(): FormGroup {
    return this._predictorForm;
  }

  set predictorForm(value: FormGroup) {
    this._predictorForm = value;
  }

  get betweenISUFactors(): BetweenISUFactors[] {
    return this._betweenISUFactors;
  }

  set betweenISUFactors(value: BetweenISUFactors[]) {
    this._betweenISUFactors = value;
  }

  get betweenIsuFactorsSubscription(): Subscription {
    return this._betweenIsuFactorsSubscription;
  }

  set betweenIsuFactorsSubscription(value: Subscription) {
    this._betweenIsuFactorsSubscription = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get study_service(): StudyService {
    return this._study_service;
  }

  set study_service(value: StudyService) {
    this._study_service = value;
  }
}
