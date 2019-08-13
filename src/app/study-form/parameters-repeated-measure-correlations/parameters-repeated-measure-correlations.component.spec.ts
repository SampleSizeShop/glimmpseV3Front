import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MockBackend} from '@angular/http/testing';
import {ActivatedRoute, Router} from '@angular/router';

import { ParametersRepeatedMeasureCorrelationsComponent } from './parameters-repeated-measure-correlations.component';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {CorrelationMatrixService} from '../../shared/services/correlationMatrix.service';
import {StudyService} from '../../shared/services/study.service';

import 'rxjs/add/operator/switchMap';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {testEnvironment} from '../../../environments/environment.test';
import {MatTooltip} from '@angular/material';
import {NavigationService} from '../../shared/services/navigation.service';

let component: ParametersRepeatedMeasureCorrelationsComponent;
let fixture: ComponentFixture<ParametersRepeatedMeasureCorrelationsComponent>;
let activatedRoute: ActivatedRouteStub;

describe('ParametersRepeatedMeasureCorrelationsComponent', () => {
  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    activatedRoute.testParamMap = {name: 'Test'};
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
        ParametersRepeatedMeasureCorrelationsComponent,
        CorrelationMatrixComponent,
        MatTooltip
      ],
      providers: [
        StudyService,
        CorrelationMatrixService,
        NavigationService,
        {provide: Router, useClass: RouterStub},
        {provide: HttpClient, useClass: MockBackend},
        {provide: NGXLogger, useClass: NGXLoggerMock},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
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
