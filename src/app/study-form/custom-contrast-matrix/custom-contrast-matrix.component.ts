import * as math from 'mathjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import {isNullOrUndefined} from 'util';
import {ContrastMatrix} from '../../shared/ContrastMatrix';
import {ContrastMatrixService} from './contrast-matrix.service';
import {minMaxValidator} from '../../shared/minmax.validator';
import {constants} from '../../shared/constants';

@Component({
  selector: 'app-custom-matrix',
  templateUrl: './custom-contrast-matrix.component.html',
  styleUrls: ['./custom-contrast-matrix.component.scss']
})
export class CustomContrastMatrixComponent implements OnInit, OnDestroy {


  private validationMessages = {};
  private controlDefs: {};
  private _min: number;
  private _max: number;

  private formErrors = constants.CORRELATION_MATRIX_FORM_ERRORS;
  private messages = constants.CORRELATION_MATRIX_VALIDATION_MESSAGES;

  private _contrast_matrix: ContrastMatrix;
  private _contrast_matrix_form: FormGroup;
  private contrast_matrix_subscription: Subscription;
  private size_subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private contrast_matrix_service: ContrastMatrixService,
    private log: NGXLogger
  ) {
    this.contrast_matrix_subscription = this.contrast_matrix_service.contrast_matrix$.subscribe(
      contrast_matrix => {
        this.contrast_matrix = contrast_matrix;
      }
    );
    this.contrast_matrix = new ContrastMatrix();
    this.contrast_matrix.values = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    this._initializeProperties()
    this.buildForm();
  }

  ngOnInit() {
  }

  _initializeProperties() {
    this.formErrors = {};
    this.controlDefs = {};
  }

  ngOnDestroy() {
    this.updateMatrix();
    this.contrast_matrix_subscription.unsubscribe();
  }

  buildForm() {
    this._defineFormControls();
    this._contrast_matrix_form = this.fb.group(this.controlDefs);
  }

  _defineFormControls() {
    this.validationMessages = {};
    const rowsArray = this.getRowsArray();
    const colsArray = this.getColsArray();
    for (const r of rowsArray) {
      for (const c of colsArray) {
        const name = this.buildName(r.toString(), c.toString());
        this.validationMessages[name] = this.messages;
        this.controlDefs[name] = [this._contrast_matrix.values.get([r, c]), minMaxValidator(this._min, this._max, this.log)];
      }
    };
  }

  private getColsArray() {
    const colsArray = Array.from(Array(this.contrast_matrix.values.size()[1]).keys());
    return colsArray;
  }

  private getRowsArray() {
    const rowsArray = Array.from(Array(this.contrast_matrix.values.size()[0]).keys());
    return rowsArray;
  }

  updateMatrix() {
    this._setContrastMatrixFromForm();
    this.contrast_matrix_service.update_contrast_matrix( this.contrast_matrix );
  }

  _setContrastMatrixFromForm() {
    Object.keys(this._contrast_matrix_form.controls).forEach(control => {
      const loc = this.splitName(control);
      this.contrast_matrix.values.set([+loc[0], +loc[1]], this._contrast_matrix_form.get(control));
    });
  }

  private buildName(first: string, second: string): string {
    return first + constants.SEPARATOR + second;
  }

  private splitName(name: string) {
    return name.split(constants.SEPARATOR);
  }

  getFormErrors(): string {
    let messages = '';
    for (const element in this.formErrors) {
      if (this.formErrors[element]) {
        messages = messages + element + ': ' + this.formErrors[element] + ' ';
      }
    }
    return messages;
  }

  get contrast_matrix(): ContrastMatrix {
    return this._contrast_matrix;
  }

  set contrast_matrix(value: ContrastMatrix) {
    this._contrast_matrix = value;
  }

  get contrast_matrix_form(): FormGroup {
    return this._contrast_matrix_form;
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }
}
