import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ISUFactors} from '../../shared/ISUFactors';
import {StudyService} from '../study.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-hypothesis-theta-0',
  templateUrl: './hypothesis-theta-0.component.html',
  styleUrls: ['./hypothesis-theta-0.component.scss']
})
export class HypothesisTheta0Component implements OnInit {

  private _isuFactors: ISUFactors;
  private _theta0Form: FormGroup;
  private _isuFactorsSubscription: Subscription;

  constructor(private _fb: FormBuilder, private study_service: StudyService) { }

  ngOnInit() {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.buildForm();
  }

  buildForm() {
    this.theta0Form = this.fb.group( {} );
    this.updateFormControls();
  }

  updateFormControls() {
    const controlDefs = this.controlDefs;
    this.theta0Form = this.fb.group(controlDefs);
    if (!isNullOrUndefined(this.isuFactors.theta0)) {
      let r = 0;
      this.isuFactors.theta0.forEach( row => {
        let c = 0;
        row.forEach( col => {
          const name = r.toString() + '-' + c.toString();
          this.theta0Form[name] = [col];
          c = c + 1;
        });
        r = r + 1;
      });
    }
  }

  get controlDefs() {
    const controlDefs = {};
    let r = 0;
    this.isuFactors.theta0.forEach(row => {
      let c = 0;
      row.forEach( col => {
        const name = r.toString() + '-' + c.toString();
        controlDefs[name] = [col];
        c++;
      });
      r++;
    });
    return controlDefs;
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

  get theta0Form(): FormGroup {
    return this._theta0Form;
  }

  set theta0Form(value: FormGroup) {
    this._theta0Form = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }
}
