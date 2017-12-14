import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {constants} from '../../shared/constants';
import {StudyService} from '../study.service';
import {PowerCurve} from '../../shared/PowerCurve';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-optional-specs-power-curve-choice',
  templateUrl: './optional-specs-power-curve-choice.component.html',
  styleUrls: ['./optional-specs-power-curve-choice.component.scss']
})
export class OptionalSpecsPowerCurveChoiceComponent implements OnInit {
  private _powerCurve: PowerCurve;
  private _powerCurveSubscription: Subscription;

  constructor(private router: Router, private study_service: StudyService) {
    this._powerCurveSubscription = this.study_service.powerCurve$.subscribe(powerCurve => {
      this._powerCurve = powerCurve;
  });
  }

  ngOnInit() {
  }

  createPowerCurve() {
    this.study_service.updatePowerCurve(new PowerCurve());
    this.router.navigate(['design', constants.STAGES[27]]);
  }

  removePowerCurve() {
    this.study_service.updatePowerCurve(null);
  }

  get hasPowerCurve() {
    return !isNullOrUndefined(this._powerCurve);
  }
}
