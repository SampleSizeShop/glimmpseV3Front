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
import {ActivatedRoute} from "@angular/router";

import { BehaviorSubject } from 'rxjs/Rx';

export class MockActivatedRoute {
  private paramsSubject = new BehaviorSubject(this.testParams);
  private _paramMap = {'meas': 'route'};
  private _testParams: {};

  params  = this.paramsSubject.asObservable();

  get testParams() {
    return this._testParams;
  }
  set testParams(newParams: any) {
    this._testParams = newParams;
    this.paramsSubject.next(newParams);
  }

  get paramMap(): { meas: string } {
    return this._paramMap;
  }

  set paramMap(value: { meas: string }) {
    this._paramMap = value;
  }
}

describe('ParametersRepeatedMeasureCorrelationsComponent', () => {
  let component: ParametersRepeatedMeasureCorrelationsComponent;
  let fixture: ComponentFixture<ParametersRepeatedMeasureCorrelationsComponent>;
  let activeRoute: MockActivatedRoute;

  beforeEach(async(() => {
    activeRoute = new MockActivatedRoute();
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
        {provide: NGXLogger, useClass: NGXLoggerMock},
        {provide: ActivatedRoute, useValue: activeRoute }
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
