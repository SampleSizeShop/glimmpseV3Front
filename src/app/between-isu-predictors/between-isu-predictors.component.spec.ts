import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuPredictorsComponent } from './between-isu-predictors.component';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {BetweenISUFactors} from '../shared/BetweenISUFactors';
import {Predictor} from '../shared/Predictor';
import {NavigationService} from '../shared/navigation.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';


describe('BetweenIsuPredictorsComponent', () => {
  let component: BetweenIsuPredictorsComponent;
  let fixture: ComponentFixture<BetweenIsuPredictorsComponent>;

  const gender = new Predictor();
  gender.name = 'Gender';
  gender.groups = ['m', 'f'];

  const dose = new Predictor();
  dose.name = 'Dose';
  dose.groups = ['a', 'b', 'c'];

  const three = new Predictor();
  three.name = 'Three';
  three.groups = ['x', 'y', 'z'];

  const five = new Predictor();
  five.name = 'Five';
  five.groups = ['1', '2', '3', '4'];

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

  it('Should show the add BetweenIsuPredictor Button if we are not currently editing a predictor', () => {
    component.editing = false;
    component.setStage(-1);
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#addbetweenbtn'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the predictorForm when we click the add BetweenIsuPredictor.', () => {
    component.editing = false;
    component.setStage(-1);
    component.includeBetweenIsuFactors();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#predictorForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the groupsForm when we click the next after adding a predictor name', () => {
    component.editing = false;
    component.setStage(-1);
    component.includeBetweenIsuFactors();
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
    component.includeBetweenIsuFactors();
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
    component.includeBetweenIsuFactors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.removeGroup('a1')
    fixture.detectChanges();
    expect(component.groups.length).toEqual(0);
  });

  it('Should add a BetweenIsuPredictor to the study design and give the option to add another,' +
    ' once we have added groups and clicked next', () => {
    component.editing = false;
    component.setStage(-1);
    component.includeBetweenIsuFactors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.groupsForm.get('group').setValue('a2');
    component.addGroup();
    fixture.detectChanges();
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    expect(component.betweenIsuFactors.predictors.length).toEqual(1);
    const desc: DebugElement = fixture.debugElement.query(By.css('#addbetweenbtn'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the group size form if we are solving for power and we have defined all of our predictors', () => {
    component.editing = false;
    component.setStage(-1);
    component.solveFor = 'POWER';
    component.includeBetweenIsuFactors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.groupsForm.get('group').setValue('a2');
    component.addGroup();
    fixture.detectChanges();
    component.internallyNavigate('NEXT');
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    expect(component.betweenIsuFactors.predictors.length).toEqual(1);
    const desc: DebugElement = fixture.debugElement.query(By.css('#groupSizeForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the relative group size form if we are solving for power and we have defined all of our predictors', () => {
    component.editing = false;
    component.setStage(-1);
    component.solveFor = 'SAMPLESIZE';
    component.includeBetweenIsuFactors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.groupsForm.get('group').setValue('a2');
    component.addGroup();
    fixture.detectChanges();
    component.internallyNavigate('NEXT');
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    expect(component.betweenIsuFactors.predictors.length).toEqual(1);
    const desc: DebugElement = fixture.debugElement.query(By.css('#relativeGroupSizeForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should allow the user to add another predictor when you navigate back from the relative groupsize form.', () => {
    component.editing = false;
    component.setStage(-1);
    component.solveFor = 'SAMPLESIZE';
    component.includeBetweenIsuFactors();
    component.predictorForm.get('predictorName').setValue('A');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.groupsForm.get('group').setValue('a2');
    component.addGroup();
    fixture.detectChanges();
    component.internallyNavigate('NEXT');
    component.internallyNavigate('NEXT');
    component.internallyNavigate('BACK');
    fixture.detectChanges();

    component.includeBetweenIsuFactors();
    component.predictorForm.get('predictorName').setValue('B');
    component.internallyNavigate('NEXT');
    component.groupsForm.get('group').setValue('b1');
    component.addGroup();
    component.groupsForm.get('group').setValue('b2');
    component.addGroup();
    fixture.detectChanges();
    component.internallyNavigate('NEXT');
    component.internallyNavigate('NEXT');
    fixture.detectChanges();

    expect(component.betweenIsuFactors.predictors.length).toEqual(2);
    const stageName = component.stageName;
    const desc: DebugElement = fixture.debugElement.query(By.css('#relativeGroupSizeForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should assemble the combinations of > 2 betweenISU groups', () => {
    const x = new BetweenISUFactors();
    x.predictors.push(gender);
    x.predictors.push(dose);
    x.predictors.push(three);
    x.predictors.push(five);
    x.generateCombinations();
    x.combinations.forEach( combination => {
      expect(combination.id.length).toEqual(x.predictors.length);
    });
    expect(x.combinations.size).toEqual(72);
  });

  it('should assemble the combinations of 2 betweenISU groups', () => {
    const x = new BetweenISUFactors();
    x.predictors.push(gender);
    x.predictors.push(dose);
    x.generateCombinations();
    x.combinations.forEach( combination => {
      expect(combination.id.length).toEqual(x.predictors.length);
    });
    expect(x.combinations.size).toEqual(6);
  });

  it('should assemble the combinations of 1 betweenISU groups', () => {
    const x = new BetweenISUFactors();
    x.predictors.push(gender);
    x.generateCombinations();
    x.combinations.forEach( combination => {
      expect(combination.id.length).toEqual(x.predictors.length);
    });
    expect(x.combinations.size).toEqual(2);
  });

  it('Should get the correct BetweenIsuCombination from a map', () => {
    const x = new BetweenISUFactors();
    x.predictors.push(gender);

    x.generateCombinations();
    const tables = x.groupCombinations();
    const member = tables[0].getMember('m', null).name;
    expect(member).toEqual('m');
  });

  it('Should return the expected group name for the special case - one predictor', () => {
    const x = new BetweenISUFactors();
    x.predictors.push(gender);

    x.generateCombinations();
    const tables = x.groupCombinations();
    const groupName = tables[0].groupName;
    expect(groupName).toEqual('' );
  });

  it('Should return the expected group name for special case - two predictors', () => {
    const x = new BetweenISUFactors();
    x.predictors.push(gender);
    x.predictors.push(dose);

    x.generateCombinations();
    const tables = x.groupCombinations();
    const groupNmae = tables[0].groupName;
    expect(groupNmae).toEqual('');
  });

  it('Should return the expected group names for > 2 predictors', () => {
    const x = new BetweenISUFactors();
    x.predictors.push(gender);
    x.predictors.push(dose);
    x.predictors.push(three);

    x.generateCombinations();
    const tables = x.groupCombinations();
    const groupNmae = tables[0].groupName;
    expect(groupNmae).toEqual('Three:x');
  });
});
