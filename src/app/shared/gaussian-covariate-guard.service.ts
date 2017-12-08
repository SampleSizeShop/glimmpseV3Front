import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {constants} from './constants';
import {StudyService} from '../study-form/study.service';
import {ISUFactors} from './ISUFactors';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
import {NavigationService} from "./navigation.service";
import {GaussianCovariate} from "./GaussianCovariate";

@Injectable()
export class GaussianCovariateGuard implements CanActivate {
  private gaussianCovariate: GaussianCovariate;
  private gaussianCovariatesSubscription: Subscription;

  constructor(private router: Router, private study_service: StudyService) {
    this.gaussianCovariatesSubscription = this.study_service.gaussianCovariate$.subscribe(gaussianCovariate => {
        this.gaussianCovariate = gaussianCovariate;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('GaussianCovariateGuard#canActivate called');
    const stage = this.study_service.stage;
    console.log(stage);
    if (
      !isNullOrUndefined(this.gaussianCovariate)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
