import {Component, Input, OnInit} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';
import {CorrelationMatrixService} from '../shared/correlationMatrix.service';
import {isNull, isNullOrUndefined} from 'util';

@Component({
  selector: 'app-parameters-outcome-correlations',
  templateUrl: './parameters-outcome-correlations.component.html',
  styleUrls: ['./parameters-outcome-correlations.component.scss'],
  providers: [CorrelationMatrixService]
})
export class ParametersOutcomeCorrelationsComponent implements OnInit {
  private _isuFactors: ISUFactors;
  size: number;
  title = 'outcome';

  constructor() { }

  ngOnInit() {
    this.setSize();
  }

  setSize() {
    if (!isNullOrUndefined(this.isuFactors.outcomes)
      && this.isuFactors.outcomes.length > 0) {
      this.size = this.isuFactors.outcomes.length;
    } else {
      this.size = 1;
    }
  }

  get isuFactors() {
    return this._isuFactors;
  }

  @Input() set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }
}
