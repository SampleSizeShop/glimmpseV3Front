import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuGroupsComponent } from './between-isu-groups.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ISUFactors} from '../shared/ISUFactors';
import {Predictor} from '../shared/Predictor';

describe('BetweenIsuGroupsComponent', () => {
  let component: BetweenIsuGroupsComponent;
  let fixture: ComponentFixture<BetweenIsuGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ BetweenIsuGroupsComponent ],
      providers: [StudyService, { provide: Http, useClass: MockBackend }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenIsuGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the group size form if we are solving for power and have predictors', () => {
    component.solveFor = 'POWER';
    component.isuFactors = new ISUFactors();
    component.isuFactors.variables.push(new Predictor());
    fixture.detectChanges();
    expect(component.isuFactors.predictors.length).toEqual(1);
    const desc: DebugElement = fixture.debugElement.query(By.css('#groupSizeForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the relative group size form if we are solving for power and we have defined all of our predictors', () => {
    component.isuFactors = new ISUFactors();
    component.solveFor = 'SAMPLESIZE';
    component.isuFactors.variables.push(new Predictor());
    fixture.detectChanges();
    expect(component.isuFactors.predictors.length).toEqual(1);
    const desc: DebugElement = fixture.debugElement.query(By.css('#relativeGroupSizeForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should update the smallest group size', () => {
    component.solveFor = 'POWER';
    component.isuFactors = new ISUFactors();
    component.isuFactors.predictors.push(new Predictor());
    component.groupSizeForm.get('smallestGroupSize').setValue('2');
    fixture.detectChanges();
    expect(component.isuFactors.smallestGroupSize).toEqual('2');
  });

  it('Should update the relative group size form.', () => {
    component.isuFactors = new ISUFactors();
    component.solveFor = 'SAMPLESIZE';
    const predictor = new Predictor();
    predictor.name = 'A';
    predictor.valueNames = ['a1', 'a2'];
    component.isuFactors.variables.push(predictor);
    component.isuFactors.betweenIsuRelativeGroupSizes = component.isuFactors.generateCombinations(component.isuFactors.predictors);
    component.updateGroupsizeFormControls();
    component.relativeGroupSizeForm.get('a1').setValue('2')
    fixture.detectChanges();
    expect(component.isuFactors.betweenIsuRelativeGroupSizes.size).toEqual(2);
  });
});
