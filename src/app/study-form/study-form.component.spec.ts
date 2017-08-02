import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFormComponent } from './study-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {UserModeComponent} from '../user-mode/user-mode.component';
import {TargetEventComponent} from '../target-event/target-event.component';
import {SolveForComponent} from '../solve-for/solve-for.component';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import any = jasmine.any;

describe('StudyFormComponent', () => {
  let component: StudyFormComponent;
  let fixture: ComponentFixture<StudyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'}) ],
      declarations: [ StudyFormComponent, UserModeComponent, TargetEventComponent, SolveForComponent ],
      providers: [ StudyService, { provide: Http, useClass: MockBackend }, {provide: NGXLogger, useClass: NGXLoggerMock} ]
    })
    .compileComponents();
  }));

  it('Should set the stage when next is called', () => {
    if ( component.stages ) {
      const getSpy = spyOn(component, 'getStage');
      spyOn(component, 'setStage');
      for ( let i = 1 ; i <= component.noStages; i++ ) {
        getSpy.and.returnValue(i)
        component.next();
      }
      expect(component.setStage).toHaveBeenCalledTimes(component.noStages - 1);
    } else {
      expect(false)
    }
  });

  it('Should set the stage when back is called unless we are ate stage 1', () => {
    if ( component.stages ) {
      const getSpy = spyOn(component, 'getStage');
      spyOn(component, 'setStage');
      for ( let i = 1; i <= component.noStages; i++ ) {
        getSpy.and.returnValue(i)
        component.back();
      }
      expect(component.setStage).toHaveBeenCalledTimes(component.noStages - 1);
    } else {
      expect(false)
    }
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
