import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersOutcomeCorrelationsComponent } from './parameters-outcome-correlations.component';
import {Component} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MockBackend} from '@angular/http/testing';
import {HttpClient} from '@angular/common/http';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {StudyService} from "../study.service";

describe('ParametersOutcomeCorrelationsComponent', () => {
  let component: ParametersOutcomeCorrelationsComponent;
  let fixture: ComponentFixture<ParametersOutcomeCorrelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})
      ],
      declarations: [
        ParametersOutcomeCorrelationsComponent,
        CorrelationMatrixComponent
      ],
      providers: [
        StudyService,
        {provide: HttpClient, useClass: MockBackend},
        {provide: NGXLogger, useClass: NGXLoggerMock}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersOutcomeCorrelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
