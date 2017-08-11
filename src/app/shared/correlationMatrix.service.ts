import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {CorrelationMatrix} from './CorrelationMatrix';

@Injectable()
export class CorrelationMatrixService {
  // Correlation matrix observable stream
  private _correlationMatrixSource = new BehaviorSubject<CorrelationMatrix>(new CorrelationMatrix());
  private _correlationMatrix$ = this.correlationMatrixSource.asObservable();

  private _sizeSource = new BehaviorSubject<number>(-1);
  private _size$ = this.sizeSource.asObservable();

  updateCorrelationMatrix(uMatrix: CorrelationMatrix) {
    this.correlationMatrixSource.next(uMatrix);
  }

  updateSize(size: number) {
    this.sizeSource.next(size);
  }

  get correlationMatrixSource(): BehaviorSubject<CorrelationMatrix> {
    return this._correlationMatrixSource;
  }

  get correlationMatrix$(): Observable<CorrelationMatrix> {
    return this._correlationMatrix$;
  }

  get sizeSource(): Subject<number> {
    return this._sizeSource;
  }

  get size$(): Observable<number> {
    return this._size$;
  }
}
