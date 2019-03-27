import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {Subscription} from 'rxjs';
import {StudyService} from '../study.service';
import {constants} from '../../shared/constants';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavigationService} from "../../shared/navigation.service";

@Component({
  selector: 'app-parameters-gaussian-covariate-correlation',
  templateUrl: './parameters-gaussian-covariate-correlation.component.html',
  styleUrls: ['./parameters-gaussian-covariate-correlation.component.scss']
})
export class ParametersGaussianCovariateCorrelationComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _formErrors = constants.PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION_ERRORS;
  private _validationMessages = constants.PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION_VALIDATION_MESSAGES;
  private _gaussianCovariateCorrForm: FormGroup;

  constructor(private study_service: StudyService,
              private navigation_service: NavigationService,
              private _fb: FormBuilder) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    // TODO: think about dependency checks
    this.buildForm();
  }

  ngDoCheck() {
    this._updateCovariateCorrelation();
  }

  buildForm() {
    this.gaussianCovariateCorrForm = this.fb.group(
      this._defineControls()
    );
    this.gaussianCovariateCorrForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  ngOnDestroy() {
    this.navigation_service.updateValid(true);
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  onValueChanged(data?: any) {
    if (!this.gaussianCovariateCorrForm) {
      return;
    }
    const form = this.gaussianCovariateCorrForm;

    this.formErrors['covariatecorrelation'] = '';
    for (const field in form.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['covariatecorrelation'];
        for (const key in control.errors ) {
          this.formErrors['covariatecorrelation'] = messages[key];
        }
      }
    }
    this.checkValidBeforeNavigation();
  }

  checkValidBeforeNavigation() {
    if (this.gaussianCovariateCorrForm.status === 'VALID') {
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateValid(false);
    }
  }

  _updateCovariateCorrelation() {
    this.isuFactors.outcomes.forEach( outcome => {
      outcome.gaussian_corellation = this.gaussianCovariateCorrForm.get(outcome.name).value;
    });
  }

  _defineControls() {
    const controlArray = {};
    this.isuFactors.outcomes.forEach(
      outcome => {
        controlArray[outcome.name] = [+outcome.gaussian_corellation];
      }
    );
    return controlArray;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }
  get formErrors(): { covariatecorrelation: string; } {
    return this._formErrors;
  }

  set formErrors(value: { covariatecorrelation: string; }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    covariatecorrelation: { required: string; };
  }
  {
    return this._validationMessages;
  }

  set validationMessages(value: {
    covariatecorrelation: { required: string; };
  }) {
    this._validationMessages = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }
  get gaussianCovariateCorrForm(): FormGroup {
    return this._gaussianCovariateCorrForm;
  }

  set gaussianCovariateCorrForm(value: FormGroup) {
    this._gaussianCovariateCorrForm = value;
  }
}
