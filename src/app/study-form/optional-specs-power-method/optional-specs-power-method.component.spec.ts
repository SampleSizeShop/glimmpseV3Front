import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsPowerMethodComponent } from './optional-specs-power-method.component';
import {StudyService} from '../study.service';
import {MockBackend} from '@angular/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {HttpClient} from '@angular/common/http';
import {testEnvironment} from '../../../environments/environment.test';

describe('OptionalSpecsPowerMethodComponent', () => {
  let component: OptionalSpecsPowerMethodComponent;
  let fixture: ComponentFixture<OptionalSpecsPowerMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel})] ,
      declarations: [ OptionalSpecsPowerMethodComponent ],
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
    fixture = TestBed.createComponent(OptionalSpecsPowerMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
