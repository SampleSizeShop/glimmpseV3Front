import {Component, DoCheck, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {constants} from '../shared/constants';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {NGXLogger} from 'ngx-logger';
import {minMaxValidator} from '../shared/minmax.validator';

@Component({
  selector: 'app-parameters-scale-factor',
  templateUrl: './parameters-scale-factor.component.html',
  styleUrls: ['./parameters-scale-factor.component.css']
})
export class ParametersScaleFactorComponent implements DoCheck {

  private _scaleFactor: number;
  private _scaleFactorForm: FormGroup;
  private _formErrors = constants.TYPE_ONE_ERROR_ERRORS;
  private _validationMessages = constants.TYPE_ONE_ERROR_VALIDATION_MESSAGES;

  private _scaleFactorSubscription: Subscription;

  constructor(private study_service: StudyService, private fb: FormBuilder, private logger: NGXLogger) {
    this.scaleFactorSubscription = this.study_service.scaleFactor$.subscribe(
      scaleFactor => {
        this.scaleFactor = scaleFactor
      }
    );
    this.buildForm();
  }

  buildForm(): void {
    this.scaleFactorForm = this.fb.group({
      scalefactor: [this.scaleFactor, minMaxValidator(0, 1, this.logger)]
    });

    this.scaleFactorForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.scaleFactorForm) {
      return;
    }
    const form = this.scaleFactorForm;

    for (const field in this.formErrors) {
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

  ngDoCheck() {
    this.study_service.updateScaleFactor(this.scaleFactorForm.get('scalefactor').value);
  }

  get scaleFactor(): number {
    return this._scaleFactor;
  }

  set scaleFactor(value: number) {
    this._scaleFactor = value;
  }

  get scaleFactorForm(): FormGroup {
    return this._scaleFactorForm;
  }

  set scaleFactorForm(value: FormGroup) {
    this._scaleFactorForm = value;
  }

  get formErrors(): { typeoneerror } | any {
    return this._formErrors;
  }

  set formErrors(value: { typeoneerror } | any) {
    this._formErrors = value;
  }

  get validationMessages(): { typeoneerror } | any {
    return this._validationMessages;
  }

  set validationMessages(value: { typeoneerror } | any) {
    this._validationMessages = value;
  }

  get scaleFactorSubscription(): Subscription {
    return this._scaleFactorSubscription;
  }

  set scaleFactorSubscription(value: Subscription) {
    this._scaleFactorSubscription = value;
  }
}
