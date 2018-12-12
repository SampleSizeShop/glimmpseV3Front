import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersScaleFactorComponent } from './parameters-scale-factor.component';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {ReactiveFormsModule} from '@angular/forms';
import {testEnvironment} from '../../../environments/environment.test';
import {NavigationService} from '../../shared/navigation.service';

describe('ParametersScaleFactorComponent', () => {
  let component: ParametersScaleFactorComponent;
  let fixture: ComponentFixture<ParametersScaleFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports: [
      ReactiveFormsModule,
      LoggerModule.forRoot({
        serverLoggingUrl: testEnvironment.serverLoggingUrl,
        level: testEnvironment.loglevel,
        serverLogLevel: testEnvironment.loglevel
      })],
      declarations: [ ParametersScaleFactorComponent ],
      providers: [
        StudyService,
        {provide: HttpClient, useClass: MockBackend},
        {provide: NGXLogger, useClass: NGXLoggerMock},
        NavigationService
      ]
    })
    .compileComponents();
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
