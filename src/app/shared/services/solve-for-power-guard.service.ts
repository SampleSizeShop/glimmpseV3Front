import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {StudyService} from './study.service';
import {Subscription} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../model/constants';

/**
 * SolveForPower guard allows access to a route if and only if the currently loaded StudyDesign is solving for power.
 */
@Injectable()
export class SolveForPowerGuard  {
  private solveForPower: boolean;
  private solveForPowerSubscription: Subscription;

  constructor(private router: Router, private study_service: StudyService, private log: NGXLogger) {
    this.solveForPowerSubscription = this.study_service.solveForSelected$.subscribe(solveForPower => {
        this.solveForPower = solveForPower === constants.SOLVE_FOR.POWER ? true : false;
      }
    );
  }

  /**
   * @param {ActivatedRouteSnapshot} route The route to guard
   * @param {RouterStateSnapshot} state RouterStateSnapshot allows method to inspect properties of the router at the time it was called.
   * @returns {boolean} grant or deny access
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('SolveForPower#canActivate called');
    return this.solveForPower;
  }
}
