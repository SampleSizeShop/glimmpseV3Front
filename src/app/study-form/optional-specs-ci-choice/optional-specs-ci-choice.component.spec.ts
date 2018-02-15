import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsCiChoiceComponent } from './optional-specs-ci-choice.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {StudyService} from '../study.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('OptionalSpecsCiChoiceComponent', () => {
  let component: OptionalSpecsCiChoiceComponent;
  let fixture: ComponentFixture<OptionalSpecsCiChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})
      ],
      declarations: [ OptionalSpecsCiChoiceComponent ],
      providers: [
        StudyService,
        {provide: Router, useClass: RouterStub},
        {provide: Http, useClass: MockBackend},
        {provide: NGXLogger, useClass: NGXLoggerMock},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsCiChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
