import {Component, Input, OnInit} from '@angular/core';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {HypothesisEffect} from "../shared/HypothesisEffect";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ISUFactors} from "../shared/ISUFactors";
import {ISUFactorCombinationTable} from "../shared/ISUFactorCombinationTable";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-parameters-marginal-means',
  templateUrl: './parameters-marginal-means.component.html',
  styleUrls: ['./parameters-marginal-means.component.css']
})
export class ParametersMarginalMeansComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _tables: Array<ISUFactorCombinationTable>;
  private _marginalMeansForm: FormGroup;

  ngOnInit() {
    this._isuFactors.marginalMeans = this._isuFactors.generateCombinations(this._isuFactors.hypothesis);
    this.tables = this.isuFactors.groupCombinations(
      this.isuFactors.marginalMeans,
      this.isuFactors.hypothesis);
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
