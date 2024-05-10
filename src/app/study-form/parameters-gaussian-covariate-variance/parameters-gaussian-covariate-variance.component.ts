import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {constants} from '../../shared/model/constants';
import {Subscription} from 'rxjs';
import {StudyService} from '../../shared/services/study.service';
import {NavigationService} from '../../shared/services/navigation.service';
import {NGXLogger} from 'ngx-logger';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GaussianCovariate} from '../../shared/model/GaussianCovariate';
import {minMaxValidator} from '../../shared/validators/minmax.validator';

@Component({
  selector: 'app-parameters-gaussian-covariate-variance',
  templateUrl: './parameters-gaussian-covariate-variance.component.html',
  styleUrls: ['./parameters-gaussian-covariate-variance.component.scss']
})
export class ParametersGaussianCovariateVarianceComponent implements OnInit, DoCheck, OnDestroy {
  private _gaussianCovariateVarForm: UntypedFormGroup;
  private _gaussianCovariatesSubscription: Subscription;
  private _variance: number;
  private _gaussianCovariate: GaussianCovariate;
  private _formErrors = constants.PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE_ERRORS;
  private _validationMessages = constants.PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE_VALIDATION_MESSAGES;
  private _showHelpTextSubscription: Subscription;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};


  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: UntypedFormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._gaussianCovariate = new GaussianCovariate();
    this._gaussianCovariatesSubscription = this.study_service.gaussianCovariate$.subscribe(gaussianCovariate => {
        if (gaussianCovariate !== null && gaussianCovariate !== undefined) {
          this._gaussianCovariate = gaussianCovariate;
          this._variance = this._gaussianCovariate.standard_deviation;
        }
      }
    );
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this._isClickNextReference = {value: false};
    this._isClickNext = false;
    this._isClickNextSubscription = this.navigation_service.isClickNext$.subscribe(
      isClickNext => {
        this.isClickNext = isClickNext;
        this._isClickNextReference.value = this.isClickNext;
        if (this._isClickNext && this.gaussianCovariateVarForm !== null && this.gaussianCovariateVarForm !== undefined) {
          Object.keys(this.gaussianCovariateVarForm.controls).forEach(control => {
            this.gaussianCovariateVarForm.controls[control].setValidators(Validators.required);
            this.gaussianCovariateVarForm.controls[control].updateValueAndValidity();
            this.onValueChanged();
          });
        }
      }
    );
  }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    this.checkValidBeforeNavigation();
  }

  ngOnDestroy() {
    if (this._gaussianCovariate !== null && this._gaussianCovariate !== undefined) {
      this._gaussianCovariate.standard_deviation = this._variance;
    }
    if (this.study_service !== null && this.study_service !== undefined) {
      this.study_service.updateGaussianCovariate(this._gaussianCovariate);
    }
    if (this._gaussianCovariatesSubscription !== null && this._gaussianCovariatesSubscription !== undefined) {
      this._gaussianCovariatesSubscription.unsubscribe();
    }
    if (this._showHelpTextSubscription !== null && this._showHelpTextSubscription !== undefined) {
      this._showHelpTextSubscription.unsubscribe();
    }
    this.setNextEnabled('VALID');
  }

  checkValidBeforeNavigation(): void {
    if (this.gaussianCovariateVarForm !== null
      && this.gaussianCovariateVarForm !== undefined
      && this.allControlsFilledIn) {
      this.setNextEnabled('VALID');
    } else {
      this.setNextEnabled('INVALID');
    }
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
  }

  get allControlsFilledIn() {
    let ret = true;
    Object.keys(this.gaussianCovariateVarForm.controls).forEach(
      name => {
        if (this.gaussianCovariateVarForm.get(name).value === null) {
          ret =  false;
        }
      }
    );
    return ret;
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
    this._variance = this.gaussianCovariateVarForm.value.variance;

    this.formErrors['covariatevariance'] = '';
    for (const field in form.value) {
      const control = form.get(field);
      if (control && !control.valid) {
        const messages = this.validationMessages['covariatevariance'];
        for (const key in control.errors ) {
          this.formErrors['covariatevariance'] = messages[key];
        }
      }
    }
    this.checkValidBeforeNavigation();
  }

  _defineControls() {
    const controlArray = {variance: [this._variance, minMaxValidator(0, 99999999999999)]};
    return controlArray;
  }

  get intraClassCorrForm(): UntypedFormGroup {
    return this._gaussianCovariateVarForm;
  }

  set intraClassCorrForm(value: UntypedFormGroup) {
    this._gaussianCovariateVarForm = value;
  }

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  get variance(): number {
    return this._variance;
  }

  set variance(value: number) {
    this._variance = value;
  }
  get gaussianCovariateVarForm(): UntypedFormGroup {
    return this._gaussianCovariateVarForm;
  }

  set gaussianCovariateVarForm(value: UntypedFormGroup) {
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
  } {
    return this._validationMessages;
  }

  set validationMessages(value: {
    covariatevariance: { required: string; };
  }) {
    this._validationMessages = value;
  }

  dismissHelp() {
    this.helpTextModalReference.close();
  }

  showHelpText(content) {
    this.modalService.dismissAll();
    this.helpTextModalReference = this.modalService.open(content);
    this.helpTextModalReference.result.then(
      (closeResult) => {
        this.log.debug('modal closed : ' + closeResult);
      }, (dismissReason) => {
        if (dismissReason === ModalDismissReasons.ESC) {
          this.log.debug('modal dismissed when used pressed ESC button');
        } else if (dismissReason === ModalDismissReasons.BACKDROP_CLICK) {
          this.log.debug('modal dismissed when used pressed backdrop');
        } else {
          this.log.debug(dismissReason);
        }
      });
  }

  get isClickNext(): boolean {
    return this._isClickNext;
  }

  set isClickNext(value: boolean) {
    this._isClickNext = value;
  }
}
