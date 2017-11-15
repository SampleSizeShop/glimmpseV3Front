import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuPredictorsComponent } from './between-isu-predictors.component';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ISUFactors} from '../shared/ISUFactors';
import {Predictor} from '../shared/Predictor';
import {NavigationService} from '../shared/navigation.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';


describe('BetweenIsuPredictorsComponent', () => {
  let component: BetweenIsuPredictorsComponent;
  let fixture: ComponentFixture<BetweenIsuPredictorsComponent>;

  const gender = new Predictor();
  gender.name = 'Gender';
  gender.valueNames = ['m', 'f'];

  const dose = new Predictor();
  dose.name = 'Dose';
  dose.valueNames = ['a', 'b', 'c'];

  const three = new Predictor();
  three.name = 'Three';
  three.valueNames = ['x', 'y', 'z'];

  const five = new Predictor();
  five.name = 'Five';
  five.valueNames = ['1', '2', '3', '4'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ BetweenIsuPredictorsComponent ],
      providers: [StudyService, { provide: Http, useClass: MockBackend }, NavigationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenIsuPredictorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the add BetweenIsuPredictor Button if we are not currently editing a id', () => {
    component.editing = false;
    component.setStage(-1);
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#addbetweenbtn'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should not the add BetweenIsuPredictor Button if we have reached the predictors limit', () => {
    component.editing = false;
    component.betweenIsuPredictors = new Array<Predictor>();
    component.setStage(-1);
    for ( let i = 0; i < component.maxPredictors; i++ ) {
      component.betweenIsuPredictors.push(new Predictor());
    }
    fixture.detectChanges();
    const btn: DebugElement = fixture.debugElement.query(By.css('#addbetweenbtn'));
    expect(!btn);
    const desc: DebugElement = fixture.debugElement.query(By.css('#maxPredictors'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the predictorForm when we click the add BetweenIsuPredictor.', () => {
    component.editing = false;
    component.setStage(-1);
    component.includePredictors();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#predictorForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the groupsForm when we click the next after adding a id value', () => {
    component.editing = false;
    component.setStage(-1);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#groupsForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should add a group when we click add group', () => {
    component.editing = false;
    component.setStage(-1);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    fixture.detectChanges();
    expect(component.groups.length).toEqual(1);
  });

  it('Should add a group when we click add group', () => {
    component.editing = false;
    component.setStage(-1);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.removeGroup('a1')
    fixture.detectChanges();
    expect(component.groups.length).toEqual(0);
  });

  it('Should add a BetweenIsuPredictor to the study design and give the option to add another,' +
    ' once we have added valueNames and clicked next', () => {
    component.editing = false;
    component.setStage(-1);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.groupsForm.get('group').setValue('a2');
    component.addGroup();
    fixture.detectChanges();
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    expect(component.betweenIsuPredictors.length).toEqual(1);
    const desc: DebugElement = fixture.debugElement.query(By.css('#addbetweenbtn'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should remove a BetweenIsuPredictor when we click the remove button', () => {
    component.editing = false;
    component.setStage(-1);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.groupsForm.get('group').setValue('a2');
    component.addGroup();
    fixture.detectChanges();
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    component.removePredictor(component.betweenIsuPredictors[0]);
    expect(component.betweenIsuPredictors.length).toEqual(0);
  });

  it('Should allow us to edit a BetweenIsuPredictor when we click the edit button', () => {
    component.editing = false;
    component.setStage(-1);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.groupsForm.get('group').setValue('a2');
    component.addGroup();
    fixture.detectChanges();
    component.internallyNavigate('NEXT');
    const predictor = component.betweenIsuPredictors[0];
    component.editPredictor(predictor);
    fixture.detectChanges();
    expect(component.betweenIsuPredictors.length).toEqual(0);
    expect(component.groups.length).toEqual(predictor.valueNames.length)
    expect(component.predictorForm.value.predictorName).toEqual(predictor.name);
  });

  it('should assemble the betweenIsuRelativeGroupSizes of > 2 betweenISU valueNames', () => {
    const x = new ISUFactors();
    x.variables.push(gender);
    x.variables.push(dose);
    x.variables.push(three);
    x.variables.push(five);
    x.betweenIsuRelativeGroupSizes = x.generateCombinations(x.predictors);
    x.betweenIsuRelativeGroupSizes.forEach(combination => {
      expect(combination.id.length).toEqual(x.predictors.length);
    });
    expect(x.betweenIsuRelativeGroupSizes.size).toEqual(72);
  });

  it('should assemble the betweenIsuRelativeGroupSizes of 2 betweenISU valueNames', () => {
    const x = new ISUFactors();
    x.variables.push(gender);
    x.variables.push(dose);
    x.betweenIsuRelativeGroupSizes = x.generateCombinations(x.predictors);
    x.betweenIsuRelativeGroupSizes.forEach(combination => {
      expect(combination.id.length).toEqual(x.predictors.length);
    });
    expect(x.betweenIsuRelativeGroupSizes.size).toEqual(6);
  });

  it('should assemble the betweenIsuRelativeGroupSizes of 1 betweenISU valueNames', () => {
    const x = new ISUFactors();
    x.variables.push(gender);
    x.betweenIsuRelativeGroupSizes = x.generateCombinations(x.predictors);
    x.betweenIsuRelativeGroupSizes.forEach(combination => {
      expect(combination.id.length).toEqual(x.predictors.length);
    });
    expect(x.betweenIsuRelativeGroupSizes.size).toEqual(2);
  });

  it('Should get the correct ISUFactorCombination from a map', () => {
    const x = new ISUFactors();
    x.variables.push(gender);
    const tables = x.groupCombinations(x.generateCombinations(x.predictors), x.predictors);
    const member = tables[0].getMember('m', null).name;
    expect(member).toEqual('m');
  });

  it('Should return the expected group value for the special case - one id', () => {
    const x = new ISUFactors();
    x.variables.push(gender);
    const tables = x.groupCombinations(x.generateCombinations(x.predictors), x.predictors);
    const groupName = tables[0].groupName;
    expect(groupName).toEqual('' );
  });

  it('Should return the expected group value for special case - two predictors', () => {
    const x = new ISUFactors();
    x.variables.push(gender);
    x.variables.push(dose);
    const tables = x.groupCombinations(x.generateCombinations(x.predictors), x.predictors);
    const groupNmae = tables[0].groupName;
    expect(groupNmae).toEqual('');
  });

  it('Should return the expected group names for > 2 predictors', () => {
    const x = new ISUFactors();
    x.variables.push(gender);
    x.variables.push(dose);
    x.variables.push(three);
    const tables = x.groupCombinations(x.generateCombinations(x.predictors), x.predictors);
    const groupNmae = tables[0].groupName;
    expect(groupNmae).toEqual('Gender:m');
  });
});
