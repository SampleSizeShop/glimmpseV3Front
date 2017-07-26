import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-study-form',
  templateUrl: './study-form.component.html',
  styleUrls: ['./study-form.component.scss'],
  providers: [StudyService]
})
export class StudyFormComponent implements OnInit, OnDestroy {
  valid = false;
  guided: boolean;
  private _targetEvent: string;
  modeSubscription: Subscription;
  targetEventSubscription: Subscription;
  constructor(private study_service: StudyService) {
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
  }

  getStage(): string {
    return this.study_service.stage;
  }

  setStage(stage: string): void {
    this.study_service.stage = stage;
  }

  next(): void {
    if ( this.getStage() === 'MODE' && this.guided ) {
      this.setStage( 'TARGET_EVENT' )
    }
  }

  back(): void {
    if ( this.getStage() === 'TARGET_EVENT' ) {
      this.setStage( 'MODE' )
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.modeSubscription.unsubscribe()
  }

  get targetEvent(): string {
    return this._targetEvent;
  }

  set targetEvent(value: string) {
    this._targetEvent = value;
  }
}
