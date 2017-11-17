import {Component, Input, OnInit} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';
import {ISUFactor} from '../shared/ISUFactor';
import {Outcome} from "../shared/Outcome";
import {RepeatedMeasure} from "../shared/RepeatedMeasure";
import {ISUFactorCombination} from "../shared/ISUFactorCombination";

@Component({
  selector: 'app-parameters-repeated-measure-outcome-correlations',
  templateUrl: './parameters-repeated-measure-outcome-correlations.component.html',
  styleUrls: ['./parameters-repeated-measure-outcome-correlations.component.scss']
})
export class ParametersRepeatedMeasureOutcomeCorrelationsComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _combinations: Map<ISUFactor, Array<ISUFactor>>;
  private map: Map<string, string[]>;
  constructor() { }

  ngOnInit() {
    this.setMap();
  }

  setMap() {
    this.map = new Map<string, string[]>();
    this.isuFactors.outcomes.forEach(outcome => {
      this.isuFactors.repeatedMeasures.forEach(measure => {
        const vals = new Array<string>(measure.valueNames.length).fill('1');
        this.map.set(outcome.name + ':' + measure.name, vals);
      })
    })
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  @Input() set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get combinations(): Map<ISUFactor, Array<ISUFactor>> {
    return this._combinations;
  }

  set combinations(value: Map<ISUFactor, Array<ISUFactor>>) {
    this._combinations = value;
  }
}
