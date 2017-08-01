import { Component, OnInit } from '@angular/core';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';
import {NGXLogger} from 'ngx-logger';
import {trigger, state, style, animate, transition} from '@angular/animations';

export function minMaxValidator(min: number, max: number, logger?: NGXLogger): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    if (val < min) {
      if (logger) {
        logger.error('value is less than ' + min )
      }
      return { 'minval': val }
    } else if ( val > max ) {
      if (logger) {
        logger.error('value greater less than max ' + max )
      }
      return { 'maxval': val }
    } else {
      return null;
    }
  }
}

@Component({
  selector: 'app-solve-for',
  templateUrl: './solve-for.component.html',
  styleUrls: ['./solve-for.component.scss'],
  providers: [NGXLogger]
})
export class SolveForComponent implements OnInit {
  private _solveFor: string;
  private _targetEvent: string;
  powerSampleSizeForm: FormGroup;
  targetEventSubscription: Subscription;
  formErrors = {
    'power': '',
    'samplesize': '',
    'ciwidth': ''
  };

  validationMessages = {
    'power': {
      'minval':      'Value too low.',
      'maxval':     'Value too high' },
    'samplesize': {
      'minval':      'Value too low.',
      'maxval':     'Value too high' },
    'ciwidth': {
      'minval':      'Value too low.',
      'maxval':     'Value too high' }
  };

  constructor(private study_service: StudyService, private fb: FormBuilder, private logger: NGXLogger) {
    this.targetEventSubscription = this.study_service.targetEventSelected$.subscribe(
      targetEvent => {
        this.targetEvent = targetEvent;
      }
    )
    this.buildForm();
  }

  buildForm(): void {
    this.powerSampleSizeForm = this.fb.group({
      power: ['0.5', minMaxValidator(0, 1, this.logger)],
      samplesize: ['10', minMaxValidator(1, 1000, this.logger)],
      ciwidth: ['1', minMaxValidator(0, 10, this.logger)]
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
    return this.targetEvent === 'REJECTION';
  }

  isCIWidth(): boolean {
    return this.targetEvent === 'CIWIDTH';
  }

  isWAVR(): boolean {
    return this.targetEvent === 'WAVR';
  }

  ngOnInit() {
    this.selectPower()
  }

  selectPower() {
    this.solveFor = 'POWER'
    this.study_service.selectSolveFor(this.solveFor);
  }

  selectSampleSize() {
    this.solveFor = 'SAMPLE_SIZE'
    this.study_service.selectSolveFor(this.solveFor);
  }

  isPower(): boolean {
    return this.solveFor === 'POWER';
  }

  isSampleSize(): boolean {
    return this.solveFor === 'SAMPLE_SIZE';
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
}
