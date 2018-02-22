import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisWithinComponent } from './hypothesis-within.component';
import {MockBackend} from '@angular/http/testing';
import {HttpClient} from '@angular/common/http';
import {StudyService} from '../study.service';
import {MathJaxDirective} from '../../mathjax/mathjax.directive';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {ActivatedRoute, Router} from '@angular/router';
import {ISUFactors} from '../../shared/ISUFactors';
import {Outcome} from '../../shared/Outcome';
import {testEnvironment} from '../../../environments/environment.test';
import {LoggerModule} from 'ngx-logger';

describe('HypothesisWithinComponent', () => {
  let component: HypothesisWithinComponent;
  let fixture: ComponentFixture<HypothesisWithinComponent>;

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
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })
      ],
      declarations: [
        HypothesisWithinComponent,
        MathJaxDirective ],
      providers: [
        StudyService,
        {provide: HttpClient, useClass: MockBackend},
        {provide: ISUFactors, useClass: MockISUFactors},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
        ]
    })
    .compileComponents();
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
