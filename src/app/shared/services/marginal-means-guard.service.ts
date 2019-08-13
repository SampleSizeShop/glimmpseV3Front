import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {constants} from '../model/constants';
import {StudyService} from './study.service';
import {ISUFactors} from '../model/ISUFactors';
import {Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class MarginalMeansGuard implements CanActivate {
  private isuFactors: ISUFactors;
  private isuFactorsSubscription: Subscription;

  constructor(private router: Router, private study_service: StudyService, private log: NGXLogger) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('MarginalMeans#canActivate called');
    if (
      !isNullOrUndefined(this.isuFactors)
      && !isNullOrUndefined(this.isuFactors.hypothesis)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
