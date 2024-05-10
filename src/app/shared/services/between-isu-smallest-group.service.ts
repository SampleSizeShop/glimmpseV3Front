import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {StudyService} from './study.service';
import {Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../model/constants';


@Injectable()
export class BetweenIsuSmallestGroupsGuard  {
  private solveFor: string;
  private solveForSubscription: Subscription;

  constructor(private router: Router,
              private study_service: StudyService,
              private log: NGXLogger) {
    this.solveForSubscription = this.study_service.solveForSelected$.subscribe(
      solveFor => {
        this.solveFor = solveFor;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('BetweenIsuSmallestGroups#canActivate called');

    if (
      !isNullOrUndefined(this.solveFor)
      && this.solveFor === constants.SOLVE_FOR_POWER
    ) {
      return true;
    } else {
      return false;
    }
  }
}
