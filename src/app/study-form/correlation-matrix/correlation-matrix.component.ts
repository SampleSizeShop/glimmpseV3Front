import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {CorrelationMatrixService} from './correlationMatrix.service';
import {Subscription} from 'rxjs';
import {constants} from '../../shared/constants';
import {CorrelationMatrix} from '../../shared/CorrelationMatrix';
import * as math from 'mathjs';
import {minMaxValidator} from 'app/shared/minmax.validator';
import {NGXLogger} from 'ngx-logger';
import {isNull, isNullOrUndefined} from 'util';
import {TooltipPosition} from "@angular/material";

@Component({
  selector: 'app-correlation-matrix',
  templateUrl: './correlation-matrix.component.html',
  styleUrls: ['./correlation-matrix.component.scss'],
  providers: [ NGXLogger ]
})
export class CorrelationMatrixComponent implements OnInit, DoCheck, OnDestroy {

  private _size: number;
  private _title: string;
  private _labels: string[];
  private _sizeArray: number[];
  private _controlDefs: {};
  private _controls: {};
  private _values: {};
  private _correlationMatrixForm: FormGroup;
  private _learForm: FormGroup;
  private _learFormSubscription: Subscription;
  private _correlationMatrixSubscription: Subscription;
  private _sizeSubscription: Subscription;
  private _uMatrix: CorrelationMatrix;
  private _min: number;
  private _max: number;
  private _check: number;

  private _formErrors = constants.CORRELATION_MATRIX_FORM_ERRORS;
  private _messages = constants.CORRELATION_MATRIX_VALIDATION_MESSAGES;
  private _validationMessages = {};
  private _lear = false;

  left: TooltipPosition;
  below: TooltipPosition;

  constructor(
    private _fb: FormBuilder,
    private _correlationMatrixService: CorrelationMatrixService,
    private log: NGXLogger
  ) {

    this.left = 'left';
    this.below = 'below';
    this.correlationMatrixSubscription = this._correlationMatrixService.correlationMatrix$.subscribe(
      correlationMatrix => {
        this.uMatrix = correlationMatrix;
      }
    );
    this._sizeSubscription = this._correlationMatrixService.size$.subscribe(
      size => {
        this.size = size;
        if (
          !isNullOrUndefined(size)
          && size > 0
          && this.uMatrix.values.size()[0] > 0
        ) {
          this.buildForm();
          this.sizeArray = Array.from(Array(this.size).keys());
        }
      }
    );
    this._check = this.size;
  }

  ngOnInit() {
    this.buildForm();
    this._learFormSubscription = this._learForm.valueChanges.subscribe(value => this.onLearChange(value));
  }

  onLearChange(value: any) {
    console.log(this.learForm.value.scale)
    if (this.learForm.status === 'VALID' ) {
      this.calculateLear(value.base, value.decay, value.scale);
    }
  }

  ngDoCheck() {
    if (this._check !== this.size) {
      if (!isNullOrUndefined(this.size)
        && this.size > 0
        && this.uMatrix.values.size()[0] > 0) {
        this.buildForm();
      }
    }
    this._check = this.size;
  }

  ngOnDestroy() {
    this.correlationMatrixSubscription.unsubscribe();
  }

  buildForm(): void {
    this._initializeProperties();
    this._defineMatrixFormControls();
    this._defineLearFormControls();

    this.correlationMatrixForm = this._fb.group(this.controlDefs);
    this.trackControlChanges();
    this.updateMatrix()
  }

