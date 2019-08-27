import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {constants} from '../model/constants';
import {RepeatedMeasure} from '../model/RepeatedMeasure';
import {Cluster} from '../model/Cluster';
import {GaussianCovariate} from '../model/GaussianCovariate';
import {HypothesisEffect} from '../model/HypothesisEffect';
import {ISUFactor} from '../model/ISUFactor';
import {Outcome} from '../model/Outcome';
import {Predictor} from '../model/Predictor';
import {ISUFactors} from '../model/ISUFactors';
import {PowerCurve} from '../model/PowerCurve';
import {StudyDesign} from '../model/study-design';
import {ConfidenceInterval} from '../model/ConfidenceInterval';

@Injectable()
export class StudyService {
  private _next: string;
  private _stages;

  private _studyTitleSource = new BehaviorSubject<string>(null);
  private _studyTitle$ = this._studyTitleSource.asObservable();

  private _modeSelectedSource = new Subject<boolean>();
  private _modeSelected$ = this._modeSelectedSource.asObservable();

  private _targetEventSource = new BehaviorSubject<string>(constants.REJECTION_EVENT);
  private _targetEventSelected$ = this._targetEventSource.asObservable();

  private _solveForSource = new BehaviorSubject<string>(constants.SOLVE_FOR_POWER);
  private _solveForSelected$ = this._solveForSource.asObservable();

  private _powerSource = new BehaviorSubject<Array<number>>([]);
  private _power$ = this._powerSource.asObservable();

  private _ciwidthSource = new BehaviorSubject<number>(1);
  private _ciwidth$ = this._ciwidthSource.asObservable();

  private _selectedTestsSource = new BehaviorSubject<string[]>([constants.STATISTICAL_TESTS.HOTELLING_LAWLEY]);
  private _selectdTests$ = this._selectedTestsSource.asObservable();

  private _typeOneErrorRateSource = new BehaviorSubject<Array<number>>([]);
  private _typeOneErrorRate$ = this._typeOneErrorRateSource.asObservable();

  private _quantilesSource = new BehaviorSubject<Array<number>>(new Array<number>());
  private _quantiles$ = this._quantilesSource.asObservable();

  private _withinIsuOutcomesSource = new BehaviorSubject<Outcome[]>([]);
  private _withinIsuOutcomes$ = this._withinIsuOutcomesSource.asObservable();

  private _withinIsuRepeatedMeasuresSource = new BehaviorSubject<RepeatedMeasure[]>([]);
  private _withinIsuRepeatedMeasures$ = this._withinIsuRepeatedMeasuresSource.asObservable();

  private _withinIsuClusterSource = new BehaviorSubject<Cluster>(null);
  private _withinIsuCluster$ = this._withinIsuClusterSource.asObservable();

  private _betweenIsuPredictorSource = new BehaviorSubject<Array<Predictor>>([]);
  private _betweenIsuPredictors$ = this._betweenIsuPredictorSource.asObservable();

  private _isuFactorsSource = new BehaviorSubject<ISUFactors>(new ISUFactors());
  private _isuFactors$ = this._isuFactorsSource.asObservable();

  private _gaussianCovariateSource = new BehaviorSubject<GaussianCovariate>(null);
  private _gaussianCovariate$ = this._gaussianCovariateSource.asObservable();

  private _confidenceIntervalSource = new BehaviorSubject<ConfidenceInterval>(null);
  private _confidenceInterval$ = this._confidenceIntervalSource.asObservable();

  private _hypothesisEffectVariablesSource = new BehaviorSubject<Array<ISUFactor>>(null);
  private _hypothesisEffectVariables$ = this._hypothesisEffectVariablesSource.asObservable();

  private _betweenHypothesisNatureSource = new BehaviorSubject<string>(constants.CONTRAST_MATRIX_NATURE.GLOBAL_TRENDS);
  private _betweenHypothesisNature$ = this._betweenHypothesisNatureSource.asObservable();

  private _withinHypothesisNatureSource = new BehaviorSubject<string>(constants.CONTRAST_MATRIX_NATURE.GLOBAL_TRENDS);
  private _withinHypothesisNature$ = this._withinHypothesisNatureSource.asObservable();

