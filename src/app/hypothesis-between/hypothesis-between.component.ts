import { Component, OnInit } from '@angular/core';
import {constants} from 'app/shared/constants';

@Component({
  selector: 'app-hypothesis-between',
  templateUrl: './hypothesis-between.component.html',
  styleUrls: ['./hypothesis-between.component.css']
})
export class HypothesisBetweenComponent implements OnInit {
  private _showAdvancedOptions: boolean;
  private _betweenHypothesisType: string;
  private _HYPOTHESIS_TYPE = constants.HYPOTHESIS_TYPE;

  constructor() {
    this.showAdvancedOptions = false;
  }

  ngOnInit() {
    this.betweenHypothesisType = constants.HYPOTHESIS_TYPE.GLOBAL_TRENDS;
  }

  isSelected(hypothesis: string): boolean {
    return this.betweenHypothesisType === hypothesis;
  }

  selectHypothesisType(type: string) {
    this.betweenHypothesisType = type;
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

  get betweenHypothesisType(): string {
    return this._betweenHypothesisType;
  }

  set betweenHypothesisType(value: string) {
    this._betweenHypothesisType = value;
  }

  get HYPOTHESIS_TYPE() {
    return this._HYPOTHESIS_TYPE;
  }

  set HYPOTHESIS_TYPE(value) {
    this._HYPOTHESIS_TYPE = value;
  }
}
