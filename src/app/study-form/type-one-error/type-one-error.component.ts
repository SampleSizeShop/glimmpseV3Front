import {Component, DoCheck, OnInit, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {minMaxValidator} from '../../shared/minmax.validator';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../../shared/constants';
import {StudyService} from '../study.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/navigation.service';
import {of as observableOf, Subscription, Observable} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {StudyDesign} from '../../shared/study-design';

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
  private _typeOneErrorRateForm: FormGroup;
  private _formErrors = constants.TYPE_ONE_ERROR_ERRORS;
  private _validationMessages = constants.TYPE_ONE_ERROR_VALIDATION_MESSAGES;

  private _typeOneErrorRateSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;
  private _warningTypeOneErrorFromPower: boolean;
  private _smallestPower: number;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private fb: FormBuilder,
              private log: NGXLogger,
              private navigation_service: NavigationService,
              private modalService: NgbModal) {
    this.studySubscription = this.study_service.studyDesign$.subscribe( study => {
      this._studyDesign = study;
    });
    this.typeOneErrorRateSubscription = this.study_service.typeOneErrorRate$.subscribe(
      typeOneErrorRate => {
        this.typeOneErrorRate = typeOneErrorRate
      }
    );
    this.warningTypeOneErrorFromPower = false;
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    if (!isNullOrUndefined(this._studyDesign)
      && this.studyDesign.solveFor === constants.SOLVE_FOR_SAMPLESIZE) {
      this.smallestPower = Math.min(...this.studyDesign.power);
    }
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
    this.validTypeOneErrorByPower();
  }

  ngOnDestroy() {
    this.typeOneErrorRateSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  validTypeOneErrorByPower() {
    this.warningTypeOneErrorFromPower = false;
    if (this.typeOneErrorRate.length > 0 && this.studyDesign['_solveFor'] === constants.SOLVE_FOR_SAMPLESIZE) {
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

  warningInputTypeOneError(): boolean {
    const inputTypeOneError = this.typeOneErrorRateForm.get('typeoneerror').value;

    return inputTypeOneError > 0.1;
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

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }

  typeOneErrorStyle() {
    const inputTypeOneError = this.typeOneErrorRateForm.get('typeoneerror').value;

    if (inputTypeOneError > 1.0) {
      return 'error'
    } else if (inputTypeOneError > 0.1) {
      return 'warning'
    }
  }
}