  private _hypothesisEffectSource = new BehaviorSubject<HypothesisEffect>(null);
  private _hypothesisEffect$ = this._hypothesisEffectSource.asObservable();

  private _varianceScaleFactorsSource = new BehaviorSubject<Array<number>>([]);
  private _varianceScaleFactors$ = this._varianceScaleFactorsSource.asObservable();

  private _scaleFactorSource = new BehaviorSubject<Array<number>>([]);
  private _scaleFactor$ = this._scaleFactorSource.asObservable();

  private _powerCurveSource = new BehaviorSubject<PowerCurve>(null);
  private _powerCurve$ = this._powerCurveSource.asObservable();

  private _studyDesignSource = new BehaviorSubject<StudyDesign>(null);
  private _studyDesign$ = this._studyDesignSource.asObservable();

  private _navigationDirectionSource = new Subject<string>();
  private _navigationDirection$ = this.navigationDirectionSource.asObservable();

  private _defineFullBetaSource = new BehaviorSubject<boolean>(false);
  private _defineFullBeta$ = this._defineFullBetaSource.asObservable();

  updateStudyTitle(title: string) {
    this._studyTitleSource.next(title);
  }

  selectMode(guided: boolean) {
    this._modeSelectedSource.next(guided);
  }
  selectTargetEvent(targetEvent: string) {
    this._targetEventSource.next(targetEvent);
  }
  updateSolveFor(solveFor: string) {
    this._solveForSource.next(solveFor);
  }

  updatePower(power: number[]) {
    this._powerSource.next(power);
  }

  updateCiWidth(ciWidth: number) {
    this._ciwidthSource.next(ciWidth);
  }

  updateSelectedTests(tests: string[]) {
    this._selectedTestsSource.next(tests);
  }

  updateTypeOneErrorRate(rate: Array<number>) {
    this._typeOneErrorRateSource.next(rate);
  }

  updateQuantiles(quantiles: Array<number>) {
    this._quantilesSource.next(quantiles);
  }

  updateWthinIsuOutcomes(outcomes: Outcome[]) {
    this._withinIsuOutcomesSource.next(outcomes);
  }

  updateWithinIsuRepeatedMeasures(measures: RepeatedMeasure[]) {
    this._withinIsuRepeatedMeasuresSource.next(measures);
  }

  updateWithinIsuCluster(cluster: Cluster) {
    this._withinIsuClusterSource.next(cluster);
  }

  updateBetweenIsuPredictors(betweenIsuPredictors: Array<Predictor>) {
    this._betweenIsuPredictorSource.next(betweenIsuPredictors);
  }

  updateIsuFactors(isuFactors: ISUFactors) {
    this._isuFactorsSource.next(isuFactors);
  }

  updateGaussianCovariate(gaussianCovariate: GaussianCovariate) {
    this._gaussianCovariateSource.next(gaussianCovariate);
  }

  updateConfidenceInterval(confidenceInterval: ConfidenceInterval) {
    this._confidenceIntervalSource.next(confidenceInterval);
  }

  updateHypothesisEffectVariables(variables: Array<ISUFactor>) {
    this._hypothesisEffectVariablesSource.next(variables);
  }

  updateBetweenHypothesisNature(betweenHypothesisNature: string) {
    this._betweenHypothesisNatureSource.next(betweenHypothesisNature);
  }

  updateWithinHypothesisNature(withinHypothesisNature: string) {
    this._withinHypothesisNatureSource.next(withinHypothesisNature);
  }

  updateHypothesisEffect(hypothesisEffect: HypothesisEffect) {
    this._hypothesisEffectSource.next(hypothesisEffect);
  }

  updateScaleFactor(scaleFactor: Array<number>) {
    this._scaleFactorSource.next(scaleFactor);
  }

  updateVarianceScaleFactors(varianceScaleFactors: Array<number>) {
    this._varianceScaleFactorsSource.next(varianceScaleFactors);
  }

  updatePowerCurve(powerCurve: PowerCurve) {
    this._powerCurveSource.next(powerCurve);
  }

