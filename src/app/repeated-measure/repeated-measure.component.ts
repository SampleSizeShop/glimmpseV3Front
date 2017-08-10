import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CorrelationMatrixService} from '../shared/correlationMatrix.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-repeated-measure',
  templateUrl: './repeated-measure.component.html',
  styleUrls: ['./repeated-measure.component.scss'],
  providers: [CorrelationMatrixService]
})
export class RepeatedMeasureComponent {

  private _repeatedMeasure: RepeatedMeasure;
  private _repeatedMeasureForm: FormGroup;
  private _correlationMatrixSubscription: Subscription;

  constructor(private _fb: FormBuilder, private correlationMatrixService: CorrelationMatrixService) {
    this.repeatedMeasure = new RepeatedMeasure();
    this.correlationMatrixSubscription = this.correlationMatrixService.correlationMatrix$.subscribe(
      correlationMatrix => {
        this.repeatedMeasure.correlationMatrix = correlationMatrix;
      }
    );
    this.buildForm();
    this.updateName();
    this.updateNoRepeats();
    this.updateSpacing();
  }

  buildForm(): void {
    this.repeatedMeasureForm = this.fb.group({
      name: [''],
      noRepeats: [''],
      spacing: [''],
      correlationMatrix: ''
    });
  }

  onSubmit() {
    // this.repeatedMeasure = new RepeatedMeasure();
    this.correlationMatrixService.updateCorrelationMatrix(JSON.stringify(this.repeatedMeasure))
  }

  updateName() {
    const noRepeatsControl = this.repeatedMeasureForm.get('name');
    noRepeatsControl.valueChanges.forEach(
      (value: string) => this.repeatedMeasure.name = value);
  }

  updateNoRepeats() {
    const noRepeatsControl = this.repeatedMeasureForm.get('noRepeats');
    noRepeatsControl.valueChanges.forEach(
      (value: number) => this.repeatedMeasure.noRepeats = value);
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

  get repeatedMeasureService(): CorrelationMatrixService {
    return this.correlationMatrixService;
  }

  set repeatedMeasureService(value: CorrelationMatrixService) {
    this.correlationMatrixService = value;
  }
}
