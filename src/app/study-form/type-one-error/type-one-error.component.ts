import {Component, DoCheck, OnInit, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../../shared/model/constants';
import {StudyService} from '../../shared/services/study.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';
import {of as observableOf, Subscription, Observable} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {StudyDesign} from '../../shared/model/study-design';
import {typeOneErrorValidator} from '../../shared/validators/type-one-error.validator';

@Component({
  selector: 'app-type-one-error',
  templateUrl: './type-one-error.component.html',
  styleUrls: ['./type-one-error.component.scss'],
  providers: [NGXLogger]
})
export class TypeOneErrorComponent implements DoCheck, OnDestroy, OnInit {
  private _studyDesign: StudyDesign;
  private _studySubscription: Subscription;
  private _typeOneErrorRate: Array<number>;
  private _typeOneErrorRateForm: UntypedFormGroup;
  private _formErrors = constants.TYPE_ONE_ERROR_ERRORS;
  private _validationMessages = constants.TYPE_ONE_ERROR_VALIDATION_MESSAGES;

  private _typeOneErrorRateSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;
  private _warningTypeOneErrorFromPower: boolean;
  private _smallestPower: number;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private fb: UntypedFormBuilder,
              private log: NGXLogger,
              private navigation_service: NavigationService,
              private modalService: NgbModal) {
    this.studySubscription = this.study_service.studyDesign$.subscribe( study => {
      this._studyDesign = study;
    });
    this.typeOneErrorRateSubscription = this.study_service.typeOneErrorRate$.subscribe(
      typeOneErrorRate => {
        this.typeOneErrorRate = typeOneErrorRate;
      }
    );
    this._isClickNextReference = {value: false};
    this._isClickNextSubscription = this.navigation_service.isClickNext$.subscribe(
      isClickNext => {
        this.isClickNext = isClickNext;
        this._isClickNextReference.value = this.isClickNext;
        if (!isNullOrUndefined(this.typeOneErrorRateForm)) {
          this.typeOneErrorRateForm.get('typeoneerror').updateValueAndValidity();
        }
      }
    );
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });


    this.warningTypeOneErrorFromPower = false;
    this._afterInit = false;

    if (!isNullOrUndefined(this._studyDesign)
      && this.studyDesign.solveFor === constants.SOLVE_FOR_SAMPLESIZE) {
      this.smallestPower = Math.min(...this.studyDesign.power);
    }
    this.buildForm();
  }

  buildForm(): void {
    const typeOneDefault = null;
    this.typeOneErrorRateForm = this.fb.group({
      typeoneerror: [typeOneDefault,
                      [minMaxValidator(0, 1, this.log),
                      typeOneErrorValidator(this._typeOneErrorRate, this._isClickNextReference)]
                    ]
    });

    this.typeOneErrorRateForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.typeOneErrorRateForm) {
      return;
    }
    const form = this.typeOneErrorRateForm;

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngOnInit() {
    this._afterInit = true;
    this.updateIsClickNext(false);
    this.checkValidBeforeNavigation();
  }

  ngDoCheck() {
    this.study_service.updateTypeOneErrorRate(this.typeOneErrorRate);
    this.validTypeOneErrorByPower();
    this.checkValidBeforeNavigation();
  }

  ngOnDestroy() {
    this.setNextEnabled('VALID');
    this.typeOneErrorRateSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
    this._isClickNextSubscription.unsubscribe();
  }

  updateIsClickNext(value: boolean) {
    this.navigation_service.updateIsClickNext(value);
  }

  validTypeOneErrorByPower() {
    this.warningTypeOneErrorFromPower = false;
    if (this.typeOneErrorRate.length > 0 && this.studyDesign !== null && this.studyDesign['_solveFor'] === constants.SOLVE_FOR_SAMPLESIZE) {
      const maxTypeOneError = Math.max(...this.typeOneErrorRate);
      const minPower = this.smallestPower;

      if (minPower < maxTypeOneError) {
        this.warningTypeOneErrorFromPower = true;
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

  addAlpha() {
    const value = this.typeOneErrorRateForm.value.typeoneerror;
    if (!isNullOrUndefined(value) &&
      value !== '' &&
      this.typeOneErrorRate.indexOf(value) === -1
    && (
      this.typeOneErrorRateForm.valid
      || this.formErrors.typeoneerror.trim() === constants.TYPE_ONE_ERROR_VALIDATION_MESSAGES.typeoneerror.noalpha.trim()
      )) {
      this._typeOneErrorRate.push(this.typeOneErrorRateForm.value.typeoneerror);
      this.typeOneErrorRateForm.reset();
    }
    this.updateIsClickNext(false);
  }

  removeAlpha(value: number) {
    const index = this._typeOneErrorRate.indexOf(value);
    if (index > -1) {
      this._typeOneErrorRate.splice(index, 1);
    }
    this.typeOneErrorRateForm.reset();
    this.updateIsClickNext(false);
  }

  firstAlpha(): boolean {
    return this.typeOneErrorRate.length === 0 ? true : false;
  }

  warningInputTypeOneError(): boolean {
    const inputTypeOneError = this.typeOneErrorRateForm.get('typeoneerror').value;
    let smallestTypeOneErrorRate = 0;
    if (this.typeOneErrorRate.length > 0) {
      smallestTypeOneErrorRate = Math.max(...this.typeOneErrorRate);
    }

    return inputTypeOneError > 0.1 || smallestTypeOneErrorRate > 0.1;
  }

  get alphas$(): Observable<number[]> {
    return observableOf(this.typeOneErrorRate)
  }

  get typeOneErrorRateForm(): UntypedFormGroup {
    return this._typeOneErrorRateForm;
  }

  set typeOneErrorRateForm(value: UntypedFormGroup) {
    this._typeOneErrorRateForm = value;
  }

  get formErrors(): { power; samplesize; ciwidth } | any {
    return this._formErrors;
  }

  set formErrors(value: { power; samplesize; ciwidth } | any) {
    this._formErrors = value;
  }

  get validationMessages(): { power; samplesize; ciwidth } | any {
    return this._validationMessages;
  }

  set validationMessages(value: { power; samplesize; ciwidth } | any) {
    this._validationMessages = value;
  }

  get typeOneErrorRate(): Array<number> {
    return this._typeOneErrorRate;
  }

  set typeOneErrorRate(value: Array<number>) {
    this._typeOneErrorRate = value;
  }

  get typeOneErrorRateSubscription(): Subscription {
    return this._typeOneErrorRateSubscription;
  }

  set typeOneErrorRateSubscription(value: Subscription) {
    this._typeOneErrorRateSubscription = value;
  }

  get studyDesign() {
    return this._studyDesign;
  }

  get studySubscription(): Subscription {
    return this._studySubscription;
  }

  set studySubscription(value: Subscription) {
    this._studySubscription = value;
  }

  get warningTypeOneErrorFromPower(): boolean {
    return this._warningTypeOneErrorFromPower;
  }

  set warningTypeOneErrorFromPower(value: boolean) {
    this._warningTypeOneErrorFromPower = value;
  }

  get smallestPower(): number {
    return this._smallestPower;
  }

  set smallestPower(value: number) {
    this._smallestPower = value;
  }

  get isClickNext(): boolean {
    return this._isClickNext;
  }

  set isClickNext(value: boolean) {
    this._isClickNext = value;
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }

  checkValidBeforeNavigation(): void {
    if (isNullOrUndefined(this._typeOneErrorRate) || this._typeOneErrorRate.length === 0) {
      this.setNextEnabled('INVALID');
    } else if (!isNullOrUndefined(this._typeOneErrorRate) && this._typeOneErrorRate.length > 0) {
      this.setNextEnabled('VALID');
    }
    if (this.isClickNext) {
      this.checkValidator();
    }
  }

  checkValidator(data?: any) {
    if (!this._typeOneErrorRateForm) {
      return;
    }
    const form = this._typeOneErrorRateForm;

    for (const field of Object.keys(this.validationMessages)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
  }

  typeOneErrorStyle() {
    const inputTypeOneError = this.typeOneErrorRateForm.get('typeoneerror').value;

    if (inputTypeOneError > 1.0) {
      return 'error'
    } else if (inputTypeOneError > 0.1) {
      return 'warning'
    }
  }

  typeOneErrorTableStyle(alpha) {
    if (alpha > 1.0) {
      return 'error'
    } else if (alpha > 0.1 || alpha > this.smallestPower) {
      return 'warning'
    }
  }
}
