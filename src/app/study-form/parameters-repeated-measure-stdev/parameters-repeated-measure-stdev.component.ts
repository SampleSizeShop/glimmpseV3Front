import {Component, DoCheck, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {Subscription, Observable, of} from 'rxjs';
import {StudyService} from '../study.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RepeatedMeasure} from '../../shared/RepeatedMeasure';
import {FormBuilder, FormGroup} from '@angular/forms';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-parameters-repeated-measure-outcome-stdev',
  templateUrl: './parameters-repeated-measure-stdev.component.html',
  styleUrls: ['./parameters-repeated-measure-stdev.component.scss']
})
export class ParametersRepeatedMeasureStdevComponent implements OnInit, DoCheck {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _measure$: Observable<RepeatedMeasure>;
  private _stdevForm: FormGroup;

  private _measure: RepeatedMeasure;

  constructor(private study_service: StudyService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.measure$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getMeasure(params.get('measure'))
    );
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.measure$.subscribe( measure => {
      this.measure = measure;
      this.buildForm();
    });
  }

  ngDoCheck() {
    this.updateStDevs();
  }

  buildForm() {
    this.stdevForm = this.fb.group(this.getStDevControls());
  };

  getStDevControls() {
    const controlDefs = {};
    if (!isNullOrUndefined(this.measure)) {
      this.measure.valueNames.forEach( (name, i) => {
        if (isNullOrUndefined(this.measure.standard_deviations[i])) {
          controlDefs[name] = 1;
        } else {
          controlDefs[name] = this.measure.standard_deviations[i];
        }
      });
    }
    return controlDefs;
  }

  updateStDevs() {
    const stDevs = new Array<number>();
    this.measure.standard_deviations = stDevs;
    for (const name of this.measure.valueNames) {
      if (this.stdevForm.get(String(name))) {
        stDevs.push(this.stdevForm.get(String(name)).value);
      }
    }
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  getMeasures() { return of(this.isuFactors.repeatedMeasures); }

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

  get stdevForm(): FormGroup {
    return this._stdevForm;
  }

  set stdevForm(value: FormGroup) {
    this._stdevForm = value;
  }

  get measure(): RepeatedMeasure {
    return this._measure;
  }

  set measure(value: RepeatedMeasure) {
    this._measure = value;
    this.buildForm();
  }
}
