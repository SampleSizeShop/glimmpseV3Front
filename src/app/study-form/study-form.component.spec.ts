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

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
