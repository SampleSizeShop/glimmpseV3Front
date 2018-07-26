import {Component, DoCheck, OnInit} from '@angular/core';
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
export class HypothesisTheta0Component implements OnInit, DoCheck {

  private _isuFactors: ISUFactors;
  private _theta0Form: FormGroup;
  private _isuFactorsSubscription: Subscription;
  private _visible: boolean;

  constructor(private _fb: FormBuilder, private study_service: StudyService) { }

  ngOnInit() {
    this.visible = false;
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.buildForm();
  }

  ngDoCheck() {
    this.updateTheta0();
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  buildForm() {
    this.theta0Form = this.fb.group( this.controlDefs );
  }

  updateTheta0() {
    if ( !isNullOrUndefined(this.isuFactors) ) {
      this.isuFactors.theta0.forEach( (row, r) => {
        row.forEach( (element, c) => {
          const name = r.toString() + '-' + c.toString();
          this.isuFactors.theta0[r][c] = this.theta0Form.get(name).value;
        });
      });
    }
  }

  get controlDefs() {
    const controlDefs = {};
    this.isuFactors.theta0.forEach((row, r) => {
      row.forEach( (col, c) => {
        const name = r.toString() + '-' + c.toString();
        controlDefs[name] = [col];
      });
    });
    return controlDefs;
  }

  toggleVisible() {
    this.visible = !this.visible;
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

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }
}
