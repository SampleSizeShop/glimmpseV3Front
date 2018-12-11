import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisEffectChoiceComponent } from './hypothesis-effect-choice.component';
import {ISUFactor} from '../../shared/ISUFactor';
import {Outcome} from '../../shared/Outcome';
import {Cluster} from '../../shared/Cluster';
import {RepeatedMeasure} from '../../shared/RepeatedMeasure';
import {Predictor} from '../../shared/Predictor';
import {HypothesisEffect} from '../../shared/HypothesisEffect';
import {StudyService} from '../study.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {constants} from '../../shared/constants';
import {NGXLogger} from 'ngx-logger';
import {NavigationService} from '../../shared/navigation.service';

describe('HypothesisEffectChoiceComponent', () => {
  let component: HypothesisEffectChoiceComponent;
  let fixture: ComponentFixture<HypothesisEffectChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ HypothesisEffectChoiceComponent ],
      providers: [
        StudyService,
        { provide: HttpClient, useClass: MockBackend },
        NGXLogger,
        NavigationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisEffectChoiceComponent);
    component = fixture.componentInstance;
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

  it('should return 3 distinct effects + grand mean', () => {
    const A = new Outcome('A');
    const B = new RepeatedMeasure('B');
    const C = new Predictor('C');
    const D = new Cluster('D');
    component.variables.push(A, B, C, D);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(4);
  });

  it('should return 1 distinct effect + grand mean-1', () => {
    const A = new Outcome('A');
    const B = new Predictor('B');
    component.variables.push(A, B);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(2);
  });

  it('should return 1 distinct effect + grand mean-2', () => {
    const A = new Cluster('A');
    const B = new RepeatedMeasure('B');
    component.variables.push(A, B);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(2);
  });

  it('should return 0 distinct effect + grand mean', () => {
    const A = new Cluster('A');
    component.variables.push(A);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(1);
  });

  it('should return 0 distinct effect + grand mean', () => {
    const A = new Outcome('A');
    component.variables.push(A);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(1);
  });

  it('should return 0 distinct effects', () => {
    component.determinePossibleEffects();
    expect(component.possibleEffects.length).toEqual(1);
  });

  it('Should sort correctly. (1 Between 1 Within)', () => {
    const A = new Predictor('A');
    const B = new RepeatedMeasure('B');
    component.variables.push(A, B);
    component.determinePossibleEffects();

    expect(component.possibleEffects[3].nature).toEqual('Between');
    expect(component.possibleEffects[2].nature).toEqual('Between');
    expect(component.possibleEffects[1].nature).toEqual('Within');
    expect(component.possibleEffects[0].nature).toEqual('Between x Within');
  });

  it('Should sort correctly. (3 Between)', () => {
    const A = new Predictor('A');
    const B = new Predictor('B');
    const C = new Predictor('C');
    component.variables.push(A, B, C);
    component.determinePossibleEffects();

    expect(component.possibleEffects[7].nature).toEqual('Between');
    expect(component.possibleEffects[6].nature).toEqual('Between');
    expect(component.possibleEffects[5].nature).toEqual('Between');
    expect(component.possibleEffects[4].nature).toEqual('Between');
    expect(component.possibleEffects[3].nature).toEqual('Between x Between');
    expect(component.possibleEffects[2].nature).toEqual('Between x Between');
    expect(component.possibleEffects[1].nature).toEqual('Between x Between');
    expect(component.possibleEffects[0].nature).toEqual('Between x Between x Between');
  });

  it('Should sort correctly. (3 Within)', () => {
    const A = new RepeatedMeasure('A');
    const B = new RepeatedMeasure('B');
    const C = new RepeatedMeasure('C');
    component.variables.push(A, B, C);
    component.determinePossibleEffects();

    expect(component.possibleEffects[7].nature).toEqual('Between');
    expect(component.possibleEffects[6].nature).toEqual('Within');
    expect(component.possibleEffects[5].nature).toEqual('Within');
    expect(component.possibleEffects[4].nature).toEqual('Within');
    expect(component.possibleEffects[3].nature).toEqual('Within x Within');
    expect(component.possibleEffects[2].nature).toEqual('Within x Within');
    expect(component.possibleEffects[1].nature).toEqual('Within x Within');
    expect(component.possibleEffects[0].nature).toEqual('Within x Within x Within');
  });

  it('Should sort correctly. (2 Between 2 Within)', () => {
    const A = new Predictor('A');
    const B = new Predictor('B');
    const C = new RepeatedMeasure('C');
    const D = new RepeatedMeasure('D');
    component.variables.push(A, B, C, D);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(16);
    expect(component.possibleEffects[15].nature).toEqual('Between');
    expect(component.possibleEffects[14].nature).toEqual('Between');
    expect(component.possibleEffects[13].nature).toEqual('Between');
    expect(component.possibleEffects[12].nature).toEqual('Between x Between');
    expect(component.possibleEffects[11].nature).toEqual('Within');
    expect(component.possibleEffects[10].nature).toEqual('Within');
    expect(component.possibleEffects[9].nature).toEqual('Within x Within');

    expect(component.possibleEffects[8].nature).toEqual('Between x Within');
    expect(component.possibleEffects[7].nature).toEqual('Between x Within');
    expect(component.possibleEffects[6].nature).toEqual('Between x Within');
    expect(component.possibleEffects[5].nature).toEqual('Between x Within');

    expect(component.possibleEffects[4].nature).toEqual('Between x Between x Within');
    expect(component.possibleEffects[3].nature).toEqual('Between x Between x Within');
    expect(component.possibleEffects[2].nature).toEqual('Between x Within x Within');
    expect(component.possibleEffects[1].nature).toEqual('Between x Within x Within');

    expect(component.possibleEffects[0].nature).toEqual('Between x Between x Within x Within');
  });

  it('Should sort correctly. (3 Between 1 Within)', () => {
    const A = new Predictor('A');
    const B = new Predictor('B');
    const C = new Predictor('C');
    const D = new RepeatedMeasure('D');
    component.variables.push(A, B, C, D);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(16);
    expect(component.possibleEffects[15].nature).toEqual('Between');
    expect(component.possibleEffects[14].nature).toEqual('Between');
    expect(component.possibleEffects[13].nature).toEqual('Between');
    expect(component.possibleEffects[12].nature).toEqual('Between');
    expect(component.possibleEffects[11].nature).toEqual('Between x Between');
    expect(component.possibleEffects[10].nature).toEqual('Between x Between');
    expect(component.possibleEffects[9].nature).toEqual('Between x Between');
    expect(component.possibleEffects[8].nature).toEqual('Between x Between x Between');
    expect(component.possibleEffects[7].nature).toEqual('Within');

    expect(component.possibleEffects[6].nature).toEqual('Between x Within');
    expect(component.possibleEffects[5].nature).toEqual('Between x Within');
    expect(component.possibleEffects[4].nature).toEqual('Between x Within');

    expect(component.possibleEffects[3].nature).toEqual('Between x Between x Within');
    expect(component.possibleEffects[2].nature).toEqual('Between x Between x Within');
    expect(component.possibleEffects[1].nature).toEqual('Between x Between x Within');

    expect(component.possibleEffects[0].nature).toEqual('Between x Between x Between x Within');
  });

  it('Should sort correctly. (1 Between 3 Within)', () => {
    const A = new Predictor('A');
    const B = new RepeatedMeasure('B');
    const C = new RepeatedMeasure('C');
    const D = new RepeatedMeasure('D');
    component.variables.push(A, B, C, D);
    component.determinePossibleEffects();

    expect(component.possibleEffects.length).toEqual(16);
    expect(component.possibleEffects[15].nature).toEqual('Between');
    expect(component.possibleEffects[14].nature).toEqual('Between');
    expect(component.possibleEffects[13].nature).toEqual('Within');
    expect(component.possibleEffects[12].nature).toEqual('Within');
    expect(component.possibleEffects[11].nature).toEqual('Within');
    expect(component.possibleEffects[10].nature).toEqual('Within x Within');
    expect(component.possibleEffects[9].nature).toEqual('Within x Within');
    expect(component.possibleEffects[8].nature).toEqual('Within x Within');
    expect(component.possibleEffects[7].nature).toEqual('Within x Within x Within');

    expect(component.possibleEffects[6].nature).toEqual('Between x Within');
    expect(component.possibleEffects[5].nature).toEqual('Between x Within');
    expect(component.possibleEffects[4].nature).toEqual('Between x Within');

    expect(component.possibleEffects[3].nature).toEqual('Between x Within x Within');
    expect(component.possibleEffects[2].nature).toEqual('Between x Within x Within');
    expect(component.possibleEffects[1].nature).toEqual('Between x Within x Within');

    expect(component.possibleEffects[0].nature).toEqual('Between x Within x Within x Within');
  });
});
