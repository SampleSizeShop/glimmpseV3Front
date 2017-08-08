import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-covariance-matrix',
  templateUrl: './covariance-matrix.component.html',
  styleUrls: ['./covariance-matrix.component.scss']
})
export class CovarianceMatrixComponent implements OnInit {

  private _size: number;
  private _rank;
  private _covarianveMatrixForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.size = 5;
    this.rank =  Array.from(Array(this.size).keys());
  }

  buildForm(): void {
    this.covarianveMatrixForm = this.fb.group({
      covarianceMatrix: this.fb.array([])
    });

    this.covarianveMatrixForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.covarianveMatrixForm) {
      return;
    }
    const form = this.covarianveMatrixForm;
  }

  ngOnInit() {
  }

  get covarianceMatrix(): FormArray {
    return this.covarianveMatrixForm.get('covarianceMatrix') as FormArray;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get covarianveMatrixForm(): FormGroup {
    return this._covarianveMatrixForm;
  }

  set covarianveMatrixForm(value: FormGroup) {
    this._covarianveMatrixForm = value;
  }


  get rank() {
    return this._rank;
  }

  set rank(value) {
    this._rank = value;
  }
}
