import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {StudyService} from './study.service';
import {ISUFactors} from '../model/ISUFactors';
import {Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';

/**
 * ClusterGuard guard allows access to a route if and only if the currently loaded StudyDesign has clustering defined.
 */
@Injectable()
export class ClusterGuard  {
  private isuFactors: ISUFactors;
  private isuFactorsSubscription: Subscription;

  /**
   * Default constructor.
   *
   * @param {Router} router
   * @param {StudyService} study_service
   * @param {NGXLogger} log
   */
  constructor(private router: Router, private study_service: StudyService, private log: NGXLogger) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  /**
   * Allows access to a route if and only if the currently loaded StudyDesign has clustering defined.
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('ClusterGuard#canActivate called');
    if (
      !isNullOrUndefined(this.isuFactors)
      && !isNullOrUndefined(this.isuFactors.cluster)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
