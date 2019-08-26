import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { ParametersRepeatedMeasureStdevComponent } from './parameters-repeated-measure-stdev.component';
import {LoggerModule} from 'ngx-logger';
import {StudyService} from '../../shared/services/study.service';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {testEnvironment} from '../../../environments/environment.test';
import {RepeatedMeasure} from '../../shared/model/RepeatedMeasure';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {NavigationService} from '../../shared/services/navigation.service';

let component: ParametersRepeatedMeasureStdevComponent;
let fixture: ComponentFixture<ParametersRepeatedMeasureStdevComponent>;
let activatedRoute: ActivatedRouteStub;

describe('ParametersRepeatedMeasureOutcomeStDevComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });


  beforeEach(async(() => {
    activatedRoute.testParamMap = {name: 'Test', measure: 'measure1'};
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
        ParametersRepeatedMeasureStdevComponent
      ],
      providers: [
        StudyService,
        NavigationService,
        {provide: Router, useClass: RouterStub},

        ,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersRepeatedMeasureStdevComponent);
    component = fixture.componentInstance;

    component.isuFactors = new ISUFactors();
    const measure1 = new RepeatedMeasure('measure1');
    measure1.noRepeats = 2;
    measure1.valueNames = ['1', '2'];
    component.isuFactors.variables.push(measure1);

    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
