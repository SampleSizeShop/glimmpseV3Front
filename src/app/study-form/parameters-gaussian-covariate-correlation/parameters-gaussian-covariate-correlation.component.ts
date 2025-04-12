import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {Subscription} from 'rxjs';
import {StudyService} from '../../shared/services/study.service';
import {constants} from '../../shared/model/constants';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {NavigationService} from '../../shared/services/navigation.service';
import {GaussianCovariate} from '../../shared/model/GaussianCovariate';
import {isNullOrUndefined} from 'util';
import {CombinationId} from '../../shared/model/CombinationId';
import {ISUFactorCombination} from '../../shared/model/ISUFactorCombination';

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
  private _gaussianCovariateCorrForm: UntypedFormGroup;
  private _gaussianCovariate: GaussianCovariate;
  private _gaussianCovariatesSubscription: Subscription;
  private _corellations: Array<number>;
  private _corellation_names: Array<string>;

  constructor(private study_service: StudyService,
              private navigation_service: NavigationService,
              private _fb: UntypedFormBuilder) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
      }
    );

    this._gaussianCovariate = new GaussianCovariate();
    this._gaussianCovariatesSubscription = this.study_service.gaussianCovariate$.subscribe(gaussianCovariate => {
        if (!isNullOrUndefined(gaussianCovariate)
          && !isNullOrUndefined(gaussianCovariate.corellations)
          && gaussianCovariate.corellations.length !== 0) {
          this._gaussianCovariate = gaussianCovariate;
          this._corellations = gaussianCovariate.corellations;
          this._corellation_names = this.getCorellationNames();
        } else {
          this._gaussianCovariate = gaussianCovariate;
          this._corellation_names = this.getCorellationNames();
          this._corellations = [];
          this._corellation_names.forEach(name => {
            this._corellations.push(0);
          });
        }
      }
    );
    const a = 0;
  }

  private getCorellationNames() {
    const ids = []
    this.isuFactors.outcomes.forEach( (outcome, index) => {
      const input = []
      const outcomeId = new CombinationId(outcome.name, outcome.isuFactorNature, '', index);
      this.isuFactors.repeatedMeasures.forEach( measure => {
        input.push(measure);
      });
      const a  = this.isuFactors.generateCombinations(input);
      if (a.length > 0) {
        a.forEach( combination => {
          const i = new ISUFactorCombination(combination.id);
          i.id.unshift(outcomeId);
          ids.push(combination);
        });
      } else {
        ids.push(new ISUFactorCombination([outcomeId]));
      }
    });
    const corellations = []
    ids.forEach( i => {
      corellations.push(i.name);
    });
    return corellations;
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
    this._corellation_names.forEach(name => {
      this._corellations.push(this.gaussianCovariateCorrForm.controls[name].value);
    });
  }

  _defineControls() {
    let i = 0;
    const controlArray = {};
    this._corellation_names.forEach(name => {
      controlArray[name] = [this._corellations[i]];
      i = i + 1;
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
  } {
    return this._validationMessages;
  }

  set validationMessages(value: {
    covariatecorrelation: { required: string; };
  }) {
    this._validationMessages = value;
  }

  get fb(): UntypedFormBuilder {
    return this._fb;
  }
  get gaussianCovariateCorrForm(): UntypedFormGroup {
    return this._gaussianCovariateCorrForm;
  }

  set gaussianCovariateCorrForm(value: UntypedFormGroup) {
    this._gaussianCovariateCorrForm = value;
  }

  get corellation_names(): Array<string> {
    return this._corellation_names;
  }

  get hasRepeatedMeasures(): boolean {
    if (!isNullOrUndefined(this.isuFactors.repeatedMeasuresInHypothesis) &&
      this.isuFactors.repeatedMeasuresInHypothesis.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
