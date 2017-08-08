import {Component, OnChanges, OnInit} from '@angular/core';
import {StudyService} from '../shared/study.service';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {constants} from '../shared/constants';
import {RepeatedMeasure} from './RepeatedMeasure';

@Component({
  selector: 'app-witin-isu',
  templateUrl: './witin-isu.component.html',
  styleUrls: ['./witin-isu.component.scss']
})
export class WitinIsuComponent implements OnInit, OnChanges{

  private _multipleOutcomes: boolean;
  private _withinISUForm: FormGroup;
  private _formErrors = constants.WITHIN_ISU_ERRORS;
  private _validationMessages = constants.WITHIN_ISU_VALIDATION_MESSAGES;

  constructor(private study_service: StudyService, private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.withinISUForm = this.fb.group({
      singleoutcome: '',
      repeatedmeasures: this.fb.array([])
    });

    this.withinISUForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.withinISUForm) {
      return;
    }
    const form = this.withinISUForm;

    for (const field of this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  setRepeatedMeasures(repeatedMeasures: RepeatedMeasure[]) {
    const repeatedMeasureFGs = repeatedMeasures.map(outcome => this.fb.group(outcome));
    const repeatedMeasuresFA = this.fb.array(repeatedMeasureFGs);
    this.withinISUForm.setControl('repeatedmeasures', repeatedMeasuresFA);
  }

  get repeatedmeasures(): FormArray {
    return this.withinISUForm.get('repeatedmeasures') as FormArray;
  }

  addRepeatedMeasure() {
    this.repeatedmeasures.push(this.fb.group(new RepeatedMeasure()));
  }

  selectGuided() {
    this.study_service.guided = true;
    this.updateForm();
  }

  selectSingleOutcome() {
    this.multipleOutcomes = false;
    this.updateForm();
  }

  selectMultipleOutcomes() {
    this.multipleOutcomes = true;
    this.updateForm();
  }

  private updateForm() {
    this.study_service.selectMultipleOutcomes(this.multipleOutcomes);
  }

  get multipleOutcomes(): boolean {
    return this._multipleOutcomes;
  }

  set multipleOutcomes(value: boolean) {
    this._multipleOutcomes = value;
  }


  get withinISUForm(): FormGroup {
    return this._withinISUForm;
  }

  set withinISUForm(value: FormGroup) {
    this._withinISUForm = value;
  }

  get formErrors(): { singleoutcomeerror } | any {
    return this._formErrors;
  }

  set formErrors(value: { singleoutcomeerror } | any) {
    this._formErrors = value;
  }

  get validationMessages(): any {
    return this._validationMessages;
  }

  set validationMessages(value: any) {
    this._validationMessages = value;
  }

  ngOnInit() {
    this.setRepeatedMeasures([]);
  }

  ngOnChanges() {
    this.setRepeatedMeasures([]);
  }
}
