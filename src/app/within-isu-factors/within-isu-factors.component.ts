import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {constants} from '../shared/constants';
import {outcomeValidator} from './outcome.validator';

@Component({
  selector: 'app-within-isu-factors',
  templateUrl: './within-isu-factors.component.html',
  styleUrls: ['./within-isu-factors.component.scss']
})
export class WithinIsuFactorsComponent implements OnInit {
  private _outcomesForm: FormGroup;
  private _outcomes: string[];
  private _max: number;

  constructor(private _fb: FormBuilder) {
    this._max = constants.MAX_OUTCOMES;
    this.outcomes = [];
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.outcomesForm = this.fb.group({
      outcomes: ['', outcomeValidator(this.outcomes)]
    });
  }

  addOutcome() {
    if (this.outcomesForm.status === 'VALID') {
      this.outcomes.push(this.outcomesForm.value.outcomes);
      this.outcomesForm.reset();
    }
  }

  removeOutcome(value: string) {
    const index = this.outcomes.indexOf(value);
    if (index > -1) {
      this.outcomes.splice(index, 1);
    }
    this.outcomesForm.reset();
  }

  firstOutcome(): boolean {
    return this.outcomes.length === 0 ? true : false;
  }

  nextOutcome(): boolean {
    if (!this.firstOutcome() && this.outcomes.length < this.max ) {
      return true;
    }
    return false;
  }

  get outcomes(): string[] {
    return this._outcomes;
  }

  set outcomes(value: string[]) {
    this._outcomes = value;
  }

  get outcomesForm(): FormGroup {
    return this._outcomesForm;
  }

  set outcomesForm(value: FormGroup) {
    this._outcomesForm = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
  }
}
