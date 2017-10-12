import { Component, OnInit } from '@angular/core';
import {constants} from 'app/shared/constants';

@Component({
  selector: 'app-hypothesis-between',
  templateUrl: './hypothesis-between.component.html',
  styleUrls: ['./hypothesis-between.component.css']
})
export class HypothesisBetweenComponent implements OnInit {
  private _showAdvancedOptions: boolean;
  private _betweenHypothesisNature: string;
  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_NATURE;

  constructor() {
    this.showAdvancedOptions = false;
  }

  ngOnInit() {
    this.betweenHypothesisNature = constants.HYPOTHESIS_NATURE.GLOBAL_TRENDS;
  }

  isSelected(hypothesis: string): boolean {
    return this.betweenHypothesisNature === hypothesis;
  }

  selectHypothesisNature(type: string) {
    this.betweenHypothesisNature = type;
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

  get betweenHypothesisNature(): string {
    return this._betweenHypothesisNature;
  }

  set betweenHypothesisNature(value: string) {
    this._betweenHypothesisNature = value;
  }

  get HYPOTHESIS_NATURE() {
    return this._HYPOTHESIS_NATURE;
  }

  set HYPOTHESIS_NATURE(value) {
    this._HYPOTHESIS_NATURE = value;
  }
}
