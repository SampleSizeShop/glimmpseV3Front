import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StudyService} from '../../shared/services/study.service';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {NavigationService} from '../../shared/services/navigation.service';
import {NGXLogger} from 'ngx-logger';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/model/constants';
import {of as observableOf, Subscription} from 'rxjs';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {GaussianCovariate} from '../../shared/model/GaussianCovariate';
import {gaussianPowerValidator} from '../../shared/validators/parameters-gaussian-power.validator';


@Component({
  selector: 'app-parameters-gaussian-power',
  templateUrl: './parameters-gaussian-power.component.html',
  styleUrls: ['./parameters-gaussian-power.component.scss']
})
export class ParametersGaussianPowerComponent implements OnInit, OnDestroy {

  private _quantileForm: UntypedFormGroup;
  private _quantiles: Set<number>;
  public _gaussianCovariate: GaussianCovariate;
  private _formErrors = constants.PARAMETERS_GAUSSIAN_COVARIATE_POWER_ERRORS;
  private _validationMessages = constants.PARAMETERS_GAUSSIAN_COVARIATE_POWER_VALIDATION_MESSAGES;
  private _quantilesSubscription: Subscription;
  private _gaussianCovariateSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: UntypedFormBuilder,
              private _study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._afterInit = false;
    this._gaussianCovariate = new GaussianCovariate();
    this._quantilesSubscription = this._study_service.quantiles$.subscribe(
      quantiles => {
        if (!isNullOrUndefined(quantiles)) {
          this._quantiles = new Set( quantiles );
        }
      }
    );
    this._gaussianCovariateSubscription = this._study_service.gaussianCovariate$.subscribe(
      gc => {
        if (!isNullOrUndefined(gc)) {
          this._gaussianCovariate = gc;
        }
        if (isNullOrUndefined(this._gaussianCovariate.power_method) || this._gaussianCovariate.power_method.length === 0) {
          this._gaussianCovariate.power_method = [constants.POWER_METHOD.QUANTILE];
        }
      }
    );
    if (isNullOrUndefined(this._quantiles)) {
      this._quantiles = new Set<number>();
    }
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this._isClickNextReference = {value: false};
    this._isClickNextSubscription = this.navigation_service.isClickNext$.subscribe(
      isClickNext => {
        this._isClickNext = isClickNext;
        this._isClickNextReference.value = this._isClickNext;
        if (!isNullOrUndefined(this._quantileForm)) {
          this._quantileForm.get('quantile').updateValueAndValidity();
        }
      }
    );
  }

  ngOnInit() {
    this.buildForm();
    this.updateIsClickNext(false);
    this.checkValidBeforeNavigation();
  }

  ngOnDestroy() {
    this._study_service.updateQuantiles(Array.from(this._quantiles));
    this.updateCovariate();
    this.navigation_service.updateValid(true);
    this._study_service.updateGaussianCovariate(this._gaussianCovariate);
    this._quantilesSubscription.unsubscribe();
    this._isClickNextSubscription.unsubscribe();
  }

  updateIsClickNext(value: boolean) {
    this.navigation_service.updateIsClickNext(value);
    this.onValueChanged();
  }

  buildForm() {
    this._quantileForm = this._fb.group( this.updateQuantileControls() );
    this._quantileForm.setValidators([gaussianPowerValidator(this._quantiles, this._isClickNextReference)]);
    this._quantileForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.checkValidBeforeNavigation();
  }

  checkValidBeforeNavigation() {
    if (this._quantileForm.status === 'VALID') {
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateValid(false);
    }
  }

  updateQuantileControls() {
    let quantileDefault = 0.5;
    if (!isNullOrUndefined(this._quantiles) && this._quantiles.size > 0) {
      quantileDefault = null;
    }
    return { quantile:  [quantileDefault, minMaxValidator(0, 1, this.log)],
             quantilePower: [this._gaussianCovariate.isQuantile()],
             unconditionalPower: [this._gaussianCovariate.isUnconditional()] }
  }

  onValueChanged(data?: any) {
    if (!this._quantileForm) {
      return;
    }
    const form = this._quantileForm;
    this.formErrors['covariatepower'] = '';

    if (!form.valid && this._isClickNextReference) {
      for (const key of Object.keys(form.errors)) {
        this.formErrors.covariatepower = this._validationMessages.covariatepower[key];
      }
    }

    this.checkValidBeforeNavigation()
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

  dismissHelp() {
    this.helpTextModalReference.close();
  }

  addQuantile() {
    const value = this._quantileForm.value.quantile;
    if (!isNullOrUndefined(value)
      && value !== ''
      && value <= 1
      && value >= 0 ) {
      this._quantiles.add(value);
      this._quantileForm.controls['quantile'].reset();
    }
  }

  removeQuantile(value) {
    this._quantiles.delete(value);
    this._quantileForm.controls['quantile'].reset();
  }

  firstQuantile() {
    let ret = true;
    if (isNullOrUndefined(this._quantiles)) {
      ret = true;
    } else {
      ret = this._quantiles.size === 0 ? true : false;
    }
    return ret;
  }

  get quantiles$() {
    return observableOf(this._quantiles);
  }

  get formErrors(): { covariatepower: string} {
    return this._formErrors;
  }

  get quantileForm(): UntypedFormGroup {
    return this._quantileForm;
  }

  isQuantile(): boolean {
    return true;
  }

  updateCovariate() {
    if (!isNullOrUndefined(this._gaussianCovariate)) {
      const methods = [];
      if (this._quantileForm.value.unconditionalPower) {
        methods.push(constants.POWER_METHOD.UNCONDITIONAL);
      }
      if (this._quantileForm.value.quantilePower) {
        methods.push(constants.POWER_METHOD.QUANTILE);
      }
      this._gaussianCovariate.power_method = methods;
    }
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }

}
