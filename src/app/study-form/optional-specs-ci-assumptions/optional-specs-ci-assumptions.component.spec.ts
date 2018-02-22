import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsCiAssumptionsComponent } from './optional-specs-ci-assumptions.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {StudyService} from '../study.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {testEnvironment} from '../../../environments/environment.test';

describe('OptionalSpecsCiAssumptionsComponent', () => {
  let component: OptionalSpecsCiAssumptionsComponent;
  let fixture: ComponentFixture<OptionalSpecsCiAssumptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })],
      declarations: [ OptionalSpecsCiAssumptionsComponent ],
      providers: [
        StudyService,
        {provide: Router, useClass: RouterStub},
        {provide: HttpClient, useClass: MockBackend},
        {provide: NGXLogger, useClass: NGXLoggerMock},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsCiAssumptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