  updateStudyDesign(studyDesign: StudyDesign) {
    this._studyDesignSource.next(studyDesign);
  }

  updateDirection(direction: string) {
    this.navigationDirectionSource.next(direction);
  }

  updateDefineFullBeta(fullBeta: boolean) {
    this._defineFullBetaSource.next(fullBeta);
  }

  constructor(private  http: HttpClient) {
    this._stages = constants.STAGES;
  }

  get next(): string {
    return this._next;
  }

  set next(value: string) {
    this._next = value;
  }

  get modeSelectedSource(): Subject<boolean> {
    return this._modeSelectedSource;
  }

  set modeSelectedSource(value: Subject<boolean>) {
    this._modeSelectedSource = value;
  }

  get modeSelected$(): Observable<boolean> {
    return this._modeSelected$;
  }

  set modeSelected$(value: Observable<boolean>) {
    this._modeSelected$ = value;
  }

  get targetEventSource(): BehaviorSubject<string> {
    return this._targetEventSource;
  }

  set targetEventSource(value: BehaviorSubject<string>) {
    this._targetEventSource = value;
  }

  get targetEventSelected$(): Observable<string> {
    return this._targetEventSelected$;
  }

  set targetEventSelected$(value: Observable<string>) {
    this._targetEventSelected$ = value;
  }

  get solveForSource(): BehaviorSubject<string> {
    return this._solveForSource;
  }

  set solveForSource(value: BehaviorSubject<string>) {
    this._solveForSource = value;
  }

  get solveForSelected$(): Observable<string> {
    return this._solveForSelected$;
  }

  set solveForSelected$(value: Observable<string>) {
    this._solveForSelected$ = value;
  }

  get power$(): Observable<number[]> {
    return this._power$;
  }

  set power$(value: Observable<number[]>) {
    this._power$ = value;
  }

  get ciwidth$(): Observable<number> {
    return this._ciwidth$;
  }

  set ciwidth$(value: Observable<number>) {
    this._ciwidth$ = value;
  }

  get selectdTests$(): Observable<string[]> {
    return this._selectdTests$;
  }

  set selectdTests$(value: Observable<string[]>) {
    this._selectdTests$ = value;
  }

  get typeOneErrorRate$(): Observable<Array<number>> {
    return this._typeOneErrorRate$;
  }

  set typeOneErrorRate$(value: Observable<Array<number>>) {
    this._typeOneErrorRate$ = value;
  }

  get withinIsuOutcomes$(): Observable<Outcome[]> {
    return this._withinIsuOutcomes$;
  }

  set withinIsuOutcomes$(value: Observable<Outcome[]>) {
    this._withinIsuOutcomes$ = value;
  }

  get withinIsuRepeatedMeasures$(): Observable<RepeatedMeasure[]> {
    return this._withinIsuRepeatedMeasures$;
  }

  set withinIsuRepeatedMeasures$(value: Observable<RepeatedMeasure[]>) {
    this._withinIsuRepeatedMeasures$ = value;
  }

  get withinIsuCluster$(): Observable<Cluster> {
    return this._withinIsuCluster$;
  }

  set withinIsuCluster$(value: Observable<Cluster>) {
    this._withinIsuCluster$ = value;
  }

  get betweenIsuPredictors$(): Observable<Array<Predictor>> {
    return this._betweenIsuPredictors$;
  }

  set betweenIsuPredictors$(value: Observable<Array<Predictor>>) {
    this._betweenIsuPredictors$ = value;
  }

  get isuFactors$(): Observable<ISUFactors> {
    return this._isuFactors$;
  }

  set isuFactors$(value: Observable<ISUFactors>) {
    this._isuFactors$ = value;
  }

  get gaussianCovariate$(): Observable<GaussianCovariate> {
    return this._gaussianCovariate$;
  }

  set gaussianCovariate$(value: Observable<GaussianCovariate>) {
    this._gaussianCovariate$ = value;
  }

  get confidenceInterval$(): Observable<ConfidenceInterval> {
    return this._confidenceInterval$;
  }

