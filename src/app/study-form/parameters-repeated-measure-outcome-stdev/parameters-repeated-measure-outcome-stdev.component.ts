import {Component, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../study.service';
import {Outcome} from '../../shared/Outcome';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RepeatedMeasure} from '../../shared/RepeatedMeasure';

@Component({
  selector: 'app-parameters-repeated-measure-outcome-stdev',
  templateUrl: './parameters-repeated-measure-outcome-stdev.component.html',
  styleUrls: ['./parameters-repeated-measure-outcome-stdev.component.scss']
})
export class ParametersRepeatedMeasureOutcomeStDevComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _outcome$: Observable<Outcome>;
  private _measure$: Observable<RepeatedMeasure>;
  constructor(private study_service: StudyService, private route: ActivatedRoute) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.outcome$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getOutcome(params.get('outcome'))
    );
    this.measure$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getMeasure(params.get('measure'))
    );
  }

  getOutcomes() { return Observable.of(this.isuFactors.outcomes); }

  private getOutcome(name: string | any) {
    return this.getOutcomes().map(
      outcomes => outcomes.find(
        outcome => outcome.name === name
      ));
  }

  getMeasures() { return Observable.of(this.isuFactors.repeatedMeasures); }

  private getMeasure(name: string | any) {
    return this.getMeasures().map(
      measures => measures.find(
        measure => measure.name === name
      ));
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

  set measure$(value: Observable<RepeatedMeasure>) {
    this._measure$ = value;
  }

  get measure$(): Observable<RepeatedMeasure> {
    return this._measure$;
  }

  set outcome$(value: Observable<Outcome>) {
    this._outcome$ = value;
  }

  get outcome$(): Observable<Outcome> {
    return this._outcome$;
  }
}
