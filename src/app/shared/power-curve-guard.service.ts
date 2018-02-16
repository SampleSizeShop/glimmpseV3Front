import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StudyService} from '../study-form/study.service';
import {Subscription} from 'rxjs/Subscription';
import {PowerCurve} from './PowerCurve';
import {isNullOrUndefined} from 'util';

@Injectable()
export class PowerCurveGuard implements CanActivate {
  private powerCurve: PowerCurve;
  private powerCurveSubscription: Subscription;

  constructor(private router: Router, private study_service: StudyService) {
    this.powerCurveSubscription = this.study_service.powerCurve$.subscribe(powerCurve => {
        this.powerCurve = powerCurve;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('PowerCurveGuard#canActivate called');
    if (!isNullOrUndefined(this.powerCurve)) {
      return true;
    } else {
      return false;
    }
  }
}
