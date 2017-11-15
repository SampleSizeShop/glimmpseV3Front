import {Component, Input, OnInit} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';

@Component({
  selector: 'app-parameters-standard-deviation',
  templateUrl: './parameters-standard-deviation.component.html',
  styleUrls: ['./parameters-standard-deviation.component.css']
})
export class ParametersStandardDeviationComponent implements OnInit {
  private _isuFactors: ISUFactors;

  constructor() { }

  ngOnInit() {
    // TODO: thisnk about dependency checks
  }


  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  @Input() set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }
}
