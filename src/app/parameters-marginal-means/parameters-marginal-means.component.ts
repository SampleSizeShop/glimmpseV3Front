import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ISUFactors} from '../shared/ISUFactors';
import {ISUFactorCombinationTable} from '../shared/ISUFactorCombinationTable';

@Component({
  selector: 'app-parameters-marginal-means',
  templateUrl: './parameters-marginal-means.component.html',
  styleUrls: ['./parameters-marginal-means.component.css']
})
export class ParametersMarginalMeansComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _tables: Array<ISUFactorCombinationTable>;
  private _marginalMeansForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.updateMarginalMeansFormControls();
  }

  updateMarginalMeansFormControls() {
    this._isuFactors.marginalMeans = this._isuFactors.generateCombinations(this._isuFactors.hypothesis);
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
        controlDefs[combination.name] = [combination.size];
        next = names.next();
        done = next.done;
      }
    });
    this.marginalMeansForm = this.fb.group(controlDefs);
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  @Input() set isuFactors(value: ISUFactors) {
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
}
