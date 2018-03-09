import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../study.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-parameters-standard-deviation',
  templateUrl: './parameters-standard-deviation.component.html',
  styleUrls: ['./parameters-standard-deviation.component.css']
})
export class ParametersStandardDeviationComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _stDevForm: FormGroup;

  constructor(private study_service: StudyService, private _fb: FormBuilder) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    this._updateStandardDeviations();
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
  }

  buildForm() {
    this.stDevForm = this.fb.group(
      this._defineControls()
    );
  }

  _defineControls() {
    const controlArray = {};
    this.isuFactors.outcomes.forEach(
      outcome => {
        controlArray[outcome.name] = [outcome.standardDeviation]
      }
    );
    return controlArray;
  }

  _updateStandardDeviations() {
    this.isuFactors.outcomes.forEach( outcome => {
      outcome.standardDeviation = this.stDevForm.get(outcome.name).value;
    });
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  get stDevForm(): FormGroup {
    return this._stDevForm;
  }

  set stDevForm(value: FormGroup) {
    this._stDevForm = value;
  }
}
