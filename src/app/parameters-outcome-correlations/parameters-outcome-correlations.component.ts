import {Component, Input, OnInit} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';
import {CorrelationMatrixService} from '../shared/correlationMatrix.service';
import {isNull, isNullOrUndefined} from 'util';
import {Subscription} from "rxjs/Subscription";
import {StudyService} from "../shared/study.service";

@Component({
  selector: 'app-parameters-outcome-correlations',
  templateUrl: './parameters-outcome-correlations.component.html',
  styleUrls: ['./parameters-outcome-correlations.component.scss'],
  providers: [CorrelationMatrixService]
})
export class ParametersOutcomeCorrelationsComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  size: number;
  title = 'outcome';
  names = [];

  constructor(private study_service: StudyService) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.setSize();
    this.setNames();
  }

  setNames() {
    if (!isNullOrUndefined(this.isuFactors.outcomes
      && this.isuFactors.outcomes.length > 0)) {
      this.isuFactors.outcomes.forEach( outcome => {
        this.names.push(outcome.name)
      })
    } else {
      this.names = ['']
    }
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

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }
}
