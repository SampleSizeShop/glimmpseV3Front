import { Component, OnInit } from '@angular/core';
import {constants} from '../shared/constants';

@Component({
  selector: 'app-hypothesis-within',
  templateUrl: './hypothesis-within.component.html',
  styleUrls: ['./hypothesis-within.component.css']
})
export class HypothesisWithinComponent implements OnInit {
  private _showAdvancedOptions: boolean;
  private _withinHypothesisType: string;
  private _HYPOTHESIS_TYPE = constants.HYPOTHESIS_TYPE;

  constructor() {
    this.showAdvancedOptions = false;
  }

  ngOnInit() {
    this.withinHypothesisType = constants.HYPOTHESIS_TYPE.GLOBAL_TRENDS;
  }

  isSelected(hypothesis: string): boolean {
    return this.withinHypothesisType === hypothesis;
  }

  selectHypothesisType(type: string) {
    this.withinHypothesisType = type;
  }

  toggleAdvancedOptions() {
    this.showAdvancedOptions = !this.showAdvancedOptions;
  }

  get showAdvancedOptions(): boolean {
    return this._showAdvancedOptions;
  }

  set showAdvancedOptions(value: boolean) {
    this._showAdvancedOptions = value;
  }

  get withinHypothesisType(): string {
    return this._withinHypothesisType;
  }

  set withinHypothesisType(value: string) {
    this._withinHypothesisType = value;
  }

  get HYPOTHESIS_TYPE(): { GLOBAL_TRENDS; ALL_PAIRWISE; SUCCESSIVE_PAIRS; IDENTITY; POLYNOMIAL; USER_DEFINED } | any {
    return this._HYPOTHESIS_TYPE;
  }

  set HYPOTHESIS_TYPE(value: { GLOBAL_TRENDS; ALL_PAIRWISE; SUCCESSIVE_PAIRS; IDENTITY; POLYNOMIAL; USER_DEFINED } | any) {
    this._HYPOTHESIS_TYPE = value;
  }
}
