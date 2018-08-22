import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {constants} from '../../shared/constants';

@Component({
  selector: 'app-parameters-gaussian-covariate-variance',
  templateUrl: './parameters-gaussian-covariate-variance.component.html',
  styleUrls: ['./parameters-gaussian-covariate-variance.component.scss']
})
export class ParametersGaussianCovariateVarianceComponent implements OnInit {
  private _gaussianCovariateVarForm: FormGroup;
  private _variance: number;
  private _formErrors = constants.PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE_ERRORS;
  private _validationMessages = constants.PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE_VALIDATION_MESSAGES;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.gaussianCovariateVarForm = this.fb.group(
      this._defineControls()
    );
    this.gaussianCovariateVarForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }
  onValueChanged(data?: any) {
    if (!this.gaussianCovariateVarForm) {
      return;
    }
    const form = this.gaussianCovariateVarForm;

    this.formErrors['covariatevariance'] = '';
    for (const field in form.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['covariatevariance'];
        for (const key in control.errors ) {
          this.formErrors['covariatevariance'] = messages[key];
        }
      }
    }
  }

  _defineControls() {
    const controlArray = {'variance': '1'};
    return controlArray;
  }

  get intraClassCorrForm(): FormGroup {
    return this._gaussianCovariateVarForm;
  }

  set intraClassCorrForm(value: FormGroup) {
    this._gaussianCovariateVarForm = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  get variance(): number {
    return this._variance;
  }

  set variance(value: number) {
    this._variance = value;
  }
  get gaussianCovariateVarForm(): FormGroup {
    return this._gaussianCovariateVarForm;
  }

  set gaussianCovariateVarForm(value: FormGroup) {
    this._gaussianCovariateVarForm = value;
  }

  get formErrors(): { covariatevariance: string; } {
    return this._formErrors;
  }

  set formErrors(value: { covariatevariance: string; }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    covariatevariance: { required: string; };
  }
  {
    return this._validationMessages;
  }

  set validationMessages(value: {
    covariatevariance: { required: string; };
  }) {
    this._validationMessages = value;
  }
}
