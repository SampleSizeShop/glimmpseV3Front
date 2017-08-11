import {AfterContentInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {CorrelationMatrixService} from '../shared/correlationMatrix.service';
import {Subscription} from 'rxjs/Subscription';
import {constants} from '../shared/constants';

@Component({
  selector: 'app-correlation-matrix',
  templateUrl: './correlation-matrix.component.html',
  styleUrls: ['./correlation-matrix.component.scss']
})
export class CorrelationMatrixComponent implements  OnInit {

  private _size: number;
  private _sizeArray: number[];
  private _controlDefs: {};
  private _controls: {};
  private _values: {};
  private _correlationMatrixForm: FormGroup;
  private _correlationMatrixSubscription: Subscription;
  private _uMatrix: string;

  constructor(private _fb: FormBuilder, private _correlationMatrixService: CorrelationMatrixService) {
    this.correlationMatrixSubscription = this._correlationMatrixService.correlationMatrix$.subscribe(
      correlationMatrix => {
        this.uMatrix = correlationMatrix;
      }
    );
    this.correlationMatrixSubscription = this._correlationMatrixService.size$.subscribe(
      size => {
        this.size = size;
      }
    );
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    if (this.uMatrix && this.uMatrix !== 'DEFAULT_VALUE') {
      this.size = this.uMatrix.split('],[').length;
      if (!this.values) {this.values = {}; }
      this.controlDefs = {};
      this.controls = {};
      this.sizeArray =  Array.from(Array(this.size).keys());

      for (const r of this.sizeArray) {
        for (const c of this.sizeArray) {
          const name = this.buildName(r.toString(), c.toString());
          if (r > c) {
            this.controlDefs[name] = [0];
            this.values[name] = 0;
          }
          if (r === c) {
            this.controlDefs[name] = [{value: 1, disabled: true}];
            this.values[name] = 1;
          }
          if (r < c) {
            this.controlDefs[name] = [{value: 0, disabled: true}];
            this.values[name] = 0;
          }
        }
      }
    }
    if (this.size !== -1) {
      if (!this.values) {this.values = {}; }
      this.controlDefs = {};
      this.controls = {};
      this.sizeArray =  Array.from(Array(this.size).keys());

      for (const r of this.sizeArray) {
        for (const c of this.sizeArray) {
          const name = this.buildName(r.toString(), c.toString());
          if (r > c) {
            this.controlDefs[name] = [0];
            this.values[name] = 0;
          }
          if (r === c) {
            this.controlDefs[name] = [{value: 1, disabled: true}];
            this.values[name] = 1;
          }
          if (r < c) {
            this.controlDefs[name] = [{value: 0, disabled: true}];
            this.values[name] = 0;
          }
        }
      }
    }

    this.correlationMatrixForm = this._fb.group(this.controlDefs);
    this.trackControlChanges();

    this.updateMatrix()
  }

  updateMatrix() {
    this.uMatrix = this.buildArrayString(this.values);
    this.correlationMatrixService.updateCorrelationMatrix( this.uMatrix );
  }

  private transposeName(name: string): string {
    const parts = this.splitName(name);
    if (parts.length === 2 && parts[0] !== parts[1]) {
      name = this.buildName(parts[1], parts[0]);
    }
    return name;
  }

  private linkToTranspose(name: string): boolean {
    const parts = this.splitName(name);
    return (parts.length === 2 && parseInt(parts[0], 10) > parseInt(parts[1], 10)) ? true : false;
  }

  private buildArrayString(values: {}): string {
    let matrixStr = '[';
    const rows = new Set();
    for ( const name in values ) {
      const parts = this.splitName(name);
      rows.add(parts[0]);
    }

    for (const row of Array.from(rows.values())) {
      const rowVals = {};
      matrixStr = matrixStr + '[';
      for (const name in values) {
        const parts = this.splitName(name);
        if (parts[0] === row) {
          rowVals[parts[1]] = values[name];
        }
      }
      for (const val in rowVals ) {
        matrixStr = matrixStr + rowVals[val] + ',';
      }
      matrixStr = this.trimLastChar(matrixStr);
      matrixStr = matrixStr + '],';
    }

    matrixStr = this.trimLastChar(matrixStr);
    matrixStr = matrixStr + ']';

    return matrixStr;
  }

  private trimLastChar(str: string) {
    return str.substring(0, str.length - 1);
  }

  private splitName(name: string) {
    return name.split(constants.SEPARATOR);
  }

  private buildName(first: string, second: string): string {
    return first + constants.SEPARATOR + second;
  }

  trackControlChanges() {
    for (const name in this.controlDefs) {
      this.controls[name] = this.correlationMatrixForm.get(name);
      this.controls[name].valueChanges.forEach((value: number) => {
        this.values[name] = value;
        if (this.linkToTranspose(name)) {
          const transpose = this.transposeName(name);
          this.values[transpose] = value;
          this.correlationMatrixForm.get(transpose).setValue(value);
        }
        this.updateMatrix()
      });
    }
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

  @Input()
  set size(value: number) {
    this._size = value;
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

  get uMatrix(): string {
    return this._uMatrix;
  }

  set uMatrix(value: string) {
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
}
