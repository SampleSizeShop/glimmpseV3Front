import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ContrastMatrix} from '../../shared/ContrastMatrix';

@Injectable()
export class ContrastMatrixService {
  // Correlation matrix observable stream
  private _contrastMatrixSource = new BehaviorSubject<ContrastMatrix>(new ContrastMatrix());
  private _contrastMatrix$ = this.contrastMatrixSource.asObservable();

  private _sizeSource = new BehaviorSubject<number>(-1);
  private _size$ = this.sizeSource.asObservable();

  private _validSource = new BehaviorSubject<boolean>(true);
  private _valid$ = this.validSource.asObservable();

  updateCorrelationMatrix(contrastMatrix: ContrastMatrix) {
    this.contrastMatrixSource.next(contrastMatrix);
  }

  updateSize(size: number) {
    this.sizeSource.next(size);
  }

  updateValid(valid: boolean) {
    this.validSource.next(valid);
  }

  get contrastMatrixSource(): BehaviorSubject<ContrastMatrix> {
    return this._contrastMatrixSource;
  }

  get contrastMatrix$(): Observable<ContrastMatrix> {
    return this._contrastMatrix$;
  }

  get sizeSource(): Subject<number> {
    return this._sizeSource;
  }

  get size$(): Observable<number> {
    return this._size$;
  }

  get validSource(): BehaviorSubject<boolean> {
    return this._validSource;
  }

  get valid$(): Observable<boolean> {
    return this._valid$;
  }
}
