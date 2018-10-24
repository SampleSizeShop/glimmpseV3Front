import * as math from 'mathjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import {isNullOrUndefined} from 'util';
import {ContrastMatrix} from '../../shared/ContrastMatrix';
import {ContrastMatrixService} from './contrast-matrix.service';

@Component({
  selector: 'app-custom-matrix',
  templateUrl: './custom-contrast-matrix.component.html',
  styleUrls: ['./custom-contrast-matrix.component.scss']
})
export class CustomContrastMatrixComponent implements OnInit, OnDestroy {

  private _size: number;
  private _contrast_matrix: ContrastMatrix;
  private contrast_matrix_form: FormGroup;
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
    this.size_subscription = this.contrast_matrix_service.size$.subscribe(
      size => {
        this.size = size;
        if (
          !isNullOrUndefined(size)
          && size > 0
          && this.contrast_matrix.values.size()[0] > 0
        ) {
          this.buildForm();
        }
      }
    );
    this.contrast_matrix = new ContrastMatrix();
    this.contrast_matrix.values = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.size_subscription.unsubscribe();
    this.contrast_matrix_subscription.unsubscribe();
  }

  buildForm() {}

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get contrast_matrix(): ContrastMatrix {
    return this._contrast_matrix;
  }

  set contrast_matrix(value: ContrastMatrix) {
    this._contrast_matrix = value;
  }
}
