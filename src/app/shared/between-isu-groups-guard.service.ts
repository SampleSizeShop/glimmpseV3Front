import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StudyService} from '../study-form/study.service';
import {Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';
import {Predictor} from './Predictor';

@Injectable()
export class BetweenIsuGroupsGuard implements CanActivate {
  private predictors: Array<Predictor>;
  private predictorSubscription: Subscription;

  constructor(private router: Router,
              private study_service: StudyService,
              private log: NGXLogger) {
    this.predictorSubscription = this.study_service.betweenIsuPredictors$.subscribe(
      predictors => {
        this.predictors = predictors;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('OutcomeCorrelation#canActivate called');

    if (
      !isNullOrUndefined(this.predictors)
      && this.predictors.length > 1
    ) {
      return true;
    } else {
      return false;
    }
  }
}