  set confidenceInterval$(value: Observable<ConfidenceInterval>) {
    this._confidenceInterval$ = value;
  }

  get betweenHypothesisNature$(): Observable<string> {
    return this._betweenHypothesisNature$;
  }

  set betweenHypothesisNature$(value: Observable<string>) {
    this._betweenHypothesisNature$ = value;
  }

  get withinHypothesisNature$(): Observable<string> {
    return this._withinHypothesisNature$;
  }

  set withinHypothesisNature$(value: Observable<string>) {
    this._withinHypothesisNature$ = value;
  }

  get hypothesisEffect$(): Observable<HypothesisEffect> {
    return this._hypothesisEffect$;
  }

  set hypothesisEffect$(value: Observable<HypothesisEffect>) {
    this._hypothesisEffect$ = value;
  }


  get scaleFactor$(): Observable<Array<number>> {
    return this._scaleFactor$;
  }

  set scaleFactor$(value: Observable<Array<number>>) {
    this._scaleFactor$ = value;
  }

  get varianceScaleFactors$(): Observable<Array<number>> {
    return this._varianceScaleFactors$;
  }

  set varianceScaleFactors$(value: Observable<Array<number>>) {
    this._varianceScaleFactors$ = value;
  }

  get powerCurve$(): Observable<PowerCurve> {
    return this._powerCurve$;
  }

  set powerCurve$(value: Observable<PowerCurve>) {
    this._powerCurve$ = value;
  }

  get studyDesignSource(): BehaviorSubject<StudyDesign> {
    return this._studyDesignSource;
  }

  set studyDesignSource(value: BehaviorSubject<StudyDesign>) {
    this._studyDesignSource = value;
  }

  get studyDesign$(): Observable<StudyDesign> {
    return this._studyDesign$;
  }

  get navigationDirectionSource(): Subject<string> {
    return this._navigationDirectionSource;
  }

  get navigationDirection$(): Observable<string> {
    return this._navigationDirection$;
  }

  get defineFullBeta$(): Observable<boolean> {
    return this._defineFullBeta$;
  }

  set defineFullBeta$(value: Observable<boolean>) {
    this._defineFullBeta$ = value;
  }

  get studyTitle$(): Observable<string> {
    return this._studyTitle$;
  }

  set studyTitle$(value: Observable<string>) {
    this._studyTitle$ = value;
  }

  get quantiles$(): Observable<Array<number>> {
    return this._quantiles$;
  }

  set quantiles$(value: Observable<Array<number>>) {
    this._quantiles$ = value;
  }

  updateAll(study: StudyDesign) {
    this.updateDefineFullBeta(study.define_full_beta);
    this.updateStudyTitle(study.name);
    this.selectTargetEvent(study.targetEvent);
    this.updateSolveFor(study.solveFor);
    this.updatePower(study.power);
    this.updateCiWidth(study.ciwidth);
    this.updateSelectedTests(study.selectedTests);
    this.updateTypeOneErrorRate(study.typeOneErrorRate);
    this.updateQuantiles(study.quantiles);
    this.updateWthinIsuOutcomes(study.isuFactors.outcomes);
    this.updateWithinIsuRepeatedMeasures(study.isuFactors.repeatedMeasures);
    this.updateWithinIsuCluster(study.isuFactors.cluster);
    this.updateBetweenIsuPredictors(study.isuFactors.predictors);
    this.updateIsuFactors(study.isuFactors);
    this.updateGaussianCovariate(study.gaussianCovariate);
    this.updateHypothesisEffectVariables(study.isuFactors.hypothesis);
    this.updateDefineFullBeta(study.define_full_beta);
    this.updateBetweenHypothesisNature(study.isuFactors.cMatrix.type);
    this.updateWithinHypothesisNature(study.isuFactors.uMatrix.type);
    const effect = new HypothesisEffect();
    effect.variables = study.isuFactors.hypothesis;
    this.updateHypothesisEffect(effect);
    this.updateScaleFactor(study.scaleFactor);
    this.updateVarianceScaleFactors(study.varianceScaleFactors);
    this.updateStudyDesign(study);
  }
}

