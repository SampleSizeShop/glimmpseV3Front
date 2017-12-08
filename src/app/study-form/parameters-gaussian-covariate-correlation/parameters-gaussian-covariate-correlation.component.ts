import {Component, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {isNullOrUndefined} from 'util';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../study.service';
import {CorrelationMatrixService} from '../correlation-matrix/correlationMatrix.service';

@Component({
  selector: 'app-parameters-gaussian-covariate-correlation',
  templateUrl: './parameters-gaussian-covariate-correlation.component.html',
  styleUrls: ['./parameters-gaussian-covariate-correlation.component.scss'],
  providers: [CorrelationMatrixService]
})
export class ParametersGaussianCovariateCorrelationComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  size: number;
  title = 'outcome vs gaussian covariate';
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
