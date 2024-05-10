import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {constants} from '../../shared/model/constants';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {NavigationService} from '../../shared/services/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';
import {StudyService} from '../../shared/services/study.service';
import {of as observableOf, Subscription, Observable} from 'rxjs';


@Component({
  selector: 'app-target-power',
  templateUrl: './target-power.component.html',
  styleUrls: ['./target-power.component.scss']
})
export class TargetPowerComponent implements OnInit, DoCheck, OnDestroy {

  private _powerSubscription: Subscription;
  private _navigationSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;
  private _powerSampleSizeForm: UntypedFormGroup;
  private _power: number[];
  private _formErrors = constants.TARGET_EVENT_FORM_ERRORS;
  private _validationMessages = constants.TARGET_EVENT_VALIDATION_MESSAGES;
  private _directionCommand: string;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};


  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private fb: UntypedFormBuilder,
              private log: NGXLogger,
              private _navigation_service: NavigationService,
              private modalService: NgbModal) {

    this.powerSubscription = this.study_service.power$.subscribe(
      power => {
        this.power = power;
      }
    );
    this._navigationSubscription = this.study_service.navigationDirection$.subscribe(
      direction => {
        this._directionCommand = direction;
        this.checkValidBeforeNavigation(this._directionCommand);
      }
    );
    this._showHelpTextSubscription = this._navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this._isClickNextReference = {value: false};
    this._isClickNextSubscription = this._navigation_service.isClickNext$.subscribe(
      isClickNext => {
        this._isClickNext = isClickNext;
        this._isClickNextReference.value = this.isClickNext;
        if (
          this._powerSampleSizeForm !== null
          && this._powerSampleSizeForm !== undefined
        ) {
          this._powerSampleSizeForm.get('power').updateValueAndValidity();
        }
      }
    );
    this.buildForm();
  }

  ngOnInit() {
    this._afterInit = true;
    if (
      this._power === null || this._power === undefined || this._power.length === 0
    ) {
      this.setNextEnabled('INVALID');
    }
    this.updateIsClickNext(false);
  }

  ngDoCheck() {
    this.study_service.updatePower(this.power);
    this.checkValidBeforeNavigation('NEXT')
  }

  ngOnDestroy() {
    this.setNextEnabled('VALID');
    this._powerSubscription.unsubscribe();
    this._navigationSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  updateIsClickNext(value: boolean) {
    this._navigation_service.updateIsClickNext(value);
  }

  buildForm(): void {
    this.powerSampleSizeForm = this.fb.group({
      power: [null, minMaxValidator(0.00000001, 0.9999999, this.log)]
    });

    this.powerSampleSizeForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  addPower() {
    const value = this.powerSampleSizeForm.value.power;
    if (
      value !== null
      && value !== undefined
      && value !== ''
      && this._power.indexOf(value) === -1
      && !this.formErrors.power
    ) {
      this._power.push(value);
      this.powerSampleSizeForm.reset();
    }
    this.updateIsClickNext(false);
  }

  removePower(value: number) {
    const index = this.power.indexOf(value);
    if (index > -1) {
      this.power.splice(index, 1);
    }
    this.powerSampleSizeForm.reset();
  }

  hasPower(): boolean {
    return this.power.length > 0 ? true : false;
  }

  get powers$(): Observable<number[]> {
    return observableOf(this.power)
  }

  onValueChanged(data?: any) {
    if (!this.powerSampleSizeForm) {
      return;
    }
    const form = this.powerSampleSizeForm;

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

  hasError() {
    if (this._formErrors.power === null || this._formErrors.power === undefined) {
      return false;
    } else {
      return true;
    }
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }

  checkValidBeforeNavigation(direction: string): void {
    if ( direction === 'NEXT' ) {
      if (
        this._power === null || this._power === undefined || this._power.length === 0
      ) {
        this.setNextEnabled('INVALID');
      } else if (this._power && !this.formErrors.power) {
        this.setNextEnabled('VALID');
      }
    }

    if (this.isClickNext) {
      this.checkValidator();
    }
  }

  checkValidator(data?: any) {
    if (!this.powerSampleSizeForm) {
      return;
    }
    const form = this.powerSampleSizeForm;

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
    this._navigation_service.updateValid(valid);
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

  get powerSubscription(): Subscription {
    return this._powerSubscription;
  }

  set powerSubscription(value: Subscription) {
    this._powerSubscription = value;
  }

  get formErrors(): { power: string; ciwidth: string } {
    return this._formErrors;
  }

  set formErrors(value: { power: string; ciwidth: string }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    power: { minval: string; maxval: string };
  } {
    return this._validationMessages;
  }

  set validationMessages(value: {
    power: { minval: string; maxval: string };
  }) {
    this._validationMessages = value;
  }

  get power(): number[] {
    return this._power;
  }

  set power(value: number[]) {
    this._power = value;
  }

  get powerSampleSizeForm(): UntypedFormGroup {
    return this._powerSampleSizeForm;
  }

  set powerSampleSizeForm(value: UntypedFormGroup) {
    this._powerSampleSizeForm = value;
  }

  get isClickNext(): boolean {
    return this._isClickNext;
  }
}
