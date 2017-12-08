import { Component, OnInit } from '@angular/core';
import {minMaxValidator} from '../../shared/minmax.validator';
import {constants} from '../../shared/constants';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {HypothesisEffect} from '../../shared/HypothesisEffect';
import {StudyService} from "../study.service";

@Component({
  selector: 'app-parameters-variance-scale-factors',
  templateUrl: './parameters-variance-scale-factors.component.html',
  styleUrls: ['./parameters-variance-scale-factors.component.scss']
})
export class ParametersVarianceScaleFactorsComponent implements OnInit {
private _scaleFactorsForm: FormGroup;
private _scaleFactors: number[];
private _max: number;
private _validationMessages;
private _formErrors;

  constructor(private _fb: FormBuilder, private study_service: StudyService) {
    this.scaleFactors = [];
    this.validationMessages = constants.OUTCOME_FORM_VALIDATION_MESSAGES;
    this.formErrors = constants.OUTCOME_FORM_ERRORS;
    this._max = constants.MAX_OUTCOMES;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.scaleFactorsForm = this.fb.group({
      scaleFactors: [0, minMaxValidator( -1, 1)]
    });

    this.scaleFactorsForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.scaleFactorsForm) {
      return;
    }
    const form = this.scaleFactorsForm;

    for (const field in this.validationMessages) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  addScaleFactor() {
    if (
      this.scaleFactorsForm.status === 'VALID'
      && this.scaleFactorsForm.value.scaleFactors
      && this.scaleFactorsForm.value.scaleFactors.trim() !== ''
    ) {
      this.scaleFactors.push(this.scaleFactorsForm.value);
      this.scaleFactorsForm.reset();
    }
  }

  removeScaleFactor(value: number) {
    const index = this.scaleFactors.indexOf(value);
    if (index > -1) {
      this.scaleFactors.splice(index, 1);
    }
    this.scaleFactorsForm.reset();
  }

  firstScaleFactor(): boolean {
    return this.scaleFactors.length === 0 ? true : false;
  }

  nextScaleFactor(): boolean {
    if (!this.firstScaleFactor() && this.scaleFactors.length < this.max ) {
      return true;
    }
    return false;
  }

  get scaleFactors(): number[] {
    return this._scaleFactors;
  }

  set scaleFactors(value: number[]) {
    this._scaleFactors = value;
  }

  get scaleFactorsForm(): FormGroup {
    return this._scaleFactorsForm;
  }

  set scaleFactorsForm(value: FormGroup) {
    this._scaleFactorsForm = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
  }

  get validationMessages() {
    return this._validationMessages;
  }

  set validationMessages(value) {
    this._validationMessages = value;
  }

  get formErrors() {
    return this._formErrors;
  }

  set formErrors(value) {
    this._formErrors = value;
  }
}
