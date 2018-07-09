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
export class ParametersMarginalMeansComponent implements OnInit, DoCheck {
  private _isuFactors: ISUFactors;
  private _tables: Array<ISUFactorCombinationTable>;
  private _marginalMeansForm: FormGroup;

  private _isuFactorsSubscription: Subscription;
  private _outcome$: Observable<Outcome>;
  private _outcome: Outcome;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _study_service: StudyService) {
    this.outcome$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getOutcome(params.get('outcome'))
    );
    this.isuFactorsSubscription = this._study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );}

  ngOnInit() {
    this.updateMarginalMeansFormControls();
  }

  ngDoCheck() {
    this.updateMarginalMeans();
    this._study_service.updateIsuFactors(this.isuFactors);
  }

  updateMarginalMeans() {
    if ( this.isuFactors ) {
      this.isuFactors.marginalMeans.forEach(marginalMean => {
        const value = this.marginalMeansForm.get(marginalMean.name).value;
        marginalMean.size = value;
      });
    }
  }

  getOutcomes() { return Observable.of(this.isuFactors.outcomes); }

  private getOutcome(name: string | any) {
    return this.getOutcomes().map(
      outcomes => outcomes.find(
        outcome => outcome.name === name
      ));
  }

  updateMarginalMeansFormControls() {
    if (isNullOrUndefined( this._isuFactors.marginalMeans ) || this._isuFactors.marginalMeans.size === 0) {
      this._isuFactors.marginalMeans = this._isuFactors.generateCombinations(this._isuFactors.hypothesis);
    }

    this.tables = this.isuFactors.groupCombinations(
      this.isuFactors.marginalMeans,
      this.isuFactors.hypothesis);

    const controlDefs = {};
    this.tables.forEach(table => {
      const names = table.table.keys();
      let done = false;
      let next = names.next();
      while (!done) {
        const key = next.value;
        const combination = table.table.get(key);
        if (!isNullOrUndefined(combination)) {
          controlDefs[combination.name] = [combination.size];
        }
        next = names.next();
        done = next.done;
      }
    });
    this.marginalMeansForm = this.fb.group(controlDefs);
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
