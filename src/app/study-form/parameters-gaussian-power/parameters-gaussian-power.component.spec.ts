import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersGaussianPowerComponent } from './parameters-gaussian-power.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NavigationService} from '../../shared/services/navigation.service';
import {HttpClient} from '@angular/common/http';
import {StudyService} from '../../shared/services/study.service';
import {ActivatedRouteStub} from '../../../testing/router-stubs';

import {ActivatedRoute} from '@angular/router';
import {GaussianCovariate} from '../../shared/model/GaussianCovariate';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from "ngx-logger";
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from "ngx-logger/testing";
import { MatIconModule } from "@angular/material/icon";
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";

describe('ParametersGaussianPowerComponent', () => {
  let component: ParametersGaussianPowerComponent;
  let fixture: ComponentFixture<ParametersGaussianPowerComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatIconModule, HttpClientTestingModule],
      declarations: [
        ParametersGaussianPowerComponent,
        ControlHelpTextComponent
      ],
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
    fixture = TestBed.createComponent(ParametersGaussianPowerComponent);
    component = fixture.componentInstance;
    component._gaussianCovariate = new GaussianCovariate();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
