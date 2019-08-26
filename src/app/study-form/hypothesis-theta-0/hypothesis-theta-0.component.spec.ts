import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisTheta0Component } from './hypothesis-theta-0.component';
import {ActivatedRouteStub} from '../../../testing/router-stubs';

import {ActivatedRoute} from '@angular/router';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {constants} from '../../shared/model/constants';
import {NavigationService} from '../../shared/services/navigation.service';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {LoggerTestingModule, NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('HypothesisTheta0Component', () => {
  let component: HypothesisTheta0Component;
  let fixture: ComponentFixture<HypothesisTheta0Component>;
  let activatedRoute: ActivatedRouteStub;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        LoggerTestingModule,
        ReactiveFormsModule],
      declarations: [ HypothesisTheta0Component ],
      providers: [
        StudyService,
        NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        NavigationService,

        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
    .compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisTheta0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const a  = constants.STAGES;
    const names = []
    Object.keys(a).forEach( key => {names.push(key)});
    expect(component).toBeTruthy();
  });
});
