import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DifferentMeasures} from './DifferentMeasures';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DifferentMeasuresService {
  private _differentMeasuresSource = new Subject<DifferentMeasures>();
  private _differentMeasures$ = this.differentMeasuresSource.asObservable();

  updateDifferentMeasures(measure: DifferentMeasures) {
    this.differentMeasuresSource.next(measure)
  }

  get differentMeasuresSource(): Subject<DifferentMeasures> {
    return this._differentMeasuresSource;
  }

  set differentMeasuresSource(value: Subject<DifferentMeasures>) {
    this._differentMeasuresSource = value;
  }

  get differentMeasures$(): Observable<DifferentMeasures> {
    return this._differentMeasures$;
  }

  set differentMeasures$(value: Observable<DifferentMeasures>) {
    this._differentMeasures$ = value;
  }
}
