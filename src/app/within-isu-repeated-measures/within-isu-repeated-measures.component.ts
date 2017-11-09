import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {constants} from '../shared/constants';
import {NavigationService} from 'app/shared/navigation.service';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../shared/study.service';
import {minMaxValidator} from '../shared/minmax.validator';

@Component({
  selector: 'app-within-isu-repeated-measures',
  templateUrl: './within-isu-repeated-measures.component.html',
  styleUrls: ['./within-isu-repeated-measures.component.scss']
})
export class WithinIsuRepeatedMeasuresComponent implements OnInit, OnDestroy, DoCheck {
  private _dimensionForm: FormGroup;
  private _typeForm: FormGroup;
  private _repeatsForm: FormGroup;
  private _spacingForm: FormGroup;
  private _repeatedMeasures: RepeatedMeasure[];
  private _repMeasure: RepeatedMeasure;
  private _spacingControlNames: number[];
  private _max: number;
  private _stages;
  private _stage: number;
  private _validationMessages;
  private _formErrors;
  private _editing: boolean;
  private _types: string[];
  private _type: string;
  private _repeats: number;
  private _spacingValues: string[];

  private _directionCommand: string;
  private _navigationSubscription: Subscription;
  private _repeatedMeasuresSubscription: Subscription;

  constructor(private _fb: FormBuilder, private navigation_service: NavigationService, private study_service: StudyService) {

    this.validationMessages = constants.REPEATED_MEASURE_FORM_VALIDATION_MESSAGES;
    this.formErrors = constants.REPEATED_MEASURE_FORM_ERRORS;
    this.max = constants.MAX_REPEATED_MEASURES;
    this.stages = constants.REPEATED_MEASURE_STAGES;
    this.stage = -1;
    this.spacingControlNames = [0, 1];
    this.editing = false;
    this.types = constants.REPEATED_MEASURE_TYPES;
    this.spacingValues = new Array<string>();

    this.navigationSubscription = this.navigation_service.navigation$.subscribe(
      direction => {
        this.directionCommand = direction;
        this.internallyNavigate(this.directionCommand);
      }
    );

    this.repeatedMeasuresSubscription = this.study_service.withinIsuRepeatedMeasures$.subscribe( repeatedMeasures => {
      this.repeatedMeasures = repeatedMeasures;
    });
  }

  buildForm() {
    this.dimensionForm = this.fb.group({
      dimension: [''],
      units: ['']
    });
    this.typeForm = this.fb.group({
      type: [this.types[0]]
    });
    this.repeatsForm = this.fb.group({
      repeats: [2, minMaxValidator(2, 10)]
    });
    this.spacingForm = this.fb.group({
      spacing: this.fb.array([]),
      first: [0],
      interval: [0]
    })
  };

  ngOnInit() {
    this.buildForm();
    this.updateSpacingFormControls(2, this.spacingValues);
  }

  ngDoCheck() {
    this.updateFormStatus();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    this.repeatedMeasuresSubscription.unsubscribe();
  }

  private updateFormStatus() {
    if (this.stage === 0) {
      if (this.dimensionForm.status !== 'INVALID') {
        this.setNextEnabled('VALID');
      } else {
        this.setNextEnabled('INVALID');
      }
    }
    if (this.stage === 1) {
      this.repeats = this.repeatsForm.value.repeats;
      this.setNextEnabled(this.repeatsForm.status);
    }
    if (this.stage === 2) {
      this.setNextEnabled(this.repeatsForm.status);
      this.updateRepeatsForm();
    }
    if (this.stage === 3) {
      this.setNextEnabled(this.spacingForm.status);
    }
    this.study_service.updateWithinIsuRepeatedMeasures(this.repeatedMeasures);
  }

  private updateRepeatsForm() {
    if (this.repeats !== this.repeatsForm.value.repeats) {
      this.repeats = this.repeatsForm.value.repeats;
      if (this.repeatsForm.status === 'VALID') {
        this.updateSpacingFormControls(this.repeats, this.spacingValues);
      }
    }
  }

  updateSpacingFormControls(repeats: number, values?: string[] ) {
    if (this.repeatsForm.status === 'VALID') {
      this.spacingControlNames = Array.from(Array(repeats).keys())
      const controlDefs = {};
      for (const name of this.spacingControlNames) {
        if (values && values.length === repeats) {
          controlDefs[name] = [values[name], minMaxValidator(0, 100000000000000)];
        } else {
          controlDefs[name] = [0, minMaxValidator(0, 100000000000000)];
        }
      }

      controlDefs['first'] = this.spacingForm.value.first;
      controlDefs['interval'] = this.spacingForm.value.interval;

      this.spacingForm = this._fb.group(controlDefs);
      this.spacingValues = [];
    }
  }

  autoFill() {
    for ( const name of this.spacingControlNames ) {
        const value = this.spacingForm.value.first + name * this.spacingForm.value.interval;
        this.spacingForm.get(name.toString()).setValue(value);
    }
  }

  addRepeatedMeasure() {
    const measure = new RepeatedMeasure();
    measure.name = this.dimensionForm.value.dimension;
    measure.units = this.dimensionForm.value.units;
    measure.noRepeats = this.repeatsForm.value.repeats;
    measure.type = this.typeForm.value.type;
    for (const name of this.spacingControlNames) {
      this.spacingValues.push(this.spacingForm.get(name.toString()).value);
    }
    measure.valueNames = this.spacingValues;

    this.repeatedMeasures.push(measure);
  }

