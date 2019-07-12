import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StudyService} from '../study-form/study.service';
import {Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';
import {ISUFactors} from './ISUFactors';

@Injectable()
export class HypothesisWithinGuard implements CanActivate {
  private isuFactors: ISUFactors;
  private isuFactorsSubscription: Subscription;

  constructor(private router: Router,
              private study_service: StudyService,
              private log: NGXLogger) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe(
      isuFactors => {
        this.isuFactors = isuFactors;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('OutcomeCorrelation#canActivate called');

    if (
      (isNullOrUndefined(this.isuFactors.predictorsInHypothesis)
        || this.isuFactors.predictorsInHypothesis.length === 0)
      && (!isNullOrUndefined(this.isuFactors.repeatedMeasuresInHypothesis)
      && this.isuFactors.repeatedMeasuresInHypothesis.length > 0)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
