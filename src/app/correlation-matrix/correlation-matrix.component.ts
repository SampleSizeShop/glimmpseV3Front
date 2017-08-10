import {AfterContentInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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
  private _controls: {};
  private _correlationMatrixForm: FormGroup;
  private _correlationMatrixSubscription: Subscription;
  private _uMatrix: string;

  constructor(private _fb: FormBuilder, private _correlationMatrixService: CorrelationMatrixService) {
    this.correlationMatrixSubscription = this._correlationMatrixService.correlationMatrix$.subscribe(
      correlationMatrix => {
        this.uMatrix = correlationMatrix;
      }
    );
  }

  buildForm(): void {
    this.controls = {};
    this.sizeArray =  Array.from(Array(this.size).keys());

    for (const r of this.sizeArray) {
      for (const c of this.sizeArray) {
        const name = r.toString() + c.toString();
        if (r > c) {
          this.controls[name] = [0];
        }
        if (r === c) {
          this.controls[name] = [1];
        }
      }
    }

    this.correlationMatrixForm = this._fb.group(this.controls);
  }

  ngOnInit() {
    this.buildForm();
  }

  updateMatrix() {
    this.correlationMatrixService.updateCorrelationMatrix('[[1, 2, 3], [4, 5, 6], [7, 8, 9]]')
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

  get controls(): {} {
    return this._controls;
  }

  set controls(value: {}) {
    this._controls = value;
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
}
