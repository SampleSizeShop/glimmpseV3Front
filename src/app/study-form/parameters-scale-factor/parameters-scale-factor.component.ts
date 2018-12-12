import {of as observableOf, Subscription, Observable} from 'rxjs';
import {Component, OnDestroy} from '@angular/core';
import {constants} from '../../shared/constants';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudyService} from '../study.service';
import {NGXLogger} from 'ngx-logger';
import {minMaxValidator} from '../../shared/minmax.validator';
import {Outcome} from "../../shared/Outcome";

@Component({
  selector: 'app-parameters-scale-factor',
  templateUrl: './parameters-scale-factor.component.html',
  styleUrls: ['./parameters-scale-factor.component.css']
})
export class ParametersScaleFactorComponent implements OnDestroy {

  private _scaleFactor: Array<number>;
  private _scaleFactorForm: FormGroup;
  private _formErrors = constants.PARAMETERS_SCALE_FACTOR_ERRORS;
  private _validationMessages = constants.PARAMETERS_SCALE_FACTOR_VALIDATION_MESSAGES;

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

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }

  ngOnDestroy() {
    this.study_service.updateScaleFactor(this.scaleFactor);
    this.scaleFactorSubscription.unsubscribe();
  }

  addScaleFactor() {
      this.scaleFactor.push(this.scaleFactorForm.value.scalefactor);
      this.scaleFactorForm.reset();
  }

  removeScaleFactor(value: number) {
    const index = this.scaleFactor.indexOf(value);
    if (index > -1) {
      this.scaleFactor.splice(index, 1);
    }
    this.scaleFactorForm.reset();
  }

  get scaleFactors$() {
    return observableOf(this.scaleFactor);
  }

  get scaleFactor(): Array<number> {
    return this._scaleFactor;
  }

  set scaleFactor(value: Array<number>) {
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

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }
}
