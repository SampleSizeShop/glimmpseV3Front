import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {CorrelationMatrixService} from '../correlation-matrix/correlationMatrix.service';
import {isNull, isNullOrUndefined} from 'util';
import {Subscription} from 'rxjs';
import {StudyService} from '../study.service';
import {FormBuilder} from '@angular/forms';
import {CorrelationMatrix} from '../../shared/CorrelationMatrix';

@Component({
  selector: 'app-parameters-outcome-correlations',
  templateUrl: './parameters-outcome-correlations.component.html',
  styleUrls: ['./parameters-outcome-correlations.component.scss'],
  providers: [CorrelationMatrixService]
})
export class ParametersOutcomeCorrelationsComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _correlationMatrixSubscription: Subscription;
  private _correlationMatrix: CorrelationMatrix;
  size: number;
  title = 'outcome';
  names = [];

  constructor(private study_service: StudyService, private _fb: FormBuilder, private matrix_service: CorrelationMatrixService) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.correlationMatrixSubscription = this.matrix_service.correlationMatrix$.subscribe( matrix => {
      this.correlationMatrix = matrix;
    });
  }

  get values() {
    if (
      !isNullOrUndefined(this.correlationMatrix) &&
      !isNullOrUndefined(this.correlationMatrix.values)) {
      return this.correlationMatrix.values;
    } else {
      return 'no values'
    };
  }

  ngOnInit() {
    if (!isNullOrUndefined(this.isuFactors.outcomeCorrelationMatrix)) {
      this.matrix_service.updateCorrelationMatrix(this.isuFactors.outcomeCorrelationMatrix);
    }
    this.setSize();
    this.setNames();
  }

  ngDoCheck() {
    if (!isNullOrUndefined(this.correlationMatrix)) {
      this.isuFactors.outcomeCorrelationMatrix = this.correlationMatrix;
    }
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  ngOnDestroy() {
    this._isuFactorsSubscription.unsubscribe();
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

  get fb(): FormBuilder {
    return this._fb;
  }

  get correlationMatrixSubscription(): Subscription {
    return this._correlationMatrixSubscription;
  }

  set correlationMatrixSubscription(value: Subscription) {
    this._correlationMatrixSubscription = value;
  }

  get correlationMatrix(): CorrelationMatrix {
    return this._correlationMatrix;
  }

  set correlationMatrix(value: CorrelationMatrix) {
    this._correlationMatrix = value;
  }
}
