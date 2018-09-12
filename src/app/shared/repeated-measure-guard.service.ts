import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StudyService} from '../study-form/study.service';
import {ISUFactors} from './ISUFactors';
import {Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class RepeatedMeasureGuard implements CanActivate {
  private isuFactors: ISUFactors;
  private isuFactorsSubscription: Subscription;

  constructor(private router: Router, private study_service: StudyService, private log: NGXLogger) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('RepMeasureGuard#canActivate called');
    const st = this.study_service.stage;
    this.log.debug(st);
    if (
      !isNullOrUndefined(this.isuFactors)
      && !isNullOrUndefined(this.isuFactors.repeatedMeasures)
      && this.isuFactors.repeatedMeasures.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
