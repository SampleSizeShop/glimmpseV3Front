import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-optional-specs-ci-assumptions',
  templateUrl: './optional-specs-ci-assumptions.component.html',
  styleUrls: ['./optional-specs-ci-assumptions.component.scss']
})
export class OptionalSpecsCiAssumptionsComponent implements OnInit {
  private _betaFixed: boolean

  constructor() { }

  ngOnInit() {
    this.betaFixed = true;
  }

  toggleBetaFixed() {
    this.betaFixed = !this.betaFixed;
  }

  get betaFixed(): boolean {
    return this._betaFixed;
  }

  set betaFixed(value: boolean) {
    this._betaFixed = value;
  }
}
