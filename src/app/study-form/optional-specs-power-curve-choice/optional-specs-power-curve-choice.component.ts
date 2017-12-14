import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {constants} from "../../shared/constants";

@Component({
  selector: 'app-optional-specs-power-curve-choice',
  templateUrl: './optional-specs-power-curve-choice.component.html',
  styleUrls: ['./optional-specs-power-curve-choice.component.scss']
})
export class OptionalSpecsPowerCurveChoiceComponent implements OnInit {
  private _hasPowerCurve: boolean;

  constructor(private router: Router) {
    this.hasPowerCurve = false;
  }

  ngOnInit() {
  }

  createPowerCurve() {
    this.hasPowerCurve = true;
    this.router.navigate(['design', constants.STAGES[27]]);
  }

  removePowerCurve() {
    this.hasPowerCurve = false;
  }

  get hasPowerCurve(): boolean {
    return this._hasPowerCurve;
  }

  set hasPowerCurve(value: boolean) {
    this._hasPowerCurve = value;
  }
}
