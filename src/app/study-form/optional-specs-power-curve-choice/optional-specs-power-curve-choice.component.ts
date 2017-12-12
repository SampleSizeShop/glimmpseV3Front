import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-optional-specs-power-curve-choice',
  templateUrl: './optional-specs-power-curve-choice.component.html',
  styleUrls: ['./optional-specs-power-curve-choice.component.scss']
})
export class OptionalSpecsPowerCurveChoiceComponent implements OnInit {
  private _createPowerCurve: boolean;

  constructor() {
    this.createPowerCurve = false;
  }

  ngOnInit() {
  }

  toggleCreatePowerCurve() {
    this.createPowerCurve = !this.createPowerCurve;
  }

  get createPowerCurve(): boolean {
    return this._createPowerCurve;
  }

  set createPowerCurve(value: boolean) {
    this._createPowerCurve = value;
  }
}
