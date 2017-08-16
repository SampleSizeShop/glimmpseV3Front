import {Component, Input, OnInit} from '@angular/core';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CorrelationMatrixService} from '../shared/correlationMatrix.service';
import {Subscription} from 'rxjs/Subscription';
import {RepeatedMeasureService} from '../shared/repeatedMeasure.service';
import {constants} from '../shared/constants';

@Component({
  selector: 'app-repeated-measure',
  templateUrl: './repeated-measure.component.html',
  styleUrls: ['./repeated-measure.component.scss'],
  providers: [CorrelationMatrixService]
})
export class RepeatedMeasureComponent implements OnInit {

  private _repeatedMeasureForm: FormGroup;
  private _correlationMatrixSubscription: Subscription;
  private _min: number;
  private _max: number;

  constructor(
    private _fb: FormBuilder,
    private _correlationMatrixService: CorrelationMatrixService,
    private _repeatedMeasureService: RepeatedMeasureService,
    private _repeatedMeasure: RepeatedMeasure
  ) {}

  ngOnInit() {
    this.min = constants.CORRELATION_MIN;
    this.max = constants.CORRELATION_MAX;
    this.buildForm();
    this.updateCorrelationMatrix();
    this.updateName();
    this.updateNoRepeats();
    this.updateCorrelationType();
    this.updateSpacing();
    if (this.repeatedMeasure.correlationMatrix && this.repeatedMeasure.correlationMatrix.values) {
      this._correlationMatrixService.updateCorrelationMatrix(this.repeatedMeasure.correlationMatrix);
    }
    this.updateVariance();
  }

  buildForm(): void {
    this.repeatedMeasureForm = this.fb.group({
      name: [this.repeatedMeasure.name],
      noRepeats: [this.repeatedMeasure.noRepeats],
      spacing: [this.repeatedMeasure.spacing],
      correlationType: [this.repeatedMeasure.correlationType],
      correlationMatrix: this.repeatedMeasure.correlationMatrix,
      variance: [this.repeatedMeasure.variance]
    });
  }

  addRepeatedMeasure() {
    this.repeatedMeasureService.updateRepeatedMeasure( this.repeatedMeasure );
  }

  updateVariance() {
    const correlationTypeControl = this.repeatedMeasureForm.get('correlationType');
    correlationTypeControl.valueChanges.forEach(
      (value: string) => this.repeatedMeasure.correlationType = value);
  }

  updateCorrelationType() {
    const varianceControl = this.repeatedMeasureForm.get('variance');
    varianceControl.valueChanges.forEach(
      (value: number) => this.repeatedMeasure.variance = value);
  }

  updateCorrelationMatrix() {
    this.correlationMatrixSubscription = this.correlationMatrixService.correlationMatrix$.subscribe(
      correlationMatrix => {
        this.repeatedMeasureForm.get('correlationMatrix').setValue(correlationMatrix);
        if (correlationMatrix && correlationMatrix.values.size()[0] > 0 ) {
          this.repeatedMeasure.correlationMatrix = correlationMatrix;
        }
      }
    );
  }

  updateName() {
    const noRepeatsControl = this.repeatedMeasureForm.get('name');
    noRepeatsControl.valueChanges.forEach(
      (value: string) => this.repeatedMeasure.name = value);
  }

  updateNoRepeats() {
    const noRepeatsControl = this.repeatedMeasureForm.get('noRepeats');
    noRepeatsControl.valueChanges.forEach(
      (value: number) => {
        this.repeatedMeasure.noRepeats = value;
        this._correlationMatrixService.updateSize(value);
      }
    );
  }

  updateSpacing() {
    const noRepeatsControl = this.repeatedMeasureForm.get('spacing');
    noRepeatsControl.valueChanges.forEach(
      (value: number) => this.repeatedMeasure.spacing = value);
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

  get repeatedMeasureService(): RepeatedMeasureService {
    return this._repeatedMeasureService;
  }

  set repeatedMeasureService(value: RepeatedMeasureService) {
    this._repeatedMeasureService = value;
  }

  get correlationMatrixService(): CorrelationMatrixService {
    return this._correlationMatrixService;
  }

  set correlationMatrixService(value: CorrelationMatrixService) {
    this._correlationMatrixService = value;
  }

  get min(): number {
    return this._min;
  }

  set min(value: number) {
    this._min = value;
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
  }
}
