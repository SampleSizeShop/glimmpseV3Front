import {Injectable, OnInit, ViewChild} from '@angular/core';
import {StudyDesign} from './study-design';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class StudyService {
  private _study: StudyDesign;
  private _stage: number;
  private _next: string;
  private _targetEvent: string;
  private _stages;

  // user mode observale stream
  private _modeSelectedSource = new Subject<boolean>();
  private _modeSelected$ = this._modeSelectedSource.asObservable();

  // target event observable stream
  private _targetEventSource = new BehaviorSubject<string>('REJECTION');
  private _targetEventSelected$ = this._targetEventSource.asObservable();

  // solve for observable stream
  private _solveForSource = new Subject<string>();
  private _solveForSelected$ = this._solveForSource.asObservable();

  selectMode(guided: boolean) {
    this._modeSelectedSource.next(guided);
  }
  selectTargetEvent(targetEvent: string) {
    this._targetEventSource.next(targetEvent);
  }
  selectSolveFor(solveFor: string) {
    this._solveForSource.next(solveFor);
  }

  constructor(private  http: Http) {
    this._study = new StudyDesign();
    this._stages = environment.stages;
    this._stage = 1;
  }

  get guided(){
    return this.study.guided;
  }

  set guided(mode: boolean){
    this.study.guided = mode;
  }

  get study(): StudyDesign {
    return this._study;
  }

  set study(value: StudyDesign) {
    this._study = value;
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

  get targetEvent(): string {
    return this._targetEvent;
  }

  set targetEvent(value: string) {
    this._targetEvent = value;
  }

  get stages() {
    return this._stages;
  }

  set stages(value) {
    this._stages = value;
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

  get solveForSource(): Subject<string> {
    return this._solveForSource;
  }

  set solveForSource(value: Subject<string>) {
    this._solveForSource = value;
  }

  get solveForSelected$(): Observable<string> {
    return this._solveForSelected$;
  }

  set solveForSelected$(value: Observable<string>) {
    this._solveForSelected$ = value;
  }
}

