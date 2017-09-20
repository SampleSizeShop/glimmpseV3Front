import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuPredictorsComponent } from './between-isu-predictors.component';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {BetweenISUFactors} from '../shared/BetweenISUFactors';
import {Predictor} from '../shared/Predictor';
import {NavigationService} from '../shared/navigation.service';


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
  it('Should return the expected group name', () => {
    const x = new BetweenISUFactors();
    x.predictors.push(gender);

    x.generateCombinations();
    const tables = x.groupCombinations();
    const groupNmae = tables[0].groupName;
    expect(groupNmae).toEqual(' Gender:m');
  });
});
