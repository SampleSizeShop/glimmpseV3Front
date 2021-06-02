import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersScaleFactorComponent } from './parameters-scale-factor.component';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';

import {
  LoggerConfig,
  LoggerModule,
  NGXLogger,
  NGXLoggerHttpService,
  NgxLoggerLevel,
  NGXMapperService,
} from 'ngx-logger';
import {ReactiveFormsModule} from '@angular/forms';
import {testEnvironment} from '../../../environments/environment.test';
import {NavigationService} from '../../shared/services/navigation.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {LoggerTestingModule, NGXLoggerHttpServiceMock, NGXMapperServiceMock} from "ngx-logger/testing";
import { MatIconModule } from "@angular/material/icon";
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";

describe('ParametersScaleFactorComponent', () => {
  let component: ParametersScaleFactorComponent;
  let fixture: ComponentFixture<ParametersScaleFactorComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule,
      ReactiveFormsModule,
        MatIconModule,
        LoggerTestingModule,
      LoggerModule.forRoot({
        serverLoggingUrl: testEnvironment.serverLoggingUrl,
        level: testEnvironment.loglevel,
        serverLogLevel: testEnvironment.loglevel
      })],
      declarations: [
        ParametersScaleFactorComponent,
        ControlHelpTextComponent
      ],
      providers: [
        StudyService,
        NavigationService,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}}
      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersScaleFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
