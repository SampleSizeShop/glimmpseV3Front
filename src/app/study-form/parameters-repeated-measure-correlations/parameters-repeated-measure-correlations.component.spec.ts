import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersRepeatedMeasureCorrelationsComponent } from './parameters-repeated-measure-correlations.component';
import {Component} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {StudyService} from "../study.service";

describe('ParametersRepeatedMeasureCorrelationsComponent', () => {
  let component: ParametersRepeatedMeasureCorrelationsComponent;
  let fixture: ComponentFixture<ParametersRepeatedMeasureCorrelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})
      ],
      declarations: [
        ParametersRepeatedMeasureCorrelationsComponent,
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
    fixture = TestBed.createComponent(ParametersRepeatedMeasureCorrelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
