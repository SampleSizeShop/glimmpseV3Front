import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';

import { TypeOneErrorComponent } from './type-one-error.component';
import {
  LoggerConfig,
  LoggerModule,
  NGXLogger,
  NGXLoggerHttpService,
  NgxLoggerLevel,
  NGXMapperService,
} from 'ngx-logger';
import {StudyService} from '../../shared/services/study.service';
import {testEnvironment} from '../../../environments/environment.test';
import {NavigationService} from '../../shared/services/navigation.service';
import {LoggerTestingModule, NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import {ControlHelpTextComponent} from '../control-help-text/control-help-text.component';

describe('TypeOneErrorComponent', () => {
  let component: TypeOneErrorComponent;
  let fixture: ComponentFixture<TypeOneErrorComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerTestingModule,
        HttpClientTestingModule,
        MatIconModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })],
      declarations: [
        TypeOneErrorComponent,
        ControlHelpTextComponent ],
      providers: [ StudyService, NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}}, NavigationService ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOneErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
