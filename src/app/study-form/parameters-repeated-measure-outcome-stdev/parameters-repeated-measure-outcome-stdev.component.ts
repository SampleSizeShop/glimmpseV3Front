import {Component, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../study.service';
import {Outcome} from '../../shared/Outcome';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-parameters-repeated-measure-outcome-stdev',
  templateUrl: './parameters-repeated-measure-outcome-stdev.component.html',
  styleUrls: ['./parameters-repeated-measure-outcome-stdev.component.scss']
})
export class ParametersRepeatedMeasureOutcomeStDevComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _outcome$: Observable<Outcome>;
  constructor(private study_service: StudyService, private route: ActivatedRoute) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.outcome$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getOutcome(params.get('outcome'))
    );
  }

  getOutcomes() { return Observable.of(this.isuFactors.outcomes); }

  private getOutcome(name: string | any) {
    return this.getOutcomes().map(
      outcomes => outcomes.find(
        outcome => outcome.name === name
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

  get outcome$(): Observable<Outcome> {
    return this._outcome$;
  }

  set outcome$(value: Observable<Outcome>) {
    this._outcome$ = value;
  }
}
