import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';

import { ParametersRepeatedMeasureCorrelationsComponent } from './parameters-repeated-measure-correlations.component';
import {LoggerModule, NGXLogger, } from 'ngx-logger';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {CorrelationMatrixService} from '../../shared/services/correlationMatrix.service';
import {StudyService} from '../../shared/services/study.service';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {testEnvironment} from '../../../environments/environment.test';
import { MatLegacyTooltip as MatTooltip } from '@angular/material/legacy-tooltip';
import {NavigationService} from '../../shared/services/navigation.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";
import { MatIconModule } from "@angular/material/icon";

let component: ParametersRepeatedMeasureCorrelationsComponent;
let fixture: ComponentFixture<ParametersRepeatedMeasureCorrelationsComponent>;
let activatedRoute: ActivatedRouteStub;

let httpClient: HttpClient;
let httpTestingController: HttpTestingController;

describe('ParametersRepeatedMeasureCorrelationsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    activatedRoute.testParamMap = {name: 'Test'};
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatIconModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })
      ],
      declarations: [
        ParametersRepeatedMeasureCorrelationsComponent,
        CorrelationMatrixComponent,
        MatTooltip,
        ControlHelpTextComponent
      ],
      providers: [
        StudyService,
        CorrelationMatrixService,
        NavigationService,
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersRepeatedMeasureCorrelationsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