  onValueChanged(data?: any) {
    let isValid = true;
    if (!this.correlationMatrixForm) {
      return;
    }
    const form = this.correlationMatrixForm;

    for (const field of Object.keys(this.controlDefs)) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors) ) {
          this.formErrors[field] += messages[key] + ' ';
          isValid = false;
        }
      }
    }
    this._correlationMatrixService.updateValid(isValid);
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

  _initializeProperties() {
    this.formErrors = {};
    if (
      this.size !== -1
      && !isNullOrUndefined(this.uMatrix.values)
      && this.uMatrix.values.size()[0] !== this.size) {
      this.uMatrix.populateDefaultValues(this.size);
    }

    this.size = this.uMatrix.values.size()[0];
    this.values = {};
    this.controlDefs = {};
    this.controls = {};
  }

  _defineMatrixFormControls() {
    this.validationMessages = {};
    this.sizeArray = Array.from(Array(this.size).keys());
    for (const r of this.sizeArray) {
      for (const c of this.sizeArray) {
        const name = this.buildName(r.toString(), c.toString());
        this.validationMessages[name] = this.messages;
        if (r > c) {
          this.controlDefs[name] = [this.uMatrix.values.get([r, c]), minMaxValidator(this.min, this.max, this.log)];
        }
        if (r === c) {
          this.controlDefs[name] = [{value: this.uMatrix.values.get([r, c]), disabled: true},
                                    minMaxValidator(this.min, this.max, this.log)];
        }
        if (r < c) {
          this.controlDefs[name] = [{value: this.uMatrix.values.get([r, c]), disabled: true},
                                    minMaxValidator(this.min, this.max, this.log)];
        }
        this.values[name] = this.uMatrix.values.get([r, c]);
      }
    };
  }

  _defineLearFormControls() {
    this._learForm = this.fb.group({
      base: [0.5, minMaxValidator(0, 0.9999999999999999, this.log)],
      decay: [0.3, minMaxValidator(0, 99999999999999999999, this.log)],
      scale: [true]
    });
  }

  updateMatrix() {
    this._setUMatrixFromValues();
    this.correlationMatrixService.updateCorrelationMatrix( this.uMatrix );
  }

  _transposeName(name: string): string {
    const parts = this.splitName(name);
    if (parts.length === 2 && parts[0] !== parts[1]) {
      name = this.buildName(parts[1], parts[0]);
    }
    return name;
  }

  _linkToTranspose(name: string): boolean {
    const parts = this.splitName(name);
    return (parts.length === 2 && parseInt(parts[0], 10) > parseInt(parts[1], 10)) ? true : false;
  }

  _setUMatrixFromValues() {
    const vals = new Array();
    const rows = new Set();
    for (const val of Object.keys(this.values)) {
      const parts = this.splitName(val);
      rows.add(parts[0]);
    }
    for (const row of Array.from(rows.values())) {
      const rowVals: number[] = [];
      for (const name of Object.keys (this.values)) {
        const parts = this.splitName(name);
        if (parts[0] === row) {
          rowVals[parts[1]] = this.values[name];
        }
      }

      vals[row] = rowVals;
    }
    this.uMatrix.values = math.matrix(vals);
  }

  private splitName(name: string) {
    return name.split(constants.SEPARATOR);
  }

  private buildName(first: string, second: string): string {
    return first + constants.SEPARATOR + second;
  }

  trackControlChanges() {
    for (const name of Object.keys(this.controlDefs)) {
      this.controls[name] = this.correlationMatrixForm.get(name);
      this.controls[name].valueChanges.forEach((value: number) => {
        this.values[name] = value;
        if (this._linkToTranspose(name)) {
          const transpose = this._transposeName(name);
          this.values[transpose] = value;
          this.correlationMatrixForm.get(transpose).setValue(value);
          this.onValueChanged();
        }
        this.updateMatrix()
      });
    }
  }

  getStyle(row: number, col: number): string {
    let style = 'inherit';
    if ( row === col) {
      style = 'rgba(2, 117, 216, 0.21)';
    }
    if ( row > col) {
      style = '#ffffff';
    }
    return style;
  }

  calculateLear(base?: number, decay?: number, scaled?: boolean) {
    const levels = [];

    let dMin = 1;
    let dMax = 1;
    let scale = 1;
    if (isNullOrUndefined(base)) {
      base = this._learForm.value.base;
    }
    if (isNullOrUndefined(decay)) {
      decay = this._learForm.value.decay;
    }
    if (isNullOrUndefined(scaled)) {
      scaled = this._learForm.value.scale;
    }

    if ( this._isNumeric()
      && !isNullOrUndefined(base)
      && !isNullOrUndefined(decay)) {
      this.labels.forEach(
        val => {
          levels.push(Number.parseFloat(val));
        }
      );
      dMin = this._calcDmin(levels);
      dMax = this._calcDMax(levels);

      if (!isNullOrUndefined(scaled) && scaled) {
        scale = dMin;
      }

      const vals = this.uMatrix.values.clone();
      for ( let r = 0; r < vals.size()[0]; r++ ) {
        for (let c = 0; c < vals.size()[1]; c++ ) {
          if (r === c ) { vals.set([r, c],  1); }
          if (r > c  && dMin === dMax ) {
            vals.set([r, c], base);
            vals.set([c, r], base);
          }
          if (r > c  && dMin !== dMax ) {
            const rho_j_k =  Math.pow(base, (dMin / scale + decay * (((levels[r] - levels[c]) - dMin) / (dMax - dMin)) / scale);
            vals.set([r, c], rho_j_k );
            vals.set([c, r], rho_j_k );
          }
        }
      }

      this.uMatrix.values = vals;
      this._defineMatrixFormControls();
      this.correlationMatrixForm = this._fb.group(this.controlDefs);
    }
  }

  _calcDmin(levels) {
    let min = null;
    for (let i = 0; i < levels.length; i++) {
      const a = levels[i];
      for (let j = 0; j < levels.length; j++) {
        if (i !== j) {
          const b = levels[j];
          const test = Math.abs(a - b);
          if (isNull(min) || test < min) {
            min = test;
          }
        }
      }
    }
    return min;
  }

  _calcDMax(levels) {
    return Math.max.apply(null, levels) - Math.min.apply(null, levels);
  }

  _isNumeric() {
    let isNumeric = true
    this.labels.forEach(
      value => {
        if ( isNaN(Number.parseFloat(value))) {
          isNumeric = false;
        }
      }
    );
    return isNumeric;
  }

  isUnstructured() {
    return !this._lear;
  }

  isLear() {
    return this._lear;
  }

  selectUnstructured() {
    this._lear = false;
  }

  selectLear() {
    this._lear = true;
    this._learFormSubscription = this._learForm.valueChanges.subscribe(value => this.onLearChange(value));
    this.calculateLear()
  }

  get learForm(): FormGroup {
    return this._learForm;
  }

  get correlationMatrixForm(): FormGroup {
    return this._correlationMatrixForm;
  }

  set correlationMatrixForm(value: FormGroup) {
    this._correlationMatrixForm = value;
  }

  get size(): number {
    return this._size;
  }

  @Input() set size(value: number) {
    this._size = value;
  }

  get title(): string {
    if (isNullOrUndefined(this._title)) { this._title = ''; }
    return this._title;
  }

  @Input() set title(value: string) {
    this._title = value + ' ';
    this.buildForm();
  }

  get labels(): string[] {
    return this._labels;
  }

  @Input() set labels(value: string[]) {
    this._labels = value;
  }

  get controlDefs(): {} {
    return this._controlDefs;
  }

  set controlDefs(value: {}) {
    this._controlDefs = value;
  }

  get correlationMatrixSubscription(): Subscription {
    return this._correlationMatrixSubscription;
  }

  set correlationMatrixSubscription(value: Subscription) {
    this._correlationMatrixSubscription = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get correlationMatrixService(): CorrelationMatrixService {
    return this._correlationMatrixService;
  }

  set correlationMatrixService(value: CorrelationMatrixService) {
    this._correlationMatrixService = value;
  }

  get uMatrix(): CorrelationMatrix {
    return this._uMatrix;
  }

  set uMatrix(value: CorrelationMatrix) {
    this._uMatrix = value;
  }

  get sizeArray(): number[] {
    return this._sizeArray;
  }

  set sizeArray(value: number[]) {
    this._sizeArray = value;
  }

  get values(): {} {
    return this._values;
  }

  set values(value: {}) {
    this._values = value;
  }

  get controls(): {} {
    return this._controls;
  }

  set controls(value: {}) {
    this._controls = value;
  }

  get min(): number {
    return this._min;
  }

  @Input()
  set min(value: number) {
    this._min = value;
  }

  get max(): number {
    return this._max;
  }

  @Input()
  set max(value: number) {
    this._max = value;
  }

  get formErrors(): { correlationmatrixerror } | any {
    return this._formErrors;
  }

  set formErrors(value: { correlationmatrixerror } | any) {
    this._formErrors = value;
  }

  get validationMessages(): { matrix } | any {
    return this._validationMessages;
  }

  set validationMessages(value: { matrix } | any) {
    this._validationMessages = value;
  }

  get messages(): { minval; maxval } | any {
    return this._messages;
  }

  set messages(value: { minval; maxval } | any) {
    this._messages = value;
  }
}
