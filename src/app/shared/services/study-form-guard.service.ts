import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {constants} from '../model/constants';
import {StudyService} from './study.service';
import {NGXLogger} from 'ngx-logger';
import {AuthService} from './auth.service';
import {tap} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs/internal/observable/of";

@Injectable()
export class StudyFormGuard  {

  constructor(private router: Router,
              private authService: AuthService,
              private study_service: StudyService,
              private log: NGXLogger
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('StudyFormGuard#canActivate called');
    return of(true);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  private navigate(stage: number) {
    this.log.debug('navigating to ' + stage + ' from StudyFormGuard');
    this.router.navigate(['design', constants.STAGES[stage]]);
  }
}
