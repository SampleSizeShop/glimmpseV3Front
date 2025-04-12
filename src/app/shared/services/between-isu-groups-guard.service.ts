import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {StudyService} from './study.service';
import {Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';
import {Predictor} from '../model/Predictor';

@Injectable()
export class BetweenIsuGroupsGuard  {
  private predictors: Array<Predictor>;
  private predictorSubscription: Subscription;

  constructor(private router: Router,
              private study_service: StudyService,
              private log: NGXLogger) {
    this.predictorSubscription = this.study_service.isuFactors$.subscribe(
      isuFactors => {
        this.predictors = isuFactors.predictorsInHypothesis;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('OutcomeCorrelation#canActivate called');

    if (
      !isNullOrUndefined(this.predictors)
      && this.predictors.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
