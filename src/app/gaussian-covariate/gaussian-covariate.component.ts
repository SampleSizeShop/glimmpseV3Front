import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-gaussian-covariate',
  templateUrl: './gaussian-covariate.component.html',
  styleUrls: ['./gaussian-covariate.component.css']
})
export class GaussianCovariateComponent implements OnInit {
  private _gaussianCovariateForm: FormGroup;
  private _editing: boolean;

  constructor(private _fb: FormBuilder) {
    this.editing = false;
  }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.gaussianCovariateForm = this.fb.group({
      variance: [0]
    });
  }

  includeGaussianCovariate() {
    this.editing = true;
  }

  hasGaussianCovariate() {
    return this.editing;
  }

  get gaussianCovariateForm(): FormGroup {
    return this._gaussianCovariateForm;
  }

  set gaussianCovariateForm(value: FormGroup) {
    this._gaussianCovariateForm = value;
  }

  get editing(): boolean {
    return this._editing;
  }

  set editing(value: boolean) {
    this._editing = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }
}
