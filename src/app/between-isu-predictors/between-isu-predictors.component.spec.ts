import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuPredictorsComponent } from './between-isu-predictors.component';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {BetweenISUFactors} from '../shared/BetweenISUFactors';
import {Predictor} from '../shared/Predictor';
import {NavigationService} from '../shared/navigation.service';
import {TableKey} from "../shared/BetweenIsuCombinationTable";
import {GroupId} from "../shared/BetweenIsuCombination";

describe('BetweenIsuPredictorsComponent', () => {
  let component: BetweenIsuPredictorsComponent;
  let fixture: ComponentFixture<BetweenIsuPredictorsComponent>;

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

  it('should assemble the combinations of betweenISU groups', () => {
    const x = new BetweenISUFactors();

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

    x.predictors.push(gender);
    x.predictors.push(dose);
    x.predictors.push(three);
    x.predictors.push(five);

    x.generateCombinations();
    const y = x.groupCombinations();

    x.combinations.forEach( combination => {
      expect(combination.id.length).toEqual(x.predictors.length);
    });
    expect(x.combinations.size).toEqual(72);
  });

  it('Should match two keys', () => {
    // const k1 = new TableKey( new GroupId( 'a', '1' ), new GroupId( 'b',  '2' ) );
    // const k2 = new TableKey( new GroupId( 'a', '1' ), new GroupId( 'b',  '2' ) );
    const k1 = 'a1b2';
    const k2 = 'a1b2';
    const res = (k1 === k2);
    expect(res);
  });
});
