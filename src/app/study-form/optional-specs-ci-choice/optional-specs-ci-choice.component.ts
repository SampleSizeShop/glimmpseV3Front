import { Component, OnInit } from '@angular/core';
import {constants} from '../../shared/constants';
import {PowerCurve} from '../../shared/PowerCurve';
import {StudyService} from '../study.service';
import {isNullOrUndefined} from 'util';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {PowerCurveConfidenceInterval} from '../../shared/PowerCurveConfidenceInterval';

@Component({
  selector: 'app-optional-specs-ci-choice',
  templateUrl: './optional-specs-ci-choice.component.html',
  styleUrls: ['./optional-specs-ci-choice.component.scss']
})
export class OptionalSpecsCiChoiceComponent implements OnInit {
  private _powerCurve: PowerCurve;
  private _powerCurveSubscription: Subscription;

  constructor(private router: Router, private study_service: StudyService) {
    this._powerCurveSubscription = this.study_service.powerCurve$.subscribe(powerCurve => {
      this._powerCurve = powerCurve;
    });
  }

  ngOnInit() {
  }

  addConfidenceInterval() {
    this._powerCurve.confidenceInterval = new PowerCurveConfidenceInterval();
    this.study_service.updatePowerCurve(this._powerCurve);
    this.router.navigate(['design', constants.STAGES[30]]);
  }

  editConfidenceInterval() {
    this.router.navigate(['design', constants.STAGES[30]]);
  }

  removeConfidenceInterval() {
    this._powerCurve.confidenceInterval = null;
    this.study_service.updatePowerCurve(this._powerCurve);
  }

  get hasConfidenceInterval() {
    return !isNullOrUndefined(this._powerCurve.confidenceInterval);
  }

  get confidenceInterval(): PowerCurveConfidenceInterval {
    if (this.hasConfidenceInterval) {
      return this._powerCurve.confidenceInterval;
    }
  }
}
