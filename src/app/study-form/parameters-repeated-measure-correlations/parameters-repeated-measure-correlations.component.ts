import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {Subscription} from 'rxjs/Subscription';

import {ISUFactors} from '../../shared/ISUFactors';
import {CorrelationMatrixService} from '../correlation-matrix/correlationMatrix.service';
import {StudyService} from '../study.service';
import {RepeatedMeasure} from '../../shared/RepeatedMeasure';

@Component({
  selector: 'app-parameters-repeated-measure-correlations',
  templateUrl: './parameters-repeated-measure-correlations.component.html',
  styleUrls: ['./parameters-repeated-measure-correlations.component.scss'],
  providers: [CorrelationMatrixService]
})
export class ParametersRepeatedMeasureCorrelationsComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _repeatedMeasure$: Observable<RepeatedMeasure>;
  size: number;
  title = 'repeated measure';
  names = [];

  constructor(private study_service: StudyService, private route: ActivatedRoute) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.repeatedMeasure$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getRepeatedMeasure(params.get('name'))
    );
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
}
