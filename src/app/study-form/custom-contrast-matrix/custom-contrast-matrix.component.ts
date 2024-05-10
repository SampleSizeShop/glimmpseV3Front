import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import {isNullOrUndefined} from 'util';
import {ContrastMatrixService} from './contrast-matrix.service';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {constants} from '../../shared/model/constants';
import { TooltipPosition } from '@angular/material/tooltip';
import {zeroColsValidator} from '../../shared/validators/zerocols.validator';
import {PartialMatrix} from '../../shared/model/PartialMatrix';
import {zeroRowsValidator} from '../../shared/validators/zerorows.validator';

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
  private _name: string;
  private _labels: Array<string>;

  private formErrors = constants.CORRELATION_MATRIX_FORM_ERRORS;
  private messages = constants.CORRELATION_MATRIX_VALIDATION_MESSAGES;

  private _contrast_matrix: PartialMatrix;
  private _contrast_matrix_form: UntypedFormGroup;
  private contrast_matrix_subscription: Subscription;
  private rows_subscription: Subscription;
  private cols_subscription: Subscription;
  private factor_subscription: Subscription;
  private _validator;
  @Input('between') between: boolean;
  left: TooltipPosition;
  below: TooltipPosition;

  constructor(
    private fb: UntypedFormBuilder,
    private contrast_matrix_service: ContrastMatrixService,
    private log: NGXLogger
  ) {
    this.left = 'left';
    this.below = 'below';
    this.contrast_matrix = new PartialMatrix();
    this.contrast_matrix_subscription = this.contrast_matrix_service.contrast_matrix$.subscribe(
      contrast_matrix => {
        this.contrast_matrix = contrast_matrix;
      }
    );
    this.rows_subscription = this.contrast_matrix_service.rows$.subscribe(rows => {
      if (!isNullOrUndefined(this.contrast_matrix)) {
        const dimensions = this.contrast_matrix.values.size();
        dimensions[0] = rows;
        this.contrast_matrix.values.resize(dimensions);
      }
    });
    this.cols_subscription = this.contrast_matrix_service.cols$.subscribe(cols => {
      if (!isNullOrUndefined(this.contrast_matrix)) {
        const dimensions = this.contrast_matrix.values.size();
        dimensions[1] = cols;
        this.contrast_matrix.values.resize(dimensions);
      }
    });
    this.factor_subscription = this.contrast_matrix_service.factor$.subscribe(factor => {
      this._name = factor.name;
      this._labels = factor.valueNames;
    });
    this._initializeProperties()
    this.buildForm();
  }

  ngOnInit() {
    this.buildForm();
  }

  _initializeProperties() {
    this.formErrors = {};
    this.controlDefs = {};
  }

  ngOnDestroy() {
    this.updateMatrix();
    this.contrast_matrix_subscription.unsubscribe();
    this.rows_subscription.unsubscribe();
    this.cols_subscription.unsubscribe();
    this.factor_subscription.unsubscribe();
  }

  buildForm() {
    this._defineFormControls();
    if (this.between) {
      this._validator = zeroRowsValidator;
    } else {
      this._validator = zeroColsValidator;
    }
    this._contrast_matrix_form = this.fb.group(this.controlDefs, {validator: this._validator(this.contrast_matrix.values)});
    this.contrast_matrix_form.valueChanges.subscribe(data => this.onValueChangedContrastMatrixForm(data));
  }

  _defineFormControls() {
    this.validationMessages = constants.CORRELATION_MATRIX_VALIDATION_MESSAGES;
    if (!isNullOrUndefined(this.contrast_matrix)
      && !isNullOrUndefined(this.contrast_matrix.values)
      && this.contrast_matrix.values.size()[0] > 0) {
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
  }

  onValueChangedContrastMatrixForm(data?: any) {
    if (!this.contrast_matrix_form) {
      return;
    }
    const form = this.contrast_matrix_form;

    this.formErrors['zeroCol'] = '';

    if (this.contrast_matrix_form.errors) {
      this.formErrors['zeroCol'] += this.validationMessages['zeroCol'];
    }
  }

  getColsArray() {
    const colsArray = Array.from(Array(this.contrast_matrix.values.size()[1]).keys());
    return colsArray;
  }

  getRowsArray() {
    if (this.contrast_matrix.values.size()[0] > 0) {
      const rowsArray = Array.from(Array(this.contrast_matrix.values.size()[0]).keys());
      return rowsArray;
    } else {
      return [];
    }
  }

  updateMatrix() {
    this._setContrastMatrixFromForm();
    this.contrast_matrix_service.update_contrast_matrix( this.contrast_matrix );
  }

  _setContrastMatrixFromForm() {
    Object.keys(this._contrast_matrix_form.controls).forEach(control => {
      const loc = this.splitName(control);
      this.contrast_matrix.values.set([+loc[0], +loc[1]], this._contrast_matrix_form.get(control).value);
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

  get contrast_matrix(): PartialMatrix {
    return this._contrast_matrix;
  }

  set contrast_matrix(value: PartialMatrix) {
    this._contrast_matrix = value;
  }

  get contrast_matrix_form(): UntypedFormGroup {
    return this._contrast_matrix_form;
  }

  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }

  get name(): string {
    return this._name;
  }

  get labels(): Array<string> {
    return this._labels;
  }
}
