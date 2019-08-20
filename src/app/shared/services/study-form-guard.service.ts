import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {constants} from '../model/constants';
import {StudyService} from './study.service';
import {NGXLogger} from "ngx-logger";

@Injectable()
export class StudyFormGuard implements CanActivate {

  constructor(private router: Router, private study_service: StudyService, private log: NGXLogger) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('StudyFormGuard#canActivate called');
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  private navigate(stage: number) {
    this.log.debug('navigating to ' + stage + ' from StudyFormGuard');
    this.router.navigate(['design', constants.STAGES[stage]]);
  }
}
