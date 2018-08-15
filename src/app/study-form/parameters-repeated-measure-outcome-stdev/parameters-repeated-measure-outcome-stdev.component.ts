import {Component, DoCheck, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../study.service';
import {Outcome} from '../../shared/Outcome';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RepeatedMeasure} from '../../shared/RepeatedMeasure';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OutcomeRepMeasStDev} from '../../shared/OutcomeRepMeasStDev';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/constants';

@Component({
  selector: 'app-parameters-repeated-measure-outcome-stdev',
  templateUrl: './parameters-repeated-measure-outcome-stdev.component.html',
  styleUrls: ['./parameters-repeated-measure-outcome-stdev.component.scss']
})
export class ParametersRepeatedMeasureOutcomeStDevComponent implements OnInit, DoCheck {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _outcome$: Observable<Outcome>;
  private _measure$: Observable<RepeatedMeasure>;
  private _stdevForm: FormGroup;
  private _formErrors = constants.PARAMETERS_STANDARD_DEVIATION_ERRORS;
  private _validationMessages = constants.PARAMETERS_STANDARD_DEVIATION_VALIDATION_MESSAGES;

  private _measure: RepeatedMeasure;
  private _outcome: Outcome;

  constructor(private study_service: StudyService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.outcome$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getOutcome(params.get('outcome'))
    );
    this.measure$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getMeasure(params.get('measure'))
    );
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.outcome$.subscribe(outcome => {
      this.outcome = outcome;
    });
    this.measure$.subscribe( measure => {
      this.measure = measure;
      this.buildForm();
    });
  }

  ngDoCheck() {
    if (this.hasRepeatedMeasureValues()) {
      this.updateStDevs();
    }
  }

  buildForm() {
    this.stdevForm = this.fb.group(this.getStDevControls());
    this.stdevForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  };

  onValueChanged(data?: any) {
    if (!this.stdevForm) {
      return;
    }
    const form = this.stdevForm;

    this.formErrors['vectorofstandarddeviations'] = '';
    for (const field in this.stdevForm.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['vectorofstandarddeviations'];
        for (const key in control.errors) {
          this.formErrors['vectorofstandarddeviations'] = messages[key];
        }
      }
    }
  }

  getStDevControls() {
    const controlDefs = {};
    if (this.hasRepeatedMeasureValues()) {
      let match = false;
      for (const stDev of this.isuFactors.outcomeRepeatedMeasureStDevs) {
        if (stDev.outcome === this.outcome.name && stDev.repMeasure === this.measure.name) {
          match = true;
          this.measure.valueNames.forEach( name => {
            controlDefs[name] = [stDev.values.get(name)];
          });
        }
      }
      if (!match) {
        this.measure.valueNames.forEach( name => {
          controlDefs[name] = [1];
        });
      }
    }
    return controlDefs;
  }

  hasRepeatedMeasureValues() {
    if (!isNullOrUndefined(this.measure)
      && !isNullOrUndefined(this.measure.valueNames)
      && this.measure.valueNames.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  updateStDevs() {
    const stDevs = new Map<string, number>();
    for (const name of this.measure.valueNames) {
      if (this.stdevForm.get(String(name))) {
        stDevs.set(name, this.stdevForm.get(String(name)).value);
      }
    }
    if (stDevs.size > 0) {
      const res = new OutcomeRepMeasStDev(this.outcome.name, this.measure.name, stDevs);
      if (this.isuFactors.outcomeRepeatedMeasureStDevs.length === 0) {
        this.isuFactors.outcomeRepeatedMeasureStDevs.push(res);
      } else {
        let match = false;
        for (const stDev of this.isuFactors.outcomeRepeatedMeasureStDevs) {
          if (stDev.outcome === this.outcome.name && stDev.repMeasure === this.measure.name) {
            match = true;
            stDev.values = stDevs;
          }
        }
        if (!match) {
          this.isuFactors.outcomeRepeatedMeasureStDevs.push(res);
        }
      }
      this.study_service.updateIsuFactors(this.isuFactors);
    }
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

  get stdevForm(): FormGroup {
    return this._stdevForm;
  }

  set stdevForm(value: FormGroup) {
    this._stdevForm = value;
  }

  get formErrors(): { vectorofstandarddeviations: string; } {
    return this._formErrors;
  }

  set formErrors(value: { vectorofstandarddeviations: string; }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    vectorofstandarddeviations: { required: string; };
  }
  {
    return this._validationMessages;
  }

  set validationMessages(value: {
    vectorofstandarddeviations: { required: string; };
  }) {
    this._validationMessages = value;
  }

  get measure(): RepeatedMeasure {
    return this._measure;
  }

  set measure(value: RepeatedMeasure) {
    this._measure = value;
    this.buildForm();
  }

  get outcome(): Outcome {
    return this._outcome;
  }

  set outcome(value: Outcome) {
    this._outcome = value;
  }
}
