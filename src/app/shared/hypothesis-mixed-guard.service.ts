import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StudyService} from '../study-form/study.service';
import {Subscription} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {ISUFactors} from './ISUFactors';

@Injectable()
export class HypothesisMixedGuard implements CanActivate {
  private isuFactors: ISUFactors;
  private isuFactorsSubscription: Subscription;
  private defineMarginalHypothesisSubscription: Subscription;
  private defineMarginalHypothesis: boolean;

  constructor(private router: Router,
              private study_service: StudyService,
              private log: NGXLogger) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe(
      isuFactors => {
        this.isuFactors = isuFactors;
      }
    );
    this.defineMarginalHypothesisSubscription = this.study_service.defineMarginalHypothesis$.subscribe( marginalHypothesis => {
      this.defineMarginalHypothesis = marginalHypothesis;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('OutcomeCorrelation#canActivate called');
    return (!this.defineMarginalHypothesis && this.isuFactors.isHypothesisMixed);
  }
}
