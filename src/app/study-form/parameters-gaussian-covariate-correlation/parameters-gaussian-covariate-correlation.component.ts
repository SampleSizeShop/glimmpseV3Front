import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {Subscription} from 'rxjs';
import {StudyService} from '../study.service';
import {constants} from '../../shared/constants';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavigationService} from "../../shared/navigation.service";
import {GaussianCovariate} from "../../shared/GaussianCovariate";
import {isNullOrUndefined} from "util";

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
  private _gaussianCovariate: GaussianCovariate;
  private _gaussianCovariatesSubscription: Subscription;
  private _corellations: Array<number>;

  constructor(private study_service: StudyService,
              private navigation_service: NavigationService,
              private _fb: FormBuilder) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
      }
    );

    this._gaussianCovariate = new GaussianCovariate();
    this._gaussianCovariatesSubscription = this.study_service.gaussianCovariate$.subscribe(gaussianCovariate => {
        if (!isNullOrUndefined(gaussianCovariate)
          && !isNullOrUndefined(gaussianCovariate.corellations)
          && gaussianCovariate.corellations.length !== 0) {
          this._corellations = gaussianCovariate.corellations;
        } else {
          this._corellations = []
          this.isuFactors.outcomes.forEach( outcome => {
            this.isuFactors.repeatedMeasures.forEach( measure => {
                measure.valueNames.forEach( val => {
                  this._corellations.push(1);
                });
              }
            );
          });
        }
      }
    );
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
    this._gaussianCovariate.corellations = this._corellations;
    this.study_service.updateGaussianCovariate(this._gaussianCovariate);
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
    this._corellations = []
    this.isuFactors.outcomes.forEach( outcome => {
      this.isuFactors.repeatedMeasures.forEach( measure => {
        measure.valueNames.forEach( val => {
          const name = outcome.name + '-' + measure.name + '-' + val;
          this._corellations.push(this.gaussianCovariateCorrForm.get(name).value);
        });
        }
      );
    });
  }

  _defineControls() {
    let i = 0;
    const controlArray = {};
    this.isuFactors.outcomes.forEach(
      outcome => {
        this.isuFactors.repeatedMeasures.forEach( measure => {
          measure.valueNames.forEach( val => {
            const name = outcome.name + '-' + measure.name + '-' + val ;
            controlArray[name] = [this._corellations[i]];
            i = i + 1;
          });
        });
      });
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
