import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NGXLogger} from 'ngx-logger';
import {minMaxValidator} from '../../shared/minmax.validator';
import {constants} from '../../shared/constants';

@Component({
  selector: 'app-solve-for',
  templateUrl: './solve-for.component.html',
  styleUrls: ['./solve-for.component.scss'],
  providers: [NGXLogger]
})
export class SolveForComponent implements OnInit, DoCheck, OnDestroy {
  private _solveFor: string;
  private _power: number;
  private _ciwidth: number;
  private _targetEvent: string;
  private _powerSampleSizeForm: FormGroup;
  private _targetEventSubscription: Subscription;
  private _solveForSubscription: Subscription;
  private _powerSubscription: Subscription;
  private _ciwidthSubscription: Subscription;
  private _formErrors = constants.TARGET_EVENT_FORM_ERRORS;
  private _validationMessages = constants.TARGET_EVENT_VALIDATION_MESSAGES;

  constructor(private study_service: StudyService, private fb: FormBuilder, private logger: NGXLogger) {
    this.targetEventSubscription = this.study_service.targetEventSelected$.subscribe(
      targetEvent => {
        this.targetEvent = targetEvent;
      }
    )
    this.solveForSubscription = this.study_service.solveForSelected$.subscribe(
      solveFor => {
        this.solveFor = solveFor;
      }
    );
    this.powerSubscription = this.study_service.power$.subscribe(
      power => {
        this.power = power;
      }
    );
    this.ciwidthSubscription = this.study_service.ciwidth$.subscribe(
      ciwidth => {
        this.ciwidth = ciwidth;
      }
    );
    this.buildForm();
  }

  buildForm(): void {
    this.powerSampleSizeForm = this.fb.group({
      power: [this.power, minMaxValidator(0, 1, this.logger)],
      ciwidth: [this.ciwidth, minMaxValidator(0, 10, this.logger)]
    });

    this.powerSampleSizeForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.powerSampleSizeForm) {
      return;
    }
    const form = this.powerSampleSizeForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
            this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
   }

  isRejection(): boolean {
    return this.targetEvent === constants.REJECTION_EVENT;
  }

  isCIWidth(): boolean {
    return this.targetEvent === constants.CIWIDTH_EVENT;
  }

  isWAVR(): boolean {
    return this.targetEvent === constants.WAVR_EVENT;
  }

  ngOnInit() {}

  ngDoCheck() {
    this.study_service.updateSolveFor(this.solveFor);
    if (this.isSampleSize()) {
      this.study_service.updatePower(this.powerSampleSizeForm.value.power);
      if (this.isCIWidth() || this.isWAVR()) {
        this.study_service.updateCiWidth(this.powerSampleSizeForm.value.ciwidth);
      }
    }
  }

  ngOnDestroy() {
    this.targetEventSubscription.unsubscribe();
  }

  selectPower() {
    this.solveFor = constants.SOLVE_FOR_POWER;
    this.study_service.updateSolveFor(this.solveFor);
  }

  selectSampleSize() {
    this.solveFor = constants.SOLVE_FOR_SAMPLESIZE;
    this.study_service.updateSolveFor(this.solveFor);
  }

  isPower(): boolean {
    return this.solveFor === constants.SOLVE_FOR_POWER;
  }

  isSampleSize(): boolean {
    return this.solveFor === constants.SOLVE_FOR_SAMPLESIZE;
  }

  get solveFor(): string {
    return this._solveFor;
  }

  set solveFor(value: string) {
    this._solveFor = value;
  }

  get targetEvent(): string {
    return this._targetEvent;
  }

  set targetEvent(value: string) {
    this._targetEvent = value;
  }

  get powerSampleSizeForm(): FormGroup {
    return this._powerSampleSizeForm;
  }

  set powerSampleSizeForm(value: FormGroup) {
    this._powerSampleSizeForm = value;
  }

  get formErrors(): { power: string; ciwidth: string } {
    return this._formErrors;
  }

  set formErrors(value: { power: string; ciwidth: string }) {
    this._formErrors = value;
  }

  get targetEventSubscription(): Subscription {
    return this._targetEventSubscription;
  }

  set targetEventSubscription(value: Subscription) {
    this._targetEventSubscription = value;
  }

  get validationMessages(): {
      power: { minval: string; maxval: string };
      ciwidth: { minval: string; maxval: string }
    }
    {
    return this._validationMessages;
  }

  set validationMessages(value: {
      power: { minval: string; maxval: string };
      ciwidth: { minval: string; maxval: string }
    }) {
    this._validationMessages = value;
  }


  get power(): number {
    return this._power;
  }

  set power(value: number) {
    this._power = value;
  }

  get ciwidth(): number {
    return this._ciwidth;
  }

  set ciwidth(value: number) {
    this._ciwidth = value;
  }

  get solveForSubscription(): Subscription {
    return this._solveForSubscription;
  }

  set solveForSubscription(value: Subscription) {
    this._solveForSubscription = value;
  }

  get powerSubscription(): Subscription {
    return this._powerSubscription;
  }

  set powerSubscription(value: Subscription) {
    this._powerSubscription = value;
  }

  get ciwidthSubscription(): Subscription {
    return this._ciwidthSubscription;
  }

  set ciwidthSubscription(value: Subscription) {
    this._ciwidthSubscription = value;
  }
}
