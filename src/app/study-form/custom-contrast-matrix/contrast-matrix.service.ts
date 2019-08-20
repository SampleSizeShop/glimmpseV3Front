import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ISUFactor} from '../../shared/model/ISUFactor';
import {PartialMatrix} from '../../shared/model/PartialMatrix';

@Injectable()
export class ContrastMatrixService {
  // Correlation matrix observable stream
  private _contrast_matrix_source = new BehaviorSubject<PartialMatrix>(new PartialMatrix());
  private _contrast_matrix$ = this.contrast_matrix_source.asObservable();

  private _rows_source = new BehaviorSubject<number>(-1);
  private _rows$ = this.rows_source.asObservable();

  private _cols_source = new BehaviorSubject<number>(-1);
  private _cols$ = this.cols_source.asObservable();

  private _factor_source = new BehaviorSubject<ISUFactor>(null);
  private _factor$ = this._factor_source.asObservable();

  private _valid_source = new BehaviorSubject<boolean>(true);
  private _valid$ = this.valid_source.asObservable();

  update_contrast_matrix(contrastMatrix: PartialMatrix) {
    this.contrast_matrix_source.next(contrastMatrix);
  }

  update_rows(rows: number) {
    this.rows_source.next(rows);
  }

  update_cols(cols: number) {
    this.cols_source.next(cols);
  }

  update_factor(factor: ISUFactor) {
    this.factor_source.next(factor);
  }

  update_valid(valid: boolean) {
    this.valid_source.next(valid);
  }

  get contrast_matrix_source(): BehaviorSubject<PartialMatrix> {
    return this._contrast_matrix_source;
  }

  get contrast_matrix$(): Observable<PartialMatrix> {
    return this._contrast_matrix$;
  }

  get rows_source(): Subject<number> {
    return this._rows_source;
  }

  get rows$(): Observable<number> {
    return this._rows$;
  }

  get cols_source(): BehaviorSubject<number> {
    return this._cols_source;
  }

  get cols$(): Observable<number> {
    return this._cols$;
  }

  get factor_source(): BehaviorSubject<ISUFactor> {
    return this._factor_source;
  }

  get factor$(): Observable<ISUFactor> {
    return this._factor$;
  }

  get valid_source(): BehaviorSubject<boolean> {
    return this._valid_source;
  }

  get valid$(): Observable<boolean> {
    return this._valid$;
  }
}
