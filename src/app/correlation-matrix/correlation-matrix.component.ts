import {AfterContentInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {CorrelationMatrixService} from '../shared/correlationMatrix.service';
import {Subscription} from 'rxjs/Subscription';

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
  public disp: string
  constructor(private _fb: FormBuilder, private _correlationMatrixService: CorrelationMatrixService) {
    this.correlationMatrixSubscription = this._correlationMatrixService.correlationMatrix$.subscribe(
      correlationMatrix => {
        this.uMatrix = correlationMatrix;
      }
    );
  }

  buildForm(): void {
    this.values = {};
    this.controlDefs = {};
    this.controls = {};
    this.sizeArray =  Array.from(Array(this.size).keys());

    for (const r of this.sizeArray) {
      for (const c of this.sizeArray) {
        const name = r.toString() + '-' + c.toString();
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

    this.correlationMatrixForm = this._fb.group(this.controlDefs);
    for (const name in this.controlDefs) {
      this.controls[name] = this.correlationMatrixForm.get(name);
      this.controls[name].valueChanges.forEach((value: number) => {
        this.values[name] = value;
        if (this.linkToTranspose(name)) {
          const transpose = this.transposeName(name);
          this.values[transpose] = value;
          this.correlationMatrixForm.get(transpose).setValue(value);
        }
      });
    }
    this.disp = this.buildArrayString(this.values);
  }

  private transposeName(name: string): string {
    const parts = name.split('-');
    if (parts.length === 2 && parts[0] !== parts[1]) {
      name = parts[1] + '-' + parts[0];
    }
    return name;
  }

  private linkToTranspose(name: string): boolean {
    const parts = name.split('-');
    return (parts.length === 2 && parseInt(parts[0], 10) > parseInt(parts[1], 10)) ? true : false;
  }

  private buildArrayString(values: {}): string {
    return JSON.stringify(values);
  }

  ngOnInit() {
    this.buildForm();
  }

  updateMatrix() {
    this.correlationMatrixService.updateCorrelationMatrix('')
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
