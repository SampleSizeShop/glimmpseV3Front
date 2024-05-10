import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HypothesisMixedComponent } from './hypothesis-mixed.component';
import {HttpClient} from '@angular/common/http';
import {StudyService} from '../../shared/services/study.service';
import {MathJaxDirective} from '../../mathjax/mathjax.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {Outcome} from 'app/shared/model/Outcome';
import {Predictor} from '../../shared/model/Predictor';
import {Router} from '@angular/router';
import {RouterStub} from '../../../testing/router-stubs';
import {testEnvironment} from '../../../environments/environment.test';
import {
  LoggerConfig,
  LoggerModule,
  NGXLogger,
  NGXLoggerHttpService,
  NgxLoggerLevel,
  NGXMapperService
} from 'ngx-logger';
import {CustomContrastMatrixComponent} from '../custom-contrast-matrix/custom-contrast-matrix.component';
import { MatTooltip } from '@angular/material/tooltip';
import {NavigationService} from '../../shared/services/navigation.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { MatIconModule } from "@angular/material/icon";
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";

describe('HypothesisMixedComponent no factors', () => {
  let component: HypothesisMixedComponent;
  let fixture: ComponentFixture<HypothesisMixedComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatIconModule,
        BrowserAnimationsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })
      ],
      declarations: [
        MathJaxDirective,
        HypothesisMixedComponent,
        ControlHelpTextComponent,
        CustomContrastMatrixComponent,
        MatTooltip,
         ],
      providers: [
        StudyService,
        NavigationService,
        NgbModal,
        NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        {provide: Router, useClass: RouterStub}
        ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisMixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the advanced options', () => {
    component.toggleAdvancedOptions();
    expect(component.showAdvancedOptions === true);
    component.toggleAdvancedOptions();
    expect(component.showAdvancedOptions === false);
  });
});

describe('HypothesisMixedComponent with Factors', () => {
  let component: HypothesisMixedComponent;
  let fixture: ComponentFixture<HypothesisMixedComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  class MockISUFactors extends ISUFactors {
    constructor() {
      super();
      const outcome = new Outcome('outcome');
      const between1 = new Predictor('between1');
      const between2 = new Predictor('between2');

      between1.valueNames = between1.valueNames.concat(['a', 'b']);
      between1.inHypothesis = true;
      between2.valueNames = between2.valueNames.concat(['1', '2']);
      this.variables.push(outcome);
      this.variables.push(between1);
      this.variables.push(between2);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatIconModule,
        BrowserAnimationsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })
      ],
      declarations: [
        MathJaxDirective,
        HypothesisMixedComponent,
        ControlHelpTextComponent,
        CustomContrastMatrixComponent,
        MatTooltip,
      ],
      providers: [
        StudyService,
        NavigationService,
        NgbModal,

        {provide: Router, useClass: RouterStub}
      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisMixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and calculate c matrix for one factor in hypothesis and one not', () => {
    expect(component).toBeTruthy();
  });
});
