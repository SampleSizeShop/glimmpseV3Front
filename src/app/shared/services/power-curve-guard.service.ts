import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {StudyService} from './study.service';
import {Subscription} from 'rxjs';
import {PowerCurve} from '../model/PowerCurve';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class PowerCurveGuard  {
  private powerCurve: PowerCurve;
  private powerCurveSubscription: Subscription;

  constructor(private router: Router, private study_service: StudyService, private log: NGXLogger) {
    this.powerCurveSubscription = this.study_service.powerCurve$.subscribe(powerCurve => {
        this.powerCurve = powerCurve;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('PowerCurveGuard#canActivate called');
    if (!isNullOrUndefined(this.powerCurve)) {
      return true;
    } else {
      return false;
    }
  }
}
