import { Component, OnInit } from '@angular/core';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-solve-for',
  templateUrl: './solve-for.component.html',
  styleUrls: ['./solve-for.component.scss']
})
export class SolveForComponent implements OnInit {
  private _solveFor: string;
  private _targetEvent: string;
  powerSampleSizeForm: FormGroup;
  targetEventSubscription: Subscription;

  constructor(private study_service: StudyService, private fb: FormBuilder) {
    this.targetEventSubscription = this.study_service.targetEventSelected$.subscribe(
      targetEvent => {
        this.targetEvent = targetEvent;
      }
    )
    this.createForm();
  }

  createForm(): void {
    this.powerSampleSizeForm = this.fb.group({
      power: '',
      sampleSize: '',
      ciwidth: ''
    })
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
