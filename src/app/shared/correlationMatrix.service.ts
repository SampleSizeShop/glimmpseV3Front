import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CorrelationMatrixService {
  // Correlation matrix observable stream
  private _correlationMatrixSource = new BehaviorSubject<string>('DEFAULT_VALUE');
  private _correlationMatrix$ = this.correlationMatrixSource.asObservable();

  updateCorrelationMatrix(uMatrix: string) {
    this.correlationMatrixSource.next(uMatrix);
  }

  get correlationMatrixSource(): BehaviorSubject<string> {
    return this._correlationMatrixSource;
  }

  get correlationMatrix$(): Observable<string> {
    return this._correlationMatrix$;
  }

}
