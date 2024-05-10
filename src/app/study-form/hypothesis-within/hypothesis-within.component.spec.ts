import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisWithinComponent } from './hypothesis-within.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {StudyService} from '../../shared/services/study.service';
import {MathJaxDirective} from '../../mathjax/mathjax.directive';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {ActivatedRoute, Router} from '@angular/router';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {Outcome} from '../../shared/model/Outcome';
import {testEnvironment} from '../../../environments/environment.test';
import {LoggerModule, NGXLogger} from 'ngx-logger';
import { MatLegacyTooltip as MatTooltip } from '@angular/material/legacy-tooltip';
import {CustomContrastMatrixComponent} from '../custom-contrast-matrix/custom-contrast-matrix.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {NavigationService} from '../../shared/services/navigation.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { MatIconModule } from "@angular/material/icon";
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";

describe('HypothesisWithinComponent', () => {
  let component: HypothesisWithinComponent;
  let fixture: ComponentFixture<HypothesisWithinComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  class MockISUFactors extends ISUFactors {
    constructor() {
      super();
      const outcome = new Outcome('outcome');
      this.variables.push(outcome);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })
      ],
      declarations: [
        HypothesisWithinComponent,
        MathJaxDirective,
        CustomContrastMatrixComponent,
        ControlHelpTextComponent,
        MatTooltip ],
      providers: [
        StudyService,
        NavigationService,
        NgbModal,
        NGXLogger,
        {provide: ISUFactors, useClass: MockISUFactors},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
        ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisWithinComponent);
    component = fixture.componentInstance;
    component.isuFactors.variables.push(new Outcome('outcome'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
