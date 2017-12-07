import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {constants} from '../shared/constants';
import {StudyService} from './study.service';

@Injectable()
export class StudyFormGuard implements CanActivate {

  constructor(private router: Router, private study_service: StudyService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard#canActivate called');
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if ( route.url.toString().indexOf( constants.STAGES[20] ) < 0 ) {
      console.log('Child called');
      this.study_service.stage = this.study_service.stage + 1;
      this.navigate(this.study_service.stage);
    }
    return this.canActivate(route, state);
  }

  private navigate(stage: number) {
    this.router.navigate(['design', constants.STAGES[stage]]);
  }
}