  editRepeatedMeasure(measure: RepeatedMeasure) {
    this.removeRepeatedMeasure(measure);

    this.repMeasure = measure;
    this.type = measure.type;
    this.repeats = measure.noRepeats;
    this.spacingValues = measure.valueNames;

    this.dimensionForm.get('dimension').setValue(measure.name);
    this.typeForm.get('type').setValue(measure.type);
    this.repeatsForm.get('repeats').setValue(measure.noRepeats);

    this.includeRepeatedMeasures(measure);
    this.updateSpacingFormControls(this.repeats, this.spacingValues);
  }

  removeRepeatedMeasure(measure: RepeatedMeasure) {
    const index = this.repeatedMeasures.indexOf(measure);
    if (index > -1) {
      this.repeatedMeasures.splice(index, 1);
    }
    if ( !this.hasRepeatedMeasures() ) {
      this.dontincludeRepeatedMeasures();
    }
  }

  includeRepeatedMeasures(measure?: RepeatedMeasure) {
    this.editing = true;
    this.navigation_service.updateNavigationMode(true);
    this.navigation_service.updateNextEnabled(true);
    this.navigation_service.updateValid(false);
    if (measure) {
      this.repMeasure = measure;
    } else {
      this.repMeasure = new RepeatedMeasure();
    }
    this.stage = 0;
  }

  dontincludeRepeatedMeasures() {
    this.navigation_service.updateNavigationMode(false);
    this.editing = false;
    this.navigation_service.updateValid(true);
    this.stage = -1;
  }

  getStageStatus(stage: number): string {
    if (stage === 0) {
      return this.dimensionForm.status;
    }
    if ( stage === 1) {
      return this.typeForm.status;
    }
    if (stage === 2 ) {
      return this.repeatsForm.status
    }
    if (stage === 3 ) {
      return this.spacingForm.status
    }
    return 'INVALID';
  }

  internallyNavigate(direction: string): void {
    let next = this.stage;
    if ( direction === 'BACK' ) {
      next = this.stage - 1;
    }
    if ( direction === 'NEXT' ) {
      next = this.stage + 1;
    }
    if ( next < 0) {
      this.dontincludeRepeatedMeasures();
      this.resetForms();
    }
    if ( next >= Object.keys(this.stages).length ) {
      this.addRepeatedMeasure();
      this.resetForms();
    }
    if (this.stages[next]) {
      this.setStage(next);
    }
  }

  setStage(next: number) {
    this.stage = next;
    this.setNextEnabled(this.getStageStatus(this.stage));
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
  }

  resetForms() {
    this.buildForm();

    this.type = this.types[0];
    this.repeats = 2;
    this.spacingValues = [];
    this.repMeasure = new RepeatedMeasure();
    this.updateSpacingFormControls(2, this.spacingValues);

    this.stage = -1;
    this.editing = false;
    this.navigation_service.updateNavigationMode(false);
  }

  hasRepeatedMeasures(): boolean {
    return this.repeatedMeasures.length > 0;
  }

  nextRepeatedMeasure(): boolean {
    if (this.hasRepeatedMeasures() && this.repeatedMeasures.length < this.max ) {
      return true;
    }
    return false;
  }

  get stageName() {
    return this.stages[this.stage]
  }

  get dimensionForm(): FormGroup {
    return this._dimensionForm;
  }

  set dimensionForm(value: FormGroup) {
    this._dimensionForm = value;
  }

  get typeForm(): FormGroup {
    return this._typeForm;
  }

  set typeForm(value: FormGroup) {
    this._typeForm = value;
  }

  get repeatsForm(): FormGroup {
    return this._repeatsForm;
  }

  set repeatsForm(value: FormGroup) {
    this._repeatsForm = value;
  }

  get repeatedMeasures(): RepeatedMeasure[] {
    return this._repeatedMeasures;
  }

  set repeatedMeasures(value: RepeatedMeasure[]) {
    this._repeatedMeasures = value;
  }

  get spacingForm(): FormGroup {
    return this._spacingForm;
  }

  set spacingForm(value: FormGroup) {
    this._spacingForm = value;
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
  }

  get validationMessages() {
    return this._validationMessages;
  }

  set validationMessages(value) {
    this._validationMessages = value;
  }

  get formErrors() {
    return this._formErrors;
  }

  set formErrors(value) {
    this._formErrors = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get types(): string[] {
    return this._types;
  }

  set types(value: string[]) {
    this._types = value;
  }

  get repMeasure(): RepeatedMeasure {
    return this._repMeasure;
  }

  set repMeasure(value: RepeatedMeasure) {
    this._repMeasure = value;
  }

  get editing(): boolean {
    return this._editing;
  }

  set editing(value: boolean) {
    this._editing = value;
  }

  get navigationSubscription(): Subscription {
    return this._navigationSubscription;
  }

  set navigationSubscription(value: Subscription) {
    this._navigationSubscription = value;
  }

  get directionCommand(): string {
    return this._directionCommand;
  }

  set directionCommand(value: string) {
    this._directionCommand = value;
  }

  get stages() {
    return this._stages;
  }

  set stages(value) {
    this._stages = value;
  }

  get stage(): number {
    return this._stage;
  }

  set stage(value: number) {
    this._stage = value;
  }

  get spacingControlNames(): number[] {
    return this._spacingControlNames;
  }

  set spacingControlNames(value: number[]) {
    this._spacingControlNames = value;
  }

  get spacingValues(): string[] {
    return this._spacingValues;
  }

  set spacingValues(value: string[]) {
    this._spacingValues = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get repeats(): number {
    return this._repeats;
  }

  set repeats(value: number) {
    this._repeats = value;
  }

  get repeatedMeasuresSubscription(): Subscription {
    return this._repeatedMeasuresSubscription;
  }

  set repeatedMeasuresSubscription(value: Subscription) {
    this._repeatedMeasuresSubscription = value;
  }
}
