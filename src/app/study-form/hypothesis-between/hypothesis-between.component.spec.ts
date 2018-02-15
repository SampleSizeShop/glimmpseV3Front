import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisBetweenComponent } from './hypothesis-between.component';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {StudyService} from '../study.service';
import {MathJaxDirective} from '../../mathjax/mathjax.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {ISUFactors} from '../../shared/ISUFactors';
import {Outcome} from 'app/shared/Outcome';
import {Predictor} from '../../shared/Predictor';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';

describe('HypothesisBetweenComponent no factors', () => {
  let component: HypothesisBetweenComponent;
  let fixture: ComponentFixture<HypothesisBetweenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        MathJaxDirective,
        HypothesisBetweenComponent
         ],
      providers: [
        StudyService, {provide: Http, useClass: MockBackend},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisBetweenComponent);
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

describe('HypothesisBetweenComponent with Factors', () => {
  let component: HypothesisBetweenComponent;
  let fixture: ComponentFixture<HypothesisBetweenComponent>;

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
        ReactiveFormsModule
      ],
      declarations: [
        MathJaxDirective,
        HypothesisBetweenComponent
         ],
      providers: [ StudyService,
        {provide: Http, useClass: MockBackend},
        {provide: ISUFactors, useClass: MockISUFactors},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisBetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and calculate c matrix for one factor in hypothesis and one not', () => {
    expect(component).toBeTruthy();
  });
});
