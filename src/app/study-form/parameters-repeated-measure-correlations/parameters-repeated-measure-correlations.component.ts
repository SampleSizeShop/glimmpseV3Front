import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {Subscription} from 'rxjs/Subscription';

import {ISUFactors} from '../../shared/ISUFactors';
import {CorrelationMatrixService} from '../correlation-matrix/correlationMatrix.service';
import {StudyService} from '../study.service';
import {RepeatedMeasure} from '../../shared/RepeatedMeasure';
import {PartialMatrix} from "../../shared/PartialMatrix";
import {isNullOrUndefined} from "util";
import {CorrelationMatrix} from "../../shared/CorrelationMatrix";

@Component({
  selector: 'app-parameters-repeated-measure-correlations',
  templateUrl: './parameters-repeated-measure-correlations.component.html',
  styleUrls: ['./parameters-repeated-measure-correlations.component.scss'],
  providers: [CorrelationMatrixService]
})
export class ParametersRepeatedMeasureCorrelationsComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _correlationMatrixSubscription: Subscription;
  private _repeatedMeasure$: Observable<RepeatedMeasure>;
  private _correlationMatrix: CorrelationMatrix;
  private _measure: RepeatedMeasure;

  constructor(private study_service: StudyService, private route: ActivatedRoute, private matrix_service: CorrelationMatrixService) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.repeatedMeasure$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getRepeatedMeasure(params.get('measure'))
    );
  }

  ngOnInit() {
    this.repeatedMeasure$.subscribe( measure => {
      this._measure = measure;
      this.correlationMatrix = measure.correlationMatrix;
      if (!isNullOrUndefined(this.correlationMatrix
          && !isNullOrUndefined(this.correlationMatrix.values))) {
        this.matrix_service.updateCorrelationMatrix(this._measure.correlationMatrix);
      }
    } );
    this.correlationMatrixSubscription = this.matrix_service.correlationMatrix$.subscribe(matrix => {
      if (!isNullOrUndefined(matrix)) {
        this.correlationMatrix = matrix;
      }
    });
  }

  ngDoCheck() {
    this.isuFactors.repeatedMeasures.forEach(measure => {
      if (measure.name === this._measure.name) {
        measure.correlationMatrix = this.correlationMatrix;
      }
    });
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  ngOnDestroy() {
    this._isuFactorsSubscription.unsubscribe();
    this.correlationMatrixSubscription.unsubscribe();
  }

  getRepeatedMeasures() { return Observable.of(this.isuFactors.repeatedMeasures); }

  private getRepeatedMeasure(name: string | any) {
    return this.getRepeatedMeasures().map(
      measures => measures.find(
        measure => measure.name === name
      ));
  }

  set repeatedMeasure$(value: Observable<RepeatedMeasure>) {
    this._repeatedMeasure$ = value;
  }

  get repeatedMeasure$(): Observable<RepeatedMeasure> {
    return this._repeatedMeasure$;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get correlationMatrix(): CorrelationMatrix {
    return this._correlationMatrix;
  }

  set correlationMatrix(value: CorrelationMatrix) {
    this._correlationMatrix = value;
  }

  get correlationMatrixSubscription(): Subscription {
    return this._correlationMatrixSubscription;
  }

  set correlationMatrixSubscription(value: Subscription) {
    this._correlationMatrixSubscription = value;
  }
}
