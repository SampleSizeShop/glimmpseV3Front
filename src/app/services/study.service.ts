import {Injectable, ViewChild} from '@angular/core';
import {StudyDesign} from '../shared/study-design';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {UserModeComponent} from '../user-mode/user-mode.component';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class StudyService {
  private study: StudyDesign;
  stage: string;
  next: string;

  // Observable boolean source
  private modeSelectedSource = new Subject<boolean>();
  // Observable boolean stream
  modeSelected$ = this.modeSelectedSource.asObservable();
  // Service message comand
  selectMode(guided: boolean) {
    this.modeSelectedSource.next(guided);
  }

  constructor(private  http: Http) {
    this.study = new StudyDesign();
    this.stage = 'MODE'
  }

  getStudyDesign(): StudyDesign {
    return this.study;
  }

  setStudyDesign(study: StudyDesign): void {
    this.study = study;
  }

  getStage(): string {
    return this.stage
  }

  setStage(stage: string): void {
    this.stage = stage;
  }

  getNext(): string {
    return this.next
  }

  setNext(next: string): void {
    this.next = next;
  }

  isGuided(): boolean {
    return this.study.guided;
  }

  setGuided(mode: boolean): void {
    this.study.guided = mode;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

