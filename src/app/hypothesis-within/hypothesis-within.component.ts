import { Component, OnInit } from '@angular/core';
import {constants} from '../shared/constants';

@Component({
  selector: 'app-hypothesis-within',
  templateUrl: './hypothesis-within.component.html',
  styleUrls: ['./hypothesis-within.component.css']
})
export class HypothesisWithinComponent implements OnInit {
  private _showAdvancedOptions: boolean;
  private _withinHypothesisNature: string;
  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_NATURE;

  constructor() {
    this.showAdvancedOptions = false;
  }

  ngOnInit() {
    this.withinHypothesisNature = constants.HYPOTHESIS_NATURE.GLOBAL_TRENDS;
  }

  isSelected(hypothesis: string): boolean {
    return this.withinHypothesisNature === hypothesis;
  }

  selectHypothesisNature(type: string) {
    this.withinHypothesisNature = type;
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

  get withinHypothesisNature(): string {
    return this._withinHypothesisNature;
  }

  set withinHypothesisNature(value: string) {
    this._withinHypothesisNature = value;
  }

  get HYPOTHESIS_NATURE(): { GLOBAL_TRENDS; ALL_PAIRWISE; SUCCESSIVE_PAIRS; IDENTITY; POLYNOMIAL; USER_DEFINED } | any {
    return this._HYPOTHESIS_NATURE;
  }

  set HYPOTHESIS_NATURE(value: { GLOBAL_TRENDS; ALL_PAIRWISE; SUCCESSIVE_PAIRS; IDENTITY; POLYNOMIAL; USER_DEFINED } | any) {
    this._HYPOTHESIS_NATURE = value;
  }
}
