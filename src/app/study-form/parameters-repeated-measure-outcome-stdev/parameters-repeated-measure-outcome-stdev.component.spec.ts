import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { ParametersRepeatedMeasureOutcomeStDevComponent } from './parameters-repeated-measure-outcome-stdev.component';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {StudyService} from '../study.service';

import 'rxjs/add/operator/switchMap';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';

let component: ParametersRepeatedMeasureOutcomeStDevComponent;
let fixture: ComponentFixture<ParametersRepeatedMeasureOutcomeStDevComponent>;
let activatedRoute: ActivatedRouteStub;

describe('ParametersRepeatedMeasureOutcomeStDevComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });


  beforeEach(async(() => {
    activatedRoute.testParamMap = {name: 'Test'};
    TestBed.configureTestingModule({
      imports: [
      ReactiveFormsModule,
      LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})
    ],
      declarations: [
        ParametersRepeatedMeasureOutcomeStDevComponent
      ],
      providers: [
        StudyService,
        {provide: Router, useClass: RouterStub},
        {provide: Http, useClass: MockBackend},
        {provide: NGXLogger, useClass: NGXLoggerMock},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersRepeatedMeasureOutcomeStDevComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
