import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {Subscription} from 'rxjs';
import {StudyService} from '../study.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {constants} from '../../shared/constants';
import {minMaxValidator} from '../../shared/minmax.validator';

@Component({
  selector: 'app-parameters-standard-deviation',
  templateUrl: './parameters-standard-deviation.component.html',
  styleUrls: ['./parameters-standard-deviation.component.css']
})
export class ParametersStandardDeviationComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _stDevForm: FormGroup;
  private _formErrors = constants.PARAMETERS_STANDARD_DEVIATION_ERRORS;
  private _validationMessages = constants.PARAMETERS_STANDARD_DEVIATION_VALIDATION_MESSAGES;

  constructor(private study_service: StudyService, private _fb: FormBuilder) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    this._updateStandardDeviations();
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
  }

  buildForm() {
    this.stDevForm = this.fb.group(
      this._defineControls()
    );
    this.stDevForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  _defineControls() {
    const controlArray = {};
    this.isuFactors.outcomes.forEach(
      outcome => {
        controlArray[outcome.name] = [outcome.standardDeviation];
      }
    );
    return controlArray;
  }

  onValueChanged(data?: any) {
    if (!this.stDevForm) {
      return;
    }
    const form = this.stDevForm;

    this.formErrors['vectorofstandarddeviations'] = '';
    for (const field in this.stDevForm.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['vectorofstandarddeviations'];
        for (const key in control.errors) {
          this.formErrors['vectorofstandarddeviations'] = messages[key];
        }
      }
    }
  }

  _updateStandardDeviations() {
    this.isuFactors.outcomes.forEach( outcome => {
      outcome.standardDeviation = this.stDevForm.get(outcome.name).value;
    });
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  get formErrors(): { vectorofstandarddeviations: string; } {
    return this._formErrors;
  }

  set formErrors(value: { vectorofstandarddeviations: string; }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    vectorofstandarddeviations: { required: string; };
  }
  {
    return this._validationMessages;
  }

  set validationMessages(value: {
    vectorofstandarddeviations: { required: string; };
  }) {
    this._validationMessages = value;
  }

  get stDevForm(): FormGroup {
    return this._stDevForm;
  }

  set stDevForm(value: FormGroup) {
    this._stDevForm = value;
  }
}
