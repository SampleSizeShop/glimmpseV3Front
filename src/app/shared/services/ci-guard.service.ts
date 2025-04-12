import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {StudyService} from './study.service';
import {Subscription} from 'rxjs';
import {PowerCurve} from '../model/PowerCurve';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';

/**
 * Confidence interval guard allows access to a route if and only if the currently loaded StudyDesign has a PowerCurve
 * defined with a PowerCurveConfidenceInterval.
 */
@Injectable()
export class ConfidenceIntervalGuard  {
  private powerCurve: PowerCurve;
  private powerCurveSubscription: Subscription;

  /**
   * Default constructor.
   *
   * @param {Router} router
   * @param {StudyService} study_service
   * @param {NGXLogger} log
   */
  constructor(private router: Router, private study_service: StudyService, private log: NGXLogger) {
    this.powerCurveSubscription = this.study_service.powerCurve$.subscribe(powerCurve => {
        this.powerCurve = powerCurve;
      }
    );
  }

  /**
   * Allows access to a route if and only if the currently loaded StudyDesign
   * has a PowerCurve defined with a PowerCurveConfidenceInterval.
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.info('ConfidenceIntervalGuard#canActivate called');
    if (
      !isNullOrUndefined(this.powerCurve) &&
      !(isNullOrUndefined(this.powerCurve.confidenceInterval))
    ) {
      return true;
    } else {
      return false;
    }
  }
}
