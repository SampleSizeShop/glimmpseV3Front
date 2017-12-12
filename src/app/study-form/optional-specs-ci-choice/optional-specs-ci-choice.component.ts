import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-optional-specs-ci-choice',
  templateUrl: './optional-specs-ci-choice.component.html',
  styleUrls: ['./optional-specs-ci-choice.component.scss']
})
export class OptionalSpecsCiChoiceComponent implements OnInit {
  private _powerCurvesHaveConfidenceIntervals: boolean;

  constructor() {
    this._powerCurvesHaveConfidenceIntervals = false;
  }

  get powerCurvesHaveConfidenceIntervals(): boolean {
    return this._powerCurvesHaveConfidenceIntervals;
  }

  set powerCurvesHaveConfidenceIntervals(value: boolean) {
    this._powerCurvesHaveConfidenceIntervals = value;
  }

  togglePowerCurves() {
    this.powerCurvesHaveConfidenceIntervals = !this.powerCurvesHaveConfidenceIntervals;
  }

  ngOnInit() {
  }

}
