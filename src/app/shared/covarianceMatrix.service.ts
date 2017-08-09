import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CovarianceMatrixService {
  // Covariance matrix observable stream
  private _covarianceMatrixSource = new BehaviorSubject<string>('DEFAULT_VALUE');
  private _covarianceMatrix$ = this.covarianceMatrixSource.asObservable();

  updateCovarianceMatrix(uMatrix: string) {
    this.covarianceMatrixSource.next(uMatrix);
  }

  get covarianceMatrixSource(): BehaviorSubject<string> {
    return this._covarianceMatrixSource;
  }

  get covarianceMatrix$(): Observable<string> {
    return this._covarianceMatrix$;
  }

}
