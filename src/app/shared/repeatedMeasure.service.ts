import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {RepeatedMeasure} from './RepeatedMeasure';

@Injectable()
export class RepeatedMeasureService {
  // Repeated measure observable stream
  private _repeatedMeasureSource = new BehaviorSubject<RepeatedMeasure>(new RepeatedMeasure());
  private _repeatedMeasure$ = this.repeatedMeasureSource.asObservable();

  updateRepeatedMeasure(measure: RepeatedMeasure) {
    this.repeatedMeasureSource.next(measure);
  }

  get repeatedMeasureSource(): BehaviorSubject<RepeatedMeasure> {
    return this._repeatedMeasureSource;
  }

  get repeatedMeasure$(): Observable<RepeatedMeasure> {
    return this._repeatedMeasure$;
  }

}
