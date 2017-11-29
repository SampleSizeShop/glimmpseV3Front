import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersRepeatedMeasureOutcomeCorrelationsComponent } from './parameters-repeated-measure-outcome-correlations.component';
import {Component} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {StudyService} from "../study.service";

describe('ParametersRepeatedMeasureOutcomeCorrelationsComponent', () => {
  let component: ParametersRepeatedMeasureOutcomeCorrelationsComponent;
  let fixture: ComponentFixture<ParametersRepeatedMeasureOutcomeCorrelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ReactiveFormsModule,
      LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})
    ],
      declarations: [
        ParametersRepeatedMeasureOutcomeCorrelationsComponent,
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
    fixture = TestBed.createComponent(ParametersRepeatedMeasureOutcomeCorrelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
