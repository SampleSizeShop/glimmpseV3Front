import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class NavigationService {
  private _navigationSource = new Subject<string>();
  private _navigation$ = this.navigationSource.asObservable();

  private _validSource = new BehaviorSubject<boolean>(true);
  private _valid$ = this.validSource.asObservable();

  private _navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();


  updateNavigation(direction: string) {
    this.navigationSource.next(direction);
  }

  updateValid(valid: boolean) {
    this.validSource.next(valid);
  }

  get navigationSource(): Subject<string> {
    return this._navigationSource;
  }

  get navigation$(): Observable<string> {
    return this._navigation$;
  }

  get validSource(): BehaviorSubject<boolean> {
    return this._validSource;
  }

  set validSource(value: BehaviorSubject<boolean>) {
    this._validSource = value;
  }

  get valid$(): Observable<boolean> {
    return this._valid$;
  }

  set valid$(value: Observable<boolean>) {
    this._valid$ = value;
  }

  get navigateAwaySelection$(): Subject<boolean> {
    return this._navigateAwaySelection$;
  }
}
