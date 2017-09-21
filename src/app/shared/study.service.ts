import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {constants} from './constants';
import {RepeatedMeasure} from './RepeatedMeasure';
import {Cluster} from './Cluster';
import {BetweenISUFactors} from "./BetweenISUFactors";

@Injectable()
export class StudyService {
  private _stage: number;
  private _next: string;
  private _stages;

  private _modeSelectedSource = new Subject<boolean>();
  private _modeSelected$ = this._modeSelectedSource.asObservable();

  private _targetEventSource = new BehaviorSubject<string>(constants.REJECTION_EVENT);
  private _targetEventSelected$ = this._targetEventSource.asObservable();

  private _solveForSource = new BehaviorSubject<string>(constants.SOLVE_FOR_POWER);
  private _solveForSelected$ = this._solveForSource.asObservable();

  private _powerSource = new BehaviorSubject<number>(0.5);
  private _power$ = this._powerSource.asObservable();

  private _samplesizeSource = new BehaviorSubject<number>(10);
  private _samplesize$ = this._samplesizeSource.asObservable();

  private _ciwidthSource = new BehaviorSubject<number>(1);
  private _ciwidth$ = this._ciwidthSource.asObservable();

  private _selectedTestsSource = new BehaviorSubject<string[]>([constants.STATISTICAL_TESTS.HOTELLING_LAWLEY]);
  private _selectdTests$ = this._selectedTestsSource.asObservable();

  private _typeOneErrorRateSource = new BehaviorSubject<number>(0.05);
  private _typeOneErrorRate$ = this._typeOneErrorRateSource.asObservable();

  private _withinIsuOutcomesSource = new BehaviorSubject<string[]>([]);
  private _withinIsuOutcomes$ = this._withinIsuOutcomesSource.asObservable();

  private _withinIsuRepeatedMeasuresSource = new BehaviorSubject<RepeatedMeasure[]>([]);
  private _withinIsuRepeatedMeasures$ = this._withinIsuRepeatedMeasuresSource.asObservable();

  private _withinIsuClusterSource = new BehaviorSubject<Cluster>(null);
  private _withinIsuCluster$ = this._withinIsuClusterSource.asObservable();

  private _betweenIsuFactorsSource = new BehaviorSubject<BetweenISUFactors>(null);
  private _betweenIsuFactors$ = this._betweenIsuFactorsSource.asObservable();

  selectMode(guided: boolean) {
    this._modeSelectedSource.next(guided);
  }
  selectTargetEvent(targetEvent: string) {
    this._targetEventSource.next(targetEvent);
  }
  updateSolveFor(solveFor: string) {
    this._solveForSource.next(solveFor);
  }

  updatePower(power: number) {
    this._powerSource.next(power);
  }

  updateSamplesize(samplesize: number) {
    this._samplesizeSource.next(samplesize);
  }

  updateCiWidth(ciWidth: number) {
    this._ciwidthSource.next(ciWidth);
  }

  updateSelectedTests(tests: string[]) {
    this._selectedTestsSource.next(tests);
  }

  updateTypeOneErrorRate(rate: number) {
    this._typeOneErrorRateSource.next(rate);
  }

  updateWthinIsuOutcomes(outcomes: string[]) {
    this._withinIsuOutcomesSource.next(outcomes);
  }

  updateWithinIsuRepeatedMeasures(measures: RepeatedMeasure[]) {
    this._withinIsuRepeatedMeasuresSource.next(measures);
  }

  updateWithinIsuCluster(cluster: Cluster) {
    this._withinIsuClusterSource.next(cluster);
  }

  updateBetweenIsuFactors(betweenIsuFactors: BetweenISUFactors) {
    this._betweenIsuFactorsSource.next(betweenIsuFactors)
  }

  constructor(private  http: Http) {
    this._stages = constants.STAGES;
    this._stage = 1;
  }

  get stage(): number {
    return this._stage;
  }

  set stage(value: number) {
    this._stage = value;
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

  get power$(): Observable<number> {
    return this._power$;
  }

  set power$(value: Observable<number>) {
    this._power$ = value;
  }

  get samplesize$(): Observable<number> {
    return this._samplesize$;
  }

  set samplesize$(value: Observable<number>) {
    this._samplesize$ = value;
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

  get typeOneErrorRate$(): Observable<number> {
    return this._typeOneErrorRate$;
  }

  set typeOneErrorRate$(value: Observable<number>) {
    this._typeOneErrorRate$ = value;
  }

  get withinIsuOutcomes$(): Observable<string[]> {
    return this._withinIsuOutcomes$;
  }

  set withinIsuOutcomes$(value: Observable<string[]>) {
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

  get betweenIsuFactors$(): Observable<BetweenISUFactors> {
    return this._betweenIsuFactors$;
  }

  set betweenIsuFactors$(value: Observable<BetweenISUFactors>) {
    this._betweenIsuFactors$ = value;
  }
}

