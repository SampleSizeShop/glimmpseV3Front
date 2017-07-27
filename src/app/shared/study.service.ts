import {Injectable, ViewChild} from '@angular/core';
import {StudyDesign} from './study-design';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class StudyService {
  private _study: StudyDesign;
  private _stage: string;
  private _next: string;
  private _targetEvent: string;

  // user mode observale stream
  private _modeSelectedSource = new Subject<boolean>();
  modeSelected$ = this._modeSelectedSource.asObservable();

  // target event observable stream
  private _targetEventSource = new BehaviorSubject<string>('REJECTION');
  targetEventSelected$ = this._targetEventSource.asObservable();

  // solve for observable stream
  private _solveForSource = new Subject<string>();
  solveForSelected$ = this._solveForSource.asObservable();

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
    this._stage = 'MODE'
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

  get stage(): string {
    return this._stage;
  }

  set stage(value: string) {
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
}

