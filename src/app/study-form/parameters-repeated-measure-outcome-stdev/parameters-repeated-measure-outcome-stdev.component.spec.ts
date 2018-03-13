import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { ParametersRepeatedMeasureOutcomeStDevComponent } from './parameters-repeated-measure-outcome-stdev.component';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {StudyService} from '../study.service';

import 'rxjs/add/operator/switchMap';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {testEnvironment} from "../../../environments/environment.test";
import {Outcome} from "../../shared/Outcome";
import {RepeatedMeasure} from "../../shared/RepeatedMeasure";
import {ISUFactors} from "../../shared/ISUFactors";

let component: ParametersRepeatedMeasureOutcomeStDevComponent;
let fixture: ComponentFixture<ParametersRepeatedMeasureOutcomeStDevComponent>;
let activatedRoute: ActivatedRouteStub;

describe('ParametersRepeatedMeasureOutcomeStDevComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });


  beforeEach(async(() => {
    activatedRoute.testParamMap = {name: 'Test', outcome: 'outcome1', measure: 'measure1'};
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
        ParametersRepeatedMeasureOutcomeStDevComponent
      ],
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
    fixture = TestBed.createComponent(ParametersRepeatedMeasureOutcomeStDevComponent);
    component = fixture.componentInstance;

    component.isuFactors = new ISUFactors();
    const outcome1 = new Outcome('outcome1');
    const measure1 = new RepeatedMeasure('measure1');
    measure1.noRepeats = 2;
    measure1.valueNames = ['1', '2'];
    component.isuFactors.variables.push(outcome1);
    component.isuFactors.variables.push(measure1);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
