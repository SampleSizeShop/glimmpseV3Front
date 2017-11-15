import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisBetweenComponent } from './hypothesis-between.component';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {StudyService} from '../shared/study.service';
import {MathJaxDirective} from '../mathjax/mathjax.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {Component} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';
import {Outcome} from 'app/shared/Outcome';
import {Predictor} from '../shared/Predictor';

describe('HypothesisBetweenComponent no factors', () => {
  let component: HypothesisBetweenComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  @Component({
    selector: 'app-test-component-wrapper',
    template: '<app-hypothesis-between [isuFactors]="isuFactors"></app-hypothesis-between>'
  })
  class TestWrapperComponent {
    isuFactors = new ISUFactors();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        TestWrapperComponent,
        MathJaxDirective,
        HypothesisBetweenComponent
         ],
      providers: [ StudyService, {provide: Http, useClass: MockBackend}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
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
  let fixture: ComponentFixture<TestWrapperComponent>;

  class MockISUFactors extends ISUFactors {
    constructor() {
      super()
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

  @Component({
    selector: 'app-test-component-wrapper',
    template: '<app-hypothesis-between [isuFactors]="isuFactors"></app-hypothesis-between>'
  })
  class TestWrapperComponent {
    isuFactors: ISUFactors;
    constructor(isuFactors?: ISUFactors) {
      if (isuFactors) {
        this.isuFactors = isuFactors;
      } else {
        this.isuFactors = new ISUFactors();
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        TestWrapperComponent,
        MathJaxDirective,
        HypothesisBetweenComponent
         ],
      providers: [ StudyService, {provide: Http, useClass: MockBackend}, {provide: ISUFactors, useClass: MockISUFactors}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create and calculate c matrix for one factor in hypothesis and one not', () => {
    expect(component).toBeTruthy();
  });

  it('should create and calculate c matrix for one factor in hypothesis and one not', () => {
    component.selectHypothesisNature(component.HYPOTHESIS_NATURE.IDENTITY);
    expect(component.texString === '\\begin{bmatrix}0.5 & 0 & 0.5 & 0 \\\\0 & 0.5 & 0 & 0.5 \\end{bmatrix}');
  });

  it('should create and calculate c matrix for one factor in hypothesis and one not', () => {
    component.selectHypothesisNature(component.HYPOTHESIS_NATURE.POLYNOMIAL);
    expect(component.texString === '\\begin{bmatrix}-0.5 & 0.5 & -0.5 & 0.5 \\end{bmatrix}');
  });
});
