import {Component, OnChanges, OnInit} from '@angular/core';
import {StudyService} from '../shared/study.service';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {constants} from '../shared/constants';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {RepeatedMeasureService} from '../shared/repeatedMeasure.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-witin-isu',
  templateUrl: './within-isu.component.html',
  styleUrls: ['./within-isu.component.scss'],
  providers: [RepeatedMeasure, RepeatedMeasureService]
})
export class WitinIsuComponent {

  private _multipleOutcomes: boolean;
  private _withinISUForm: FormGroup;
  private _formErrors = constants.WITHIN_ISU_ERRORS;
  private _validationMessages = constants.WITHIN_ISU_VALIDATION_MESSAGES;
  private _repeatedMeasures: RepeatedMeasure[] = [];
  private _repeatedMeasure: RepeatedMeasure;
  private _repeatedMeasureSubscription: Subscription;
  private _editing: boolean;

  constructor(private study_service: StudyService,
              private _repeatedMeasureService: RepeatedMeasureService,
              private fb: FormBuilder) {
    this.editing = false;
    this.buildForm();
    this.repeatedMeasureSubscription = this.repeatedMeasureService.repeatedMeasure$.subscribe(
      repeatedMeasure => {
        this.repeatedMeasures.push(repeatedMeasure);
        this.editing=false;
      }
    );
  }

  buildForm(): void {
    this.withinISUForm = this.fb.group({
      singleoutcome: '',
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

  deleteRepeatedMeasure(measure: RepeatedMeasure) {
    let index = -1;
    index = this.repeatedMeasures.indexOf(measure);
    if (index > -1) {
      this.repeatedMeasures.splice(index, 1);
    }
  }

  editRepeatedMeasure(measure: RepeatedMeasure) {
    this.repeatedMeasure = measure;
    this.deleteRepeatedMeasure(measure);
    this.editing = true;
  }

  addRepeatedMeasure() {
    this.repeatedMeasure = new RepeatedMeasure();
    this.editing = true;
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

  get repeatedMeasures(): RepeatedMeasure[] {
    return this._repeatedMeasures;
  }

  set repeatedMeasures(value: RepeatedMeasure[]) {
    this._repeatedMeasures = value;
  }

  get repeatedMeasureService(): RepeatedMeasureService {
    return this._repeatedMeasureService;
  }

  set repeatedMeasureService(value: RepeatedMeasureService) {
    this._repeatedMeasureService = value;
  }

  get repeatedMeasureSubscription(): Subscription {
    return this._repeatedMeasureSubscription;
  }

  set repeatedMeasureSubscription(value: Subscription) {
    this._repeatedMeasureSubscription = value;
  }

  get editing(): boolean {
    return this._editing;
  }

  set editing(value: boolean) {
    this._editing = value;
  }

  get repeatedMeasure(): RepeatedMeasure {
    return this._repeatedMeasure;
  }

  set repeatedMeasure(value: RepeatedMeasure) {
    this._repeatedMeasure = value;
  }
}
