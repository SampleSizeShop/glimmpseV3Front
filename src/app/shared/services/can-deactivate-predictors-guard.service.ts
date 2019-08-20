import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {BetweenIsuPredictorsComponent} from '../../study-form/between-isu-predictors/between-isu-predictors.component';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CanDeactivatePredictorsGuardService implements CanDeactivate<BetweenIsuPredictorsComponent> {
  constructor() {}

  canDeactivate(component: BetweenIsuPredictorsComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return component.canDeactivate();
  }
}
