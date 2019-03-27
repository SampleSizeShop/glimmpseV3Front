import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {constants} from '../../shared/constants';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../study.service';
import {NavigationService} from '../../shared/navigation.service';
import {NGXLogger} from 'ngx-logger';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GaussianCovariate} from '../../shared/GaussianCovariate';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-parameters-gaussian-covariate-variance',
  templateUrl: './parameters-gaussian-covariate-variance.component.html',
  styleUrls: ['./parameters-gaussian-covariate-variance.component.scss']
})
export class ParametersGaussianCovariateVarianceComponent implements OnInit, OnDestroy {
  private _gaussianCovariateVarForm: FormGroup;
  private _gaussianCovariatesSubscription: Subscription;
  private _variance: number;
  private _gaussianCovariate: GaussianCovariate;
  private _formErrors = constants.PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE_ERRORS;
  private _validationMessages = constants.PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE_VALIDATION_MESSAGES;
  private _showHelpTextSubscription: Subscription;


  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: FormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._gaussianCovariatesSubscription = this.study_service.gaussianCovariate$.subscribe(gaussianCovariate => {
        this._gaussianCovariate = gaussianCovariate;
      }
    );
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this._gaussianCovariate)) {this._gaussianCovariate.standard_deviation = this._variance;}
    if (!isNullOrUndefined(this.study_service)) {this.study_service.updateGaussianCovariate(this._gaussianCovariate);}
    if (!isNullOrUndefined(this._gaussianCovariatesSubscription)) {this._gaussianCovariatesSubscription.unsubscribe();}
    if (!isNullOrUndefined(this._showHelpTextSubscription)) {this._showHelpTextSubscription.unsubscribe();}
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
    this._variance = +this.gaussianCovariateVarForm.value.variance;

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
}
