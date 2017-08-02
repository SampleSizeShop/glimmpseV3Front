import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {NGXLogger} from 'ngx-logger';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-study-form',
  templateUrl: './study-form.component.html',
  styleUrls: ['./study-form.component.scss'],
  providers: [StudyService, NGXLogger]
})
export class StudyFormComponent implements OnInit, OnDestroy {
  valid = false;
  guided: boolean;
  private _targetEvent: string;
  private _solveFor: string;
  modeSubscription: Subscription;
  targetEventSubscription: Subscription;
  solveForSubscription: Subscription;
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
  }

  back(): void {
    const current = this.getStage();
    if ( current > 1 &&  this.guided ) {
      this.setStage( current - 1 );
    }
  }

  ngOnInit() {
    this._stages = environment.stages;
    this._noStages = Object.keys(this._stages).length;
  }

  ngOnDestroy() {
    this.modeSubscription.unsubscribe();
    this.targetEventSubscription.unsubscribe();
    this.solveForSubscription.unsubscribe();
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
}
