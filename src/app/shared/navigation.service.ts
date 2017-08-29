import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NavigationService {
  private _navigationSource = new Subject<string>();
  private _navigation$ = this.navigationSource.asObservable();

  private _childNavigationModeSource = new Subject<boolean>();
  private _childNavigationMode$ = this.childNavigationModeSource.asObservable();

  private _nextEnabledSource = new Subject<boolean>();
  private _nextEnabled$ = this.nextEnabledSource.asObservable();

  private _backEnabledSource = new Subject<boolean>();
  private _backEnabled$ = this.backEnabledSource.asObservable();

  updateNavigation(direction: string) {
    this.navigationSource.next(direction);
  }

  updateNavigationMode(childNavigationMode: boolean) {
    this.childNavigationModeSource.next(childNavigationMode)
  }

  updateNextEnabled(enabled: boolean) {
    this.nextEnabledSource.next(enabled)
  }

  updateBackEnabled(enabled: boolean) {
    this.nextEnabledSource.next(enabled)
  }

  get navigationSource(): Subject<string> {
    return this._navigationSource;
  }

  get navigation$(): Observable<string> {
    return this._navigation$;
  }

  get childNavigationModeSource(): Subject<boolean> {
    return this._childNavigationModeSource;
  }

  get childNavigationMode$(): Observable<boolean> {
    return this._childNavigationMode$;
  }

  get nextEnabledSource(): Subject<boolean> {
    return this._nextEnabledSource;
  }

  get nextEnabled$(): Observable<boolean> {
    return this._nextEnabled$;
  }

  get backEnabledSource(): Subject<boolean> {
    return this._backEnabledSource;
  }

  get backEnabled$(): Observable<boolean> {
    return this._backEnabled$;
  }
}
