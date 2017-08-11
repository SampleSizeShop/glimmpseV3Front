import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RepeatedMeasure} from './RepeatedMeasure';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RepeatedMeasureService {
  private _repeatedMeasureSource = new Subject<RepeatedMeasure>();
  private _repeatedMeasure$ = this.repeatedMeasureSource.asObservable();

  updateRepeatedMeasure(measure: RepeatedMeasure) {
    this.repeatedMeasureSource.next(measure);
  }

  get repeatedMeasureSource(): Subject<RepeatedMeasure> {
    return this._repeatedMeasureSource;
  }

  get repeatedMeasure$(): Observable<RepeatedMeasure> {
    return this._repeatedMeasure$;
  }
}
