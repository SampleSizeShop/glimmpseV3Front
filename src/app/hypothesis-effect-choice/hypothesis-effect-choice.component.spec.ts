import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisEffectChoiceComponent } from './hypothesis-effect-choice.component';
import {ISUFactor} from '../shared/ISUFactor';
import {HypothesisEffect} from '../shared/HypothesisEffect';
import {StudyService} from '../shared/study.service';
import {ReactiveFormsModule} from '@angular/forms';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {constants} from '../shared/constants';
import {Component} from '@angular/core';

describe('HypothesisEffectChoiceComponent', () => {
  let component: HypothesisEffectChoiceComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  @Component({
    selector: 'app-test-component-wrapper',
    template: '<app-hypothesis-effect-choice [variables]="variables"></app-hypothesis-effect-choice>'
  })
  class TestWrapperComponent {
    variables = [];
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ TestWrapperComponent, HypothesisEffectChoiceComponent ],
      providers: [StudyService, { provide: Http, useClass: MockBackend }]
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

  it('should correctly equals lists of Hypothesis Effect Variables', () => {
    const A = new ISUFactor('A', constants.HYPOTHESIS_NATURE.BETWEEN);
    const B = new ISUFactor('B', constants.HYPOTHESIS_NATURE.BETWEEN);
    const C = new ISUFactor('C', constants.HYPOTHESIS_NATURE.WITHIN);
    const D = new ISUFactor('D', constants.HYPOTHESIS_NATURE.WITHIN);
    const E = new ISUFactor('E', constants.HYPOTHESIS_NATURE.WITHIN);
    component.variables.push(A, B, C, D);

    const eff1 = new HypothesisEffect();
    eff1.variables = [A, B, C, D];
    const eff2 = new HypothesisEffect();
    eff2.variables = [B, C, A, D];
    const comp = eff1.equals(eff2);

    expect(comp).toEqual(true);

    eff2.variables = [B, E, A, D];
    const compFalse = eff1.equals(eff2);

    expect(compFalse).toEqual(false);
  });

  it('should return 15 distinct effects', () => {
    const A = new ISUFactor('A', constants.HYPOTHESIS_NATURE.BETWEEN);
    const B = new ISUFactor('B', constants.HYPOTHESIS_NATURE.BETWEEN);
    const C = new ISUFactor('C', constants.HYPOTHESIS_NATURE.WITHIN);
    const D = new ISUFactor('D', constants.HYPOTHESIS_NATURE.WITHIN);
    component.variables.push(A, B, C, D);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(16);
  });

  it('should return 7 distinct effects', () => {
    const A = new ISUFactor('A', constants.HYPOTHESIS_NATURE.BETWEEN);
    const B = new ISUFactor('B', constants.HYPOTHESIS_NATURE.BETWEEN);
    const C = new ISUFactor('C', constants.HYPOTHESIS_NATURE.WITHIN);
    component.variables.push(A, B, C);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(8);
  });

  it('should return 1 distinct effects', () => {
    const A = new ISUFactor('A', constants.HYPOTHESIS_NATURE.BETWEEN);
    component.variables.push(A);
    component.determinePossibleEffects();
    expect(component.possibleEffects.length).toEqual(2);
  });

  it('should return 0 distinct effects', () => {
    component.determinePossibleEffects();
    expect(component.possibleEffects.length).toEqual(1);
  });
});
