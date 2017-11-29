import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersStandardDeviationComponent } from './parameters-standard-deviation.component';
import {Component} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {StudyService} from "../shared/study.service";

describe('ParametersStandardDeviationComponent', () => {
  let component: ParametersStandardDeviationComponent;
  let fixture: ComponentFixture<ParametersStandardDeviationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})
      ],
      declarations: [
        ParametersStandardDeviationComponent,
        CorrelationMatrixComponent
      ],
      providers: [
        StudyService,
        {provide: Http, useClass: MockBackend},
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
