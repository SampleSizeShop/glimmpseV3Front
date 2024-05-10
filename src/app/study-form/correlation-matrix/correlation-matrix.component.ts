import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {CorrelationMatrixService} from '../../shared/services/correlationMatrix.service';
import {Subscription} from 'rxjs';
import {constants} from '../../shared/model/constants';
import {CorrelationMatrix} from '../../shared/model/CorrelationMatrix';
import * as math from 'mathjs';
import {minMaxValidator} from 'app/shared/validators/minmax.validator';
import {NGXLogger} from 'ngx-logger';
import {isNull, isNullOrUndefined} from 'util';
import { TooltipPosition } from '@angular/material/tooltip';

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
  private _correlationMatrixForm: UntypedFormGroup;
  private _learForm: UntypedFormGroup;
  private _learFormSubscription: Subscription;
  private _correlationMatrixFormSubscriptionMap: Map<string, Subscription>;
  private _correlationMatrixSubscription: Subscription;
  private _sizeSubscription: Subscription;
  private _uMatrix: CorrelationMatrix;
  private _min: number;
  private _max: number;
  private _check: number;

  private _formErrors = constants.CORRELATION_MATRIX_FORM_ERRORS;
  private _messages = constants.CORRELATION_MATRIX_VALIDATION_MESSAGES;
  private _validationMessages = {};

  left: TooltipPosition;
  below: TooltipPosition;

  constructor(
    private _fb: UntypedFormBuilder,
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
          // this.buildForm();
          this.sizeArray = Array.from(Array(this.size).keys());
        }
      }
    );
    // add route subscription here to pick up all form values
    this._check = this.size;
  }

  ngOnInit() {
    this.buildForm();
  }

  onLearChange(value: any) {
    if (this.learForm.status === 'VALID' ) {
      this._uMatrix.calculateLear(value.base, value.decay, value.scale);
      this._defineMatrixFormControls();
      this.correlationMatrixForm = this._fb.group(this.controlDefs);
    }
  }

  ngDoCheck() {
    this._uMatrix.base = this._learForm.get('base').value;
    this._uMatrix.decay = this._learForm.get('decay').value;
    this._uMatrix.scaled = this._learForm.get('scale').value;
    this._check = this.size;
  }

  ngOnDestroy() {
    this.correlationMatrixSubscription.unsubscribe();
    Object.keys(this.controlDefs).forEach(key => {
      if (this._correlationMatrixFormSubscriptionMap.get(key) !== null && this._correlationMatrixFormSubscriptionMap.get(key) !== undefined) {
        this._correlationMatrixFormSubscriptionMap.get(key).unsubscribe();
      }
    });
    this._learFormSubscription.unsubscribe();
    this.correlationMatrixSubscription.unsubscribe();
    this._sizeSubscription.unsubscribe();
  }

  buildForm(): void {
    this._initializeProperties();
    this._defineMatrixFormControls();
    this._defineLearFormControls();
    this.correlationMatrixForm = this._fb.group(this.controlDefs);
    this._defineMatrixFormSubscriptions();
    this._learFormSubscription = this._learForm.valueChanges.subscribe(value => this.onLearChange(value));
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
        if (r === c) {
          this.controlDefs[name] = [{value: this.uMatrix.values.get([r, c]), disabled: true},
                                    minMaxValidator(this.min, this.max, this.log)];
        } else {
          this.controlDefs[name] = [this.uMatrix.values.get([r, c]),
                                    minMaxValidator(this.min, this.max, this.log)];
        }
        this.values[name] = this.uMatrix.values.get([r, c]);
      }
    };
  }

  _defineMatrixFormSubscriptions() {
    this._correlationMatrixFormSubscriptionMap = new Map<string, Subscription>();
    Object.keys(this.controlDefs).forEach(controlName => {
      let sub = new Subscription();
      sub = this._correlationMatrixForm.get(controlName).valueChanges.subscribe( value => {this.trackControlChanges(value, controlName)});
      this._correlationMatrixFormSubscriptionMap.set(controlName, sub);
    });
  }

  _defineLearFormControls() {
    this._learForm = this.fb.group({
      base: [this._uMatrix.base, minMaxValidator(0, 0.9999999999999999, this.log)],
      decay: [this._uMatrix.decay, minMaxValidator(0, 99999999999999999999, this.log)],
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

  _setUMatrixFromValues() {
    const vals = new Array();
    const rows = new Set();
    for (const val of Object.keys(this.values)) {
      const parts = this.splitName(val);
      rows.add(parts[0]);
    }
    for (const row of Array.from(rows.values())) {
      const r = Number(row);
      const rowVals: number[] = [];
      for (const name of Object.keys (this.values)) {
        const parts = this.splitName(name);
        if (parts[0] === row) {
          rowVals[parts[1]] = +this.values[name];
        }
      }

      vals[r] = rowVals;
    }
    this.uMatrix.values = math.matrix(vals);
  }

  private splitName(name: string) {
    return name.split(constants.SEPARATOR);
  }

  private buildName(first: string, second: string): string {
    return first + constants.SEPARATOR + second;
  }

  trackControlChanges(value: number, controlName: string) {
    const transpose = this._transposeName(controlName);
    this._correlationMatrixFormSubscriptionMap.get(transpose).unsubscribe()
    this.correlationMatrixForm.get(transpose).setValue(value);
    let sub = new Subscription();
    sub = this._correlationMatrixForm.get(transpose).valueChanges.subscribe( val => {
      this.trackControlChanges(val, transpose)
    });
    this.values[controlName] = +value;
    this.values[transpose] = +value;
    this.updateMatrix();
    this._correlationMatrixFormSubscriptionMap.set(transpose, sub);
    this.onValueChanged();
  }

  getStyle(row: number, col: number): string {
    let style = 'inherit';
    if ( row === col) {
      style = 'rgba(90, 136, 183, 0.25)';
    }
    if ( row > col) {
      style = '#ffffff';
    }
    return style;
  }

  isUnstructured() {
    return !this._uMatrix.lear;
  }

  isLear() {
    return this._uMatrix.lear;
  }

  selectUnstructured() {
    this._uMatrix.lear = false;
  }

  selectLear() {
    this._uMatrix.lear = true;
    this._learFormSubscription = this._learForm.valueChanges.subscribe(value => this.onLearChange(value));
    this._uMatrix.calculateLear()
    this._defineMatrixFormControls();
    this.correlationMatrixForm = this._fb.group(this.controlDefs);
  }

  get learForm(): UntypedFormGroup {
    return this._learForm;
  }

  get correlationMatrixForm(): UntypedFormGroup {
    return this._correlationMatrixForm;
  }

  set correlationMatrixForm(value: UntypedFormGroup) {
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

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  set fb(value: UntypedFormBuilder) {
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

  isNumeric() {
    return this.uMatrix.isOrderedNumeric();
  }
}
