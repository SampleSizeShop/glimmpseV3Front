import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from '../services/study.service';
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
  modeSubscription: Subscription;
  constructor(private study_service: StudyService) {
    this.modeSubscription = this.study_service.modeSelected$.subscribe(
      guided => {
        this.guided = guided;
        this.valid = !guided;
      }
    )
  }

  getStage(): string {
    return this.study_service.getStage();
  }

  setStage(stage: string): void {
    return this.study_service.setStage(stage);
  }

  next(): void {
    if ( this.getStage() === 'MODE' && this.guided ) {
      this.setStage( 'TARGET_EVENT' )
    }
  }

  ngOnInit() {
    this.study_service.getStudyDesign().name = ('New GLM');
  }

  ngOnDestroy() {
    this.modeSubscription.unsubscribe()
  }

}
