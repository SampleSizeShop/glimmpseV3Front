import {Component, Input, OnInit} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';
import {isNullOrUndefined} from 'util';
import {CorrelationMatrixService} from '../shared/correlationMatrix.service';

@Component({
  selector: 'app-parameters-repeated-measure-correlations',
  templateUrl: './parameters-repeated-measure-correlations.component.html',
  styleUrls: ['./parameters-repeated-measure-correlations.component.scss'],
  providers: [CorrelationMatrixService]
})
export class ParametersRepeatedMeasureCorrelationsComponent implements OnInit {
  private _isuFactors: ISUFactors;
  size: number;
  title = 'repeated measure';
  names = [];

  constructor() { }

  ngOnInit() {
    this.setSize();
    this.setNames();
  }

  setNames() {
    if (!isNullOrUndefined(this.isuFactors.repeatedMeasuresInHypothesis
        && this.isuFactors.repeatedMeasuresInHypothesis.length > 0)) {
      this.isuFactors.repeatedMeasuresInHypothesis.forEach( measure => {
        this.names.push(measure.name)
      })
    } else {
      this.names = ['']
    }
  }

  setSize() {
    if (!isNullOrUndefined(this.isuFactors.repeatedMeasuresInHypothesis)
      && this.isuFactors.repeatedMeasuresInHypothesis.length > 0) {
      this.size = this.isuFactors.repeatedMeasuresInHypothesis.length;
    } else {
      this.size = 1;
    }
  }


  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  @Input() set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }
}
