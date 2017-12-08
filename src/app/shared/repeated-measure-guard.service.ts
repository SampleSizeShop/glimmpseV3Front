import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {constants} from './constants';
import {StudyService} from '../study-form/study.service';
import {ISUFactors} from './ISUFactors';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
import {NavigationService} from "./navigation.service";

@Injectable()
export class RepeatedMeasureGuard implements CanActivate {
  private isuFactors: ISUFactors;
  private isuFactorsSubscription: Subscription;

  constructor(private router: Router, private study_service: StudyService) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('RepMeasureGuard#canActivate called');
    const st = this.study_service.stage;
    console.log(st);
    if (
      !isNullOrUndefined(this.isuFactors)
      && !isNullOrUndefined(this.isuFactors.repeatedMeasures)
      && this.isuFactors.repeatedMeasures.length > 0
    ) {
      return true;
    } else {
      /** const stage = this.study_service.getStageFromName(route.url.toString());
      const next = constants.STAGES[stage + 1];
      if (!isNullOrUndefined(next)) {
        this.navigate(stage + 1);
      }**/
      return false;
    }
  }

  private navigate(stage: number) {
    this.router.navigate(['design', constants.STAGES[stage]]);
  }
}
