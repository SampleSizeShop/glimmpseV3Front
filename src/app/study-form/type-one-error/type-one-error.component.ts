import {Component, DoCheck, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {minMaxValidator} from '../../shared/minmax.validator';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../../shared/constants';
import {StudyService} from '../study.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/navigation.service';
import {of as observableOf, Subscription, Observable} from 'rxjs';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-type-one-error',
  templateUrl: './type-one-error.component.html',
  styleUrls: ['./type-one-error.component.scss'],
  providers: [NGXLogger]
})
export class TypeOneErrorComponent implements DoCheck, OnDestroy, OnInit {
  private _typeOneErrorRate: Array<number>;
  private _typeOneErrorRateForm: FormGroup;
  private _formErrors = constants.TYPE_ONE_ERROR_ERRORS;
  private _validationMessages = constants.TYPE_ONE_ERROR_VALIDATION_MESSAGES;

  private _typeOneErrorRateSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private fb: FormBuilder,
              private log: NGXLogger,
              private navigation_service: NavigationService,
              private modalService: NgbModal) {
    this.typeOneErrorRateSubscription = this.study_service.typeOneErrorRate$.subscribe(
      typeOneErrorRate => {
        this.typeOneErrorRate = typeOneErrorRate
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

  buildForm(): void {
    this.typeOneErrorRateForm = this.fb.group({
      typeoneerror: [0.01, minMaxValidator(0, 1, this.log)]
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
  }

  ngDoCheck() {
    this.study_service.updateTypeOneErrorRate(this.typeOneErrorRate);
  }

  ngOnDestroy() {
    this.typeOneErrorRateSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
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
      this.typeOneErrorRate.indexOf(value) === -1) {
      this._typeOneErrorRate.push(this.typeOneErrorRateForm.value.typeoneerror);
      this.typeOneErrorRateForm.reset();
    }
  }

  removeAlpha(value: number) {
    const index = this._typeOneErrorRate.indexOf(value);
    if (index > -1) {
      this._typeOneErrorRate.splice(index, 1);
    }
    this.typeOneErrorRateForm.reset();
  }

  firstAlpha(): boolean {
    return this.typeOneErrorRate.length === 0 ? true : false;
  }

  get alphas$(): Observable<number[]> {
    return observableOf(this.typeOneErrorRate)
  }

  get typeOneErrorRateForm(): FormGroup {
    return this._typeOneErrorRateForm;
  }

  set typeOneErrorRateForm(value: FormGroup) {
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

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }
}
