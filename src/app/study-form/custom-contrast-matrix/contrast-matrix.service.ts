import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ContrastMatrix} from '../../shared/ContrastMatrix';

@Injectable()
export class ContrastMatrixService {
  // Correlation matrix observable stream
  private _contrast_matrix_source = new BehaviorSubject<ContrastMatrix>(new ContrastMatrix());
  private _contrast_matrix$ = this.contrast_matrix_source.asObservable();

  private _size_source = new BehaviorSubject<number>(-1);
  private _size$ = this.size_source.asObservable();

  private _valid_source = new BehaviorSubject<boolean>(true);
  private _valid$ = this.valid_source.asObservable();

  update_contrast_matrix(contrastMatrix: ContrastMatrix) {
    this.contrast_matrix_source.next(contrastMatrix);
  }

  update_size(size: number) {
    this.size_source.next(size);
  }

  update_valid(valid: boolean) {
    this.valid_source.next(valid);
  }

  get contrast_matrix_source(): BehaviorSubject<ContrastMatrix> {
    return this._contrast_matrix_source;
  }

  get contrast_matrix$(): Observable<ContrastMatrix> {
    return this._contrast_matrix$;
  }

  get size_source(): Subject<number> {
    return this._size_source;
  }

  get size$(): Observable<number> {
    return this._size$;
  }

  get valid_source(): BehaviorSubject<boolean> {
    return this._valid_source;
  }

  get valid$(): Observable<boolean> {
    return this._valid$;
  }
}
