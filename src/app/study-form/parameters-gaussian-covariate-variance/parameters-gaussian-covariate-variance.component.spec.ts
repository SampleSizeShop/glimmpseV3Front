import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersGaussianCovariateVarianceComponent } from './parameters-gaussian-covariate-variance.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {NavigationService} from '../../shared/services/navigation.service';
import {HttpClient} from '@angular/common/http';
import {StudyService} from '../../shared/services/study.service';
import {ActivatedRouteStub} from '../../../testing/router-stubs';

import {ActivatedRoute} from '@angular/router';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from "ngx-logger/testing";

describe('ParametersGaussianCovariateVarianceComponent', () => {
  let component: ParametersGaussianCovariateVarianceComponent;
  let fixture: ComponentFixture<ParametersGaussianCovariateVarianceComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [ ParametersGaussianCovariateVarianceComponent ],
      providers: [
        StudyService,
        NavigationService,
        NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub },

      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersGaussianCovariateVarianceComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
