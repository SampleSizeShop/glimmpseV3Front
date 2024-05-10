import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersOutcomeCorrelationsComponent } from './parameters-outcome-correlations.component';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {ReactiveFormsModule} from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import {LoggerModule, NGXLogger, } from 'ngx-logger';
import {StudyService} from '../../shared/services/study.service';
import {testEnvironment} from '../../../environments/environment.test';
import {MatTooltipModule } from '@angular/material/tooltip';
import {NavigationService} from '../../shared/services/navigation.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { MatIconModule } from "@angular/material/icon";
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";

describe('ParametersOutcomeCorrelationsComponent', () => {
  let component: ParametersOutcomeCorrelationsComponent;
  let fixture: ComponentFixture<ParametersOutcomeCorrelationsComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTooltipModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })
      ],
      declarations: [
        ParametersOutcomeCorrelationsComponent,
        CorrelationMatrixComponent,
        ControlHelpTextComponent
      ],
      providers: [
        NGXLogger,
        NavigationService,
        StudyService,


        ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
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
