import {Component, Input, OnInit} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';

@Component({
  selector: 'app-parameters-repeated-measure-outcome-correlations',
  templateUrl: './parameters-repeated-measure-outcome-correlations.component.html',
  styleUrls: ['./parameters-repeated-measure-outcome-correlations.component.scss']
})
export class ParametersRepeatedMeasureOutcomeCorrelationsComponent implements OnInit {
  private _isuFactors: ISUFactors;
  constructor() { }

  ngOnInit() {
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  @Input() set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }
}
