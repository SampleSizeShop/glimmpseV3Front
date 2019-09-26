import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateComponent } from './calculate.component';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';
import {MathJaxDirective} from '../../mathjax/mathjax.directive';
import {Predictor} from '../../shared/model/Predictor';
import {testCombinationMap1, testCombinationMap2} from './test_inputs/testCombinationMap';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {NavigationService} from '../../shared/services/navigation.service';
import {StatusComponent} from '../status/status.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';

describe('CalculateComponent', () => {
  let component: CalculateComponent;
  let fixture: ComponentFixture<CalculateComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalculateComponent,
        MathJaxDirective,
        StatusComponent],
      imports: [
        HttpClientTestingModule,
        NgbModule,
        MatIconModule
      ],
      providers: [
        StudyService,
        NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        NavigationService]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should show correct group combination for 1 predictors.', () => {
    const predictors: Array<Predictor> = new Array();
    let tempPredictor;

    tempPredictor = new Predictor('p1')
    tempPredictor.valueNames = ['1', '2'];
    predictors.push(tempPredictor);

    component.detailPredictorCombination = [];
    component.generateCombinations(predictors);

    expect(component.detailPredictorCombination).toEqual([['1'], ['2']]);
  });

  it('Should show correct group combination for 2 predictors.', () => {
    const predictors: Array<Predictor> = new Array();
    let tempPredictor;

    tempPredictor = new Predictor('p1')
    tempPredictor.valueNames = ['1', '2'];
    predictors.push(tempPredictor);

    tempPredictor = new Predictor('p2')
    tempPredictor.valueNames = ['3', '4'];
    predictors.push(tempPredictor);

    component.detailPredictorCombination = [];
    component.generateCombinations(predictors);

    expect(component.detailPredictorCombination).toEqual([['1', '3'], ['1', '4'], ['2', '3'], ['2', '4']]);
  });

  it('Should show correct group combination for 3 predictors.', () => {
    const predictors: Array<Predictor> = new Array();
    let tempPredictor;

    tempPredictor = new Predictor('p1')
    tempPredictor.valueNames = ['1', '2', '3'];
    predictors.push(tempPredictor);

    tempPredictor = new Predictor('p2')
    tempPredictor.valueNames = ['4', '5'];
    predictors.push(tempPredictor);

    tempPredictor = new Predictor('p3')
    tempPredictor.valueNames = ['6', '7'];
    predictors.push(tempPredictor);

    component.detailPredictorCombination = [];
    component.generateCombinations(predictors);

    expect(component.detailPredictorCombination).toEqual([
      ['1', '4', '6'], ['1', '4', '7'], ['1', '5', '6'], ['1', '5', '7'],
      ['2', '4', '6'], ['2', '4', '7'], ['2', '5', '6'], ['2', '5', '7'],
      ['3', '4', '6'], ['3', '4', '7'], ['3', '5', '6'], ['3', '5', '7'], ]);
  });

  it('Should show correct sample size for each group combination with 1 predictor.', () => {
    component.buildCombinationsValueMap(testCombinationMap1['_isuFactors']['betweenIsuRelativeGroupSizes']);
    component.detailSampleSize = component.getSumOfCombinationsValue() * testCombinationMap1['_isuFactors']['smallestGroupSize'];

    expect(component.combinationsValueMap['1']).toEqual(1);
    expect(component.combinationsValueMap['2']).toEqual(3);
    expect(component.detailSampleSize).toEqual(12);
  });

  it('Should show correct sample size for each group combination with 2 predictor.', () => {
    component.buildCombinationsValueMap(testCombinationMap2['_isuFactors']['betweenIsuRelativeGroupSizes']);
    component.detailSampleSize = component.getSumOfCombinationsValue() * testCombinationMap1['_isuFactors']['smallestGroupSize'];

    expect(component.combinationsValueMap['1@3']).toEqual(1);
    expect(component.combinationsValueMap['1@4']).toEqual(3);
    expect(component.combinationsValueMap['1@5']).toEqual(5);
    expect(component.combinationsValueMap['2@3']).toEqual(11);
    expect(component.combinationsValueMap['2@4']).toEqual(9);
    expect(component.combinationsValueMap['2@5']).toEqual(7);

    expect(component.detailSampleSize).toEqual(108);
  });

});
