import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersStandardDeviationComponent } from './parameters-standard-deviation.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {StudyService} from '../study.service';
import {testEnvironment} from '../../../environments/environment.test';
import {MatTooltip} from '@angular/material';
import {NavigationService} from '../../shared/navigation.service';

describe('ParametersStandardDeviationComponent', () => {
  let component: ParametersStandardDeviationComponent;
  let fixture: ComponentFixture<ParametersStandardDeviationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })
      ],
      declarations: [
        ParametersStandardDeviationComponent,
        CorrelationMatrixComponent,
        MatTooltip
      ],
      providers: [
        StudyService,
        NavigationService,
        {provide: HttpClient, useClass: MockBackend},
        {provide: NGXLogger, useClass: NGXLoggerMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersStandardDeviationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
