import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../shared/constants';

@Component({
  selector: 'app-study-form',
  templateUrl: './study-form.component.html',
  styleUrls: ['./study-form.component.scss'],
  providers: [StudyService, NGXLogger]
})
export class StudyFormComponent implements OnInit, OnDestroy {
  private _valid = false;
  private _hasNext: boolean;
  private _hasBack: boolean;
  private _guided: boolean;
  private _targetEvent: string;
  private _solveFor: string;
  private _modeSubscription: Subscription;
  private _targetEventSubscription: Subscription;
  private _solveForSubscription: Subscription;
  private _stages;
  private _noStages: number;

  constructor(private study_service: StudyService, private logger: NGXLogger) {
    this.modeSubscription = this.study_service.modeSelected$.subscribe(
      guided => {
        this.guided = guided;
        this.valid = guided;
      }
    )

    this.targetEventSubscription = this.study_service.targetEventSelected$.subscribe(
      targetEvent => {
        this.targetEvent = targetEvent;
        this.valid = true;
      }
    )

    this.solveForSubscription = this.study_service.solveForSelected$.subscribe(
      solveFor => {
        this.solveFor = solveFor;
        this.valid = true;
      }
    )
  }

  next(): void {
    const current = this.getStage();
    if ( current < this._noStages &&  this.guided ) {
      this.setStage( current + 1 );
    }
    this.setNextBack()
  }

  back(): void {
    const current = this.getStage();
    if ( current > 1 &&  this.guided ) {
      this.setStage( current - 1 );
    }
    this.setNextBack()
  }

  setNextBack(): void {
    const current = this.getStage();
    if ( current < this._noStages ) {
      this.hasNext = true;
    } else {
      this.hasNext = false;
    }
    if ( current > 1 ) {
      this.hasBack = true;
    } else {
      this.hasBack = false;
    }
  }

  ngOnInit() {
    this._stages = constants.STAGES;
    this._noStages = Object.keys(this._stages).length;
    this.hasNext = true;
    this.hasBack = false;
  }

  ngOnDestroy() {
    this.modeSubscription.unsubscribe();
    this.targetEventSubscription.unsubscribe();
    this.solveForSubscription.unsubscribe();
  }

  get valid(): boolean {
    return this._valid;
  }

  set valid(value: boolean) {
    this._valid = value;
  }

  get guided(): boolean {
    return this._guided;
  }

  set guided(value: boolean) {
    this._guided = value;
  }

  getStageName(): string {
    return this._stages[this.study_service.stage];
  }

  getStage(): number {
    return this.study_service.stage;
  }
  setStage(stage: number): void {
    this.study_service.stage = stage;
  }

  get targetEvent(): string {
    return this._targetEvent;
  }

  set targetEvent(value: string) {
    this._targetEvent = value;
  }


  get solveFor(): string {
    return this._solveFor;
  }

  set solveFor(value: string) {
    this._solveFor = value;
  }


  get noStages(): number {
    return this._noStages;
  }

  set noStages(value: number) {
    this._noStages = value;
  }

  get stages() {
    return this._stages;
  }

  set stages(value) {
    this._stages = value;
  }


  get hasNext(): boolean {
    return this._hasNext;
  }

  set hasNext(value: boolean) {
    this._hasNext = value;
  }

  get hasBack(): boolean {
    return this._hasBack;
  }

  set hasBack(value: boolean) {
    this._hasBack = value;
  }

  get modeSubscription(): Subscription {
    return this._modeSubscription;
  }

  set modeSubscription(value: Subscription) {
    this._modeSubscription = value;
  }

  get targetEventSubscription(): Subscription {
    return this._targetEventSubscription;
  }

  set targetEventSubscription(value: Subscription) {
    this._targetEventSubscription = value;
  }

  get solveForSubscription(): Subscription {
    return this._solveForSubscription;
  }

  set solveForSubscription(value: Subscription) {
    this._solveForSubscription = value;
  }
}
