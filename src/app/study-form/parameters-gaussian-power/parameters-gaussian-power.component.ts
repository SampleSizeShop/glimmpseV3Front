import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StudyService} from '../study.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NavigationService} from '../../shared/navigation.service';
import {NGXLogger} from 'ngx-logger';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/constants';
import {of as observableOf, Subscription} from 'rxjs';
import {minMaxValidator} from '../../shared/minmax.validator';


@Component({
  selector: 'app-parameters-gaussian-power',
  templateUrl: './parameters-gaussian-power.component.html',
  styleUrls: ['./parameters-gaussian-power.component.scss']
})
export class ParametersGaussianPowerComponent implements OnInit, OnDestroy {

  private _quantileForm: FormGroup;
  private _quantiles: Set<number>;
  private _formErrors = constants.QUANTILE_ERRORS;
  private _validationMessages = constants.BETWEEN_ISU_VALIDATION_MESSAGES;
  private _quantilesSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: FormBuilder,
              private _study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._afterInit = false;
    this._quantilesSubscription = this._study_service.quantiles$.subscribe(
      quantiles => {
        this._quantiles = new Set(quantiles.values());
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
    if (this._quantiles.size > 0) {
      this._study_service.updateQuantiles(this._quantiles);
    }
    this._quantilesSubscription.unsubscribe();
    this._isClickNextSubscription.unsubscribe();
  }

  updateIsClickNext(value: boolean) {
    this.navigation_service.updateIsClickNext(value);
  }

  buildForm() {
    this._quantileForm = this._fb.group( this.updateQuantileControls() );
    this._quantileForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.checkValidBeforeNavigation();
  }

  checkValidBeforeNavigation() {
    return true;
    if (isNullOrUndefined(this._quantiles) ||
      this._quantiles.size < 1 ) {
      this.navigation_service.updateValid(false);
    } else if (this._quantileForm.status === 'VALID') {
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateValid(false);
    }
  }

  updateQuantileControls() {
    return { quantile:  [0.5, minMaxValidator(0, 1, this.log)]}
  }

  onValueChanged(data?: any) {
    if (!this._quantileForm) {
      return;
    }
    const form = this._quantileForm;

    for (const field of Object.keys(this._formErrors)) {
      this._formErrors[field] = '';
      const control = form.get(field);
      if (control && !control.valid) {
        const messages = this._validationMessages[field];
        for (const key of Object.keys(control.errors) ) {
          this._formErrors[field] += messages[key] + ' ';
        }
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
      this._quantileForm.reset();
    }
  }

  removeQuantile(value) {
    this._quantiles.delete(value);
    this._quantileForm.reset();
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

  get formErrors(): { first: string;} {
    return this._formErrors;
  }

  get quantileForm(): FormGroup {
    return this._quantileForm;
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }

}
