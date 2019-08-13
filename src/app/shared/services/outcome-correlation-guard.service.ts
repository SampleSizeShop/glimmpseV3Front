import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StudyService} from '../../study-form/study.service';
import {Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';
import {Outcome} from '../model/Outcome';
import {CorrelationMatrixService} from '../../study-form/correlation-matrix/correlationMatrix.service';
import {BsDropdownModule} from 'ngx-bootstrap';
import {MathJaxService} from '../../mathjax/mathjax.service';

@Injectable()
export class OutcomeCorrelationsGuard implements CanActivate {
  private outcomes: Outcome[];
  private outcomeSubscription: Subscription;

  constructor(private router: Router,
              private study_service: StudyService,
              private log: NGXLogger) {
    this.outcomeSubscription = this.study_service.withinIsuOutcomes$.subscribe(
      outcomes => {
        this.outcomes = outcomes;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('OutcomeCorrelation#canActivate called');

    if (
      !isNullOrUndefined(this.outcomes)
      && this.outcomes.length > 1
    ) {
      return true;
    } else {
      return false;
    }
  }
}
