import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ISUFactors} from '../../shared/ISUFactors';
import {ISUFactorCombinationTable} from '../../shared/ISUFactorCombinationTable';
import {StudyService} from '../study.service';
import {isNullOrUndefined} from 'util';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Outcome} from '../../shared/Outcome';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-parameters-marginal-means',
  templateUrl: './parameters-marginal-means.component.html',
  styleUrls: ['./parameters-marginal-means.component.css']
})
export class ParametersMarginalMeansComponent implements DoCheck {
  private _isuFactors: ISUFactors;
  private _tables: Array<ISUFactorCombinationTable>;
  private _marginalMeansForm: FormGroup;

  private _isuFactorsSubscription: Subscription;
  private _outcomeSubscription: Subscription;
  private _outcome$: Observable<Outcome>;
  private _outcome: Outcome;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _study_service: StudyService) {
    this.isuFactorsSubscription = this._study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    });
    this.outcome$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getOutcome(params.get('outcome'))
    );
    this.outcomeSubscription = this.outcome$.subscribe( outcome => {
      this.outcome = outcome;
      this.updateMarginalMeansFormControls();
    });
  }

  ngDoCheck() {
    this.updateMarginalMeans();
    this._study_service.updateIsuFactors(this.isuFactors);
  }

  updateMarginalMeans() {
    //TODO: re instate save
    /**if ( this.isuFactors ) {
      this.isuFactors.marginalMeans.forEach(marginalMean => {
        const value = this.marginalMeansForm.get(marginalMean.name).value;
        marginalMean.value = value;
      });
    } **/
  }

  getOutcomes() { return Observable.of(this.isuFactors.outcomes); }

  private getOutcome(name: string | any) {
    return this.getOutcomes().map(
      outcomes => outcomes.find(
        outcome => outcome.name === name
      ));
  }

  updateMarginalMeansFormControls() {
    if (isNullOrUndefined( this._isuFactors.marginalMeans ) || this._isuFactors.marginalMeans.length === 0) {
      // this._isuFactors.marginalMeans = this._isuFactors.generateCombinations(this._isuFactors.hypothesis);
    }
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get tables(): Array<ISUFactorCombinationTable> {
    return this._tables;
  }

  set tables(value: Array<ISUFactorCombinationTable>) {
    this._tables = value;
  }

  get marginalMeansForm(): FormGroup {
    return this._marginalMeansForm;
  }

  set marginalMeansForm(value: FormGroup) {
    this._marginalMeansForm = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  set outcomeSubscription(value: Subscription) {
    this._outcomeSubscription = value;
  }

  get outcome(): Outcome {
    return this._outcome;
  }

  set outcome(value: Outcome) {
    this._outcome = value;
  }

  set outcome$(value: Observable<Outcome>) {
    this._outcome$ = value;
  }

  get outcome$(): Observable<Outcome> {
    return this._outcome$;
  }
}
