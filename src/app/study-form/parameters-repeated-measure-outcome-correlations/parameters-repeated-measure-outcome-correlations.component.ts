import {Component, Input, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {ISUFactor} from '../../shared/ISUFactor';
import {isNullOrUndefined} from 'util';
import {Subscription} from "rxjs/Subscription";
import {StudyService} from "../study.service";

@Component({
  selector: 'app-parameters-repeated-measure-outcome-correlations',
  templateUrl: './parameters-repeated-measure-outcome-correlations.component.html',
  styleUrls: ['./parameters-repeated-measure-outcome-correlations.component.scss']
})
export class ParametersRepeatedMeasureOutcomeCorrelationsComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _combinations: Map<ISUFactor, Array<ISUFactor>>;
  private map: Map<string, string[]>;
  selected: string;
  constructor(private study_service: StudyService) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.setMap();
  }

  setMap() {
    this.map = new Map<string, string[]>();
    let last = ''
    this.isuFactors.outcomes.forEach(outcome => {
      this.isuFactors.repeatedMeasures.forEach(measure => {
        const vals = new Array<string>(measure.valueNames.length).fill('1');
        this.map.set(outcome.name + ':' + measure.name, vals);
        last = outcome.name + ':' + measure.name;
      })
    })
    this.selected = last;
  }

  get outcomes() {
    if(!isNullOrUndefined(this.map.keys()) && this.map.size > 0) {
      const outcomes = [];
      for (let obj in this.map.keys()) {
        const spl = obj.split(':');
        if (outcomes.indexOf(spl[0]) === -1) {
          outcomes.push(spl[0]);
        }
      }
      return outcomes;
    } else {
      console.log('oops')
      return [];
    }
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

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }
}
