import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CovarianceMatrixService} from '../shared/covarianceMatrix.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-repeated-measure',
  templateUrl: './repeated-measure.component.html',
  styleUrls: ['./repeated-measure.component.scss'],
  providers: [CovarianceMatrixService]
})
export class RepeatedMeasureComponent implements OnInit, OnChanges {

  private _repeatedMeasure: RepeatedMeasure;
  private _repeatedMeasureForm: FormGroup;
  private _covarianceMatrixSubscription: Subscription;
  private _uMatrix: string;

  constructor(private _fb: FormBuilder, private covarianceMatrixService: CovarianceMatrixService) {
    this.covarianceMatrixSubscription = this.covarianceMatrixService.covarianceMatrix$.subscribe(
      covarianceMatrix => {
        this.uMatrix = covarianceMatrix;
      }
    );
    this.buildForm();
  }

  buildForm(): void {
    this.repeatedMeasureForm = this.fb.group({
      name: [''],
      noRepeats: [''],
      spacing: [''],
      covarianceMatrix: ''
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.covarianceMatrixService.updateCovarianceMatrix('2');
  }

  get repeatedMeasure(): RepeatedMeasure {
    return this._repeatedMeasure;
  }

  @Input()
  set repeatedMeasure(value: RepeatedMeasure) {
    this._repeatedMeasure = value;
  }

  get repeatedMeasureForm(): FormGroup {
    return this._repeatedMeasureForm;
  }

  set repeatedMeasureForm(value: FormGroup) {
    this._repeatedMeasureForm = value;
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

  get repeatedMeasureService(): CovarianceMatrixService {
    return this.covarianceMatrixService;
  }

  set repeatedMeasureService(value: CovarianceMatrixService) {
    this.covarianceMatrixService = value;
  }

  get uMatrix(): string {
    return this._uMatrix;
  }

  set uMatrix(value: string) {
    this._uMatrix = value;
  }
}
