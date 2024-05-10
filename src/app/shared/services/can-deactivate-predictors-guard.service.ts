import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {BetweenIsuPredictorsComponent} from '../../study-form/between-isu-predictors/between-isu-predictors.component';
import {Observable} from 'rxjs';

@Injectable()
export class CanDeactivatePredictorsGuardService  {
  constructor() {}

  canDeactivate(component: BetweenIsuPredictorsComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return component.canDeactivate();
  }
}
