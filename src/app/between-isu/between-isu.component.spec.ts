import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuComponent } from './between-isu.component';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {BetweenISUFactors} from "../shared/BetweenISUFactors";
import {Predictor} from "../shared/Predictor";

describe('BetweenIsuComponent', () => {
  let component: BetweenIsuComponent;
  let fixture: ComponentFixture<BetweenIsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ BetweenIsuComponent ],
      providers: [StudyService, { provide: Http, useClass: MockBackend }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenIsuComponent);
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
    gender.values = ['m', 'f'];

    const dose = new Predictor();
    dose.name = 'Dose';
    dose.values = ['a', 'b', 'c'];

    const three = new Predictor();
    three.name = 'Three';
    three.values = ['x', 'y', 'z'];

    const five = new Predictor();
    five.name = 'Three';
    five.values = ['1', '2', '3', '4'];

    x.predictors.push(gender);
    x.predictors.push(dose);
    x.predictors.push(three);
    x.predictors.push(five);

    x.generateCombinations();
  });
});
