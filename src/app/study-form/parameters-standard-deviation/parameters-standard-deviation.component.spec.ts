import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersStandardDeviationComponent } from './parameters-standard-deviation.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, } from 'ngx-logger';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {HttpClient} from '@angular/common/http';

import {StudyService} from '../../shared/services/study.service';
import {testEnvironment} from '../../../environments/environment.test';
import { MatLegacyTooltip as MatTooltip } from '@angular/material/legacy-tooltip';
import {NavigationService} from '../../shared/services/navigation.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import {ControlHelpTextComponent} from '../control-help-text/control-help-text.component';

describe('ParametersStandardDeviationComponent', () => {
  let component: ParametersStandardDeviationComponent;
  let fixture: ComponentFixture<ParametersStandardDeviationComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        ReactiveFormsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })
      ],
      declarations: [
        ParametersStandardDeviationComponent,
        CorrelationMatrixComponent,
        ControlHelpTextComponent,
        MatTooltip
      ],
      providers: [
        StudyService,
        NavigationService,


      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersStandardDeviationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
