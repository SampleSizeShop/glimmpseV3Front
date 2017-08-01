import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {NGXLogger} from 'ngx-logger';


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
    if ( this.getStage() === 'MODE' && this.guided ) {
      this.setStage( 'TARGET_EVENT' )
    } else if ( this.getStage() === 'TARGET_EVENT' && this.guided ) {
      this.setStage( 'SOLVE_FOR' )
    } else if ( this.getStage() === 'SOLVE_FOR' && this.guided ) {
      this.setStage( 'SOLVE_FOR' )
    }
  }

  back(): void {
    if ( this.getStage() === 'TARGET_EVENT' ) {
      this.setStage( 'MODE' )
    } else if ( this.getStage() === 'SOLVE_FOR' ) {
      this.setStage( 'TARGET_EVENT' )
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.modeSubscription.unsubscribe();
    this.targetEventSubscription.unsubscribe();
    this.solveForSubscription.unsubscribe();
  }

  getStage(): string {
    return this.study_service.stage;
  }

  setStage(stage: string): void {
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
}
