import {AfterContentInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CovarianceMatrixService} from '../shared/covarianceMatrix.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-covariance-matrix',
  templateUrl: './covariance-matrix.component.html',
  styleUrls: ['./covariance-matrix.component.scss']
})
export class CovarianceMatrixComponent implements OnInit, AfterContentInit, OnChanges {

  private _size: number;
  private _sizeArray: number[];
  private _controls: {};
  private _covarianceMatrixForm: FormGroup;
  private _covarianceMatrixSubscription: Subscription;
  private _uMatrix: string;
  private _isBuilt: boolean;

  constructor(private _fb: FormBuilder, private _covarianceMatrixService: CovarianceMatrixService) {
    this.isBuilt = false;
    this.covarianceMatrixSubscription = this._covarianceMatrixService.covarianceMatrix$.subscribe(
      covarianceMatrix => {
        this.uMatrix = covarianceMatrix;
      }
    );
  }

  buildForm(): void {
    this.isBuilt = false;
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

    this.covarianceMatrixForm = this._fb.group(this.controls);

    this.isBuilt = true;
  }

  onValueChanged(data?: any) {
    if (!this.covarianceMatrixForm) {
      return;
    }
    const form = this.covarianceMatrixForm;
  }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  ngAfterContentInit() {
    this.buildForm();
  }

  updateMatrix() {
    this.covarianceMatrixService.updateCovarianceMatrix('[[1, 2, 3], [4, 5, 6], [7, 8, 9]]')
  }

  get covarianceMatrixInputArray(): FormArray {
    this.size = 0;
    return this.covarianceMatrixForm.get('covarianceMatrixInputArray') as FormArray;
  }

  get covarianceMatrixForm(): FormGroup {
    return this._covarianceMatrixForm;
  }

  set covarianceMatrixForm(value: FormGroup) {
    this._covarianceMatrixForm = value;
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

  get covarianceMatrixSubscription(): Subscription {
    return this._covarianceMatrixSubscription;
  }

  set covarianceMatrixSubscription(value: Subscription) {
    this._covarianceMatrixSubscription = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get covarianceMatrixService(): CovarianceMatrixService {
    return this._covarianceMatrixService;
  }

  set covarianceMatrixService(value: CovarianceMatrixService) {
    this._covarianceMatrixService = value;
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

  get isBuilt(): boolean {
    return this._isBuilt;
  }

  set isBuilt(value: boolean) {
    this._isBuilt = value;
  }
}
