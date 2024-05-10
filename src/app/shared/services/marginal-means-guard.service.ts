import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {StudyService} from './study.service';
import {ISUFactors} from '../model/ISUFactors';
import {Subscription} from 'rxjs';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class MarginalMeansGuard  {
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
      this.isuFactors !== null && this.isuFactors !== undefined &&
      this.isuFactors.hypothesis  !== null && this.isuFactors.hypothesis !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  }
}
