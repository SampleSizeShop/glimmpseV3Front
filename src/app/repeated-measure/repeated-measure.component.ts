import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-repeated-measure',
  templateUrl: './repeated-measure.component.html',
  styleUrls: ['./repeated-measure.component.scss']
})
export class RepeatedMeasureComponent implements OnInit, OnChanges {

  private _repMeas: RepeatedMeasure;
  private _repeatedMeasureForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.repeatedMeasureForm = this.fb.group({
      name: [''],
      noRepeats: [''],
      spacing: [''],
      covarianceMatrix: []
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {}

  get repMeas(): RepeatedMeasure {
    return this._repMeas;
  }

  @Input()
  set repMeas(value: RepeatedMeasure) {
    this._repMeas = value;
  }

  get repeatedMeasureForm(): FormGroup {
    return this._repeatedMeasureForm;
  }

  set repeatedMeasureForm(value: FormGroup) {
    this._repeatedMeasureForm = value;
  }
}
