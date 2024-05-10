import {of as observableOf, Subscription} from 'rxjs';
import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {constants} from '../../shared/model/constants';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {NGXLogger} from 'ngx-logger';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-parameters-scale-factor',
  templateUrl: './parameters-scale-factor.component.html',
  styleUrls: ['./parameters-scale-factor.component.css']
})
export class ParametersScaleFactorComponent implements OnInit, OnDestroy {

  private _scaleFactor: Array<number>;
  private _scaleFactorForm: UntypedFormGroup;
  private _formErrors = constants.PARAMETERS_SCALE_FACTOR_ERRORS;
  private _validationMessages = constants.PARAMETERS_SCALE_FACTOR_VALIDATION_MESSAGES;

  private _scaleFactorSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private fb: UntypedFormBuilder,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.scaleFactorSubscription = this.study_service.scaleFactor$.subscribe(
      scaleFactor => {
        this.scaleFactor = scaleFactor
      }
    );
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this.buildForm();
  }

  ngOnInit() {
    this._afterInit = true;
    if (!isNullOrUndefined(this.scaleFactor) && this.scaleFactor.length === 0) {
      this.scaleFactor.push(1);
    }
  }

  buildForm(): void {
    this.scaleFactorForm = this.fb.group({
      scalefactor: [null, minMaxValidator(0, 999999999999, this.log)]
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

  ngOnDestroy() {
    this.study_service.updateScaleFactor(this.scaleFactor);
    this.scaleFactorSubscription.unsubscribe();
  }

  addScaleFactor() {
    const value = this.scaleFactorForm.value.scalefactor;
    if (!isNullOrUndefined(value)
        && value !== ''
        && this.scaleFactor.indexOf(value) === -1) {
      this.scaleFactor.push(this.scaleFactorForm.value.scalefactor);
      this.scaleFactorForm.reset(); }
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

  get scaleFactorForm(): UntypedFormGroup {
    return this._scaleFactorForm;
  }

  set scaleFactorForm(value: UntypedFormGroup) {
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
