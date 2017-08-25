import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {constants} from '../shared/constants';
import {outcomeValidator} from '../within-isu-outcomes/outcome.validator';
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
  private _dimensionsForm: FormGroup;
  private _typeForm: FormGroup;
  private _repeatsForm: FormGroup;
  private _spacingForm: FormGroup;
  private _repeatedMeasures: RepeatedMeasure[];
  private _repMeasure: RepeatedMeasure;
  private _dimensions: string [];
  private _spacingControlNames: number[];
  private _max: number;
  private _stages;
  private _stage: number;
  private _validationMessages;
  private _formErrors;
  private _included: boolean;
  private _editing: boolean;
  private _types: string[];
  private _type: string;
  private _repeats: number;
  private _spacingValues: number[];
  private _maxDimensions: number;

  private _directionCommand: string;
  private _navigationSubscription: Subscription;

  constructor(private _fb: FormBuilder, private navigation_service: NavigationService, private study_service: StudyService) {

    this.validationMessages = constants.REPEATED_MEASURE_FORM_VALIDATION_MESSAGES;
    this.formErrors = constants.REPEATED_MEASURE_FORM_ERRORS;
    this.max = constants.MAX_REPEATED_MEASURES;
    this.maxDimensions = constants.MAX_REPEATED_MEASURE_DIMENSIONS;
    this.stages = constants.REPEATED_MEASURE_STAGES;
    this.stage = -1;
    this.repeatedMeasures = [];
    this.dimensions = [];
    this.spacingControlNames = [0, 1];
    this.included = false;
    this.editing = false;
    this.types = constants.REPEATED_MEASURE_TYPES;
    this.spacingValues = [];


    this.navigationSubscription = this.navigation_service.navigation$.subscribe(
      direction => {
        this.directionCommand = direction;
        this.internallyNavigate(this.directionCommand);
      }
    );
  }

  buildForm() {
    this.dimensionsForm = this.fb.group({
      dimensions: ['', outcomeValidator(this.dimensions)]
    });
    this.typeForm = this.fb.group({
      type: [this.types[0]]
    });
    this.repeatsForm = this.fb.group({
      repeats: [2, minMaxValidator(2, 10)]
    });
    this.spacingForm = this.fb.group({
      spacing: this.fb.array([])
    })
  };

  ngOnInit() {
    this.buildForm();
    this.updateSpacingFormControls(2, this.spacingValues);
  }

  ngDoCheck() {
    if (this.stage === 0) {
      this.dimensionsForm.valueChanges.subscribe(status => {
        if(this.hasDimensions() && this.dimensionsForm.status !== 'INVALID') {
          this.updateStudyFormStatus('VALID');
        } else {
          this.updateStudyFormStatus('INVALID');
        }
      } );
    }
    if (this.stage === 1) {
      this.repeatsForm.valueChanges.subscribe( status => {
        this.repeats = this.repeatsForm.value.repeats;
        this.updateStudyFormStatus(this.repeatsForm.status);
        this.updateSpacingFormControls(this.repeats, this.spacingValues);
      } );
    }
    if (this.stage === 2) {
      this.updateStudyFormStatus(this.repeatsForm.status);
      if (this.repeats !== this.repeatsForm.value.repeats) {
        this.repeats = this.repeatsForm.value.repeats;
        if (this.repeatsForm.status === 'VALID') {
          this.updateSpacingFormControls(this.repeats, this.spacingValues);
        }
      }
    }
    if (this.stage === 3) {
      this.spacingForm.valueChanges.subscribe( spacingValues => {
        this.updateStudyFormStatus(this.spacingForm.status);
        if (this.spacingForm.status === 'VALID') {
          this.spacingValues = [];
          for (const val of this.spacingControlNames) {
            this.spacingValues.push(spacingValues[val]);
          }
        }
      });
    }
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  updateSpacingFormControls(repeats: number, values?: number[] ) {
    if (this.repeatsForm.status === 'VALID') {
      this.spacingControlNames = Array.from(Array(repeats).keys())
      const controlDefs = {};
      for (const name of this.spacingControlNames) {
        if (values && values.length === repeats) {
          controlDefs[name] = [values[name], minMaxValidator(0.000000000000001, 100000000000000)];
        } else {
          controlDefs[name] = [0, minMaxValidator(0.000000000000001, 100000000000000)];
        }
      }
      this.spacingForm = this._fb.group(controlDefs);
      this.spacingValues = [];
    }
  }

  addRepeatedMeasure() {
    const measure = new RepeatedMeasure();
    measure.dimensions = this.dimensions;
    measure.noRepeats = this.repeatsForm.value.repeats;
    measure.type = this.typeForm.value.type;
    measure.spacing = this.spacingValues;

    this.repeatedMeasures.push(measure);
  }

  editRepeatedMeasure(measure: RepeatedMeasure) {
    this.removeRepeatedMeasure(measure);

    this.repMeasure = measure;
    this.dimensions = measure.dimensions;
    this.type = measure.type;
    this.repeats = measure.noRepeats;
    this.spacingValues = measure.spacing;

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

  addDimension() {
    if (this.dimensionsForm.status === 'VALID'
        && this.dimensionsForm.value.dimensions
        && this.dimensionsForm.value.dimensions.trim() !== '' ) {
      this.dimensions.push(this.dimensionsForm.value.dimensions.trim());
      this.dimensionsForm.reset();
    }
    if (this.hasDimensions()) {
      this.study_service.updateValid(true);
    }
  }

  removeDimension(value: string) {
    const index = this.dimensions.indexOf(value);
    if (index > -1) {
      this.dimensions.splice(index, 1);
    }
    if ( !this.hasDimensions() ) {
      this.study_service.updateValid( false );
    }
    this.dimensionsForm.reset();
  }

  includeRepeatedMeasures(measure?: RepeatedMeasure) {
    this.included = true;
    this.editing = true;
    this.navigation_service.updateNavigationMode(true);
    this.navigation_service.updateNextEnabled(true);
    this.study_service.updateValid(false);
    if (measure) {
      this.repMeasure = measure;
    } else {
      this.repMeasure = new RepeatedMeasure();
    }
    this.stage = this.stage = 0;
  }

  dontincludeRepeatedMeasures() {
    this.navigation_service.updateNavigationMode(false);
    this.included = false;
    this.editing = false;
    this.study_service.updateValid(true);
    this.stage = -1;
  }

  getStageStatus(stage: number): string {
    if (stage === 0) {
      return this.dimensionsForm.status;
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
      this.resetForms();
      this.dontincludeRepeatedMeasures();
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
    this.updateStudyFormStatus(this.getStageStatus(this.stage));
  }

  updateStudyFormStatus(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.study_service.updateValid(valid);
  }

  resetForms() {
    this.buildForm();

    this.dimensions = [];
    this.type = this.types[0];
    this.repeats = 2;
    this.spacingValues = [];
    this.repMeasure = new RepeatedMeasure();

    this.stage = -1;
    this.editing = false;
    this.navigation_service.updateNavigationMode(false);
  }

  hasDimensions(): boolean {
    return this.dimensions && this.dimensions.length > 0;
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

  nextDimension(): boolean {
    if (this.hasDimensions() && this.dimensions.length < this.maxDimensions ) {
      return true;
    }
    return false;
  }

  get stageName() {
    return this.stages[this.stage]
  }

  get dimensionsForm(): FormGroup {
    return this._dimensionsForm;
  }

  set dimensionsForm(value: FormGroup) {
    this._dimensionsForm = value;
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

  get included(): boolean {
    return this._included;
  }

  set included(value: boolean) {
    this._included = value;
  }

  get types(): string[] {
    return this._types;
  }

  set types(value: string[]) {
    this._types = value;
  }

  get maxDimensions(): number {
    return this._maxDimensions;
  }

  set maxDimensions(value: number) {
    this._maxDimensions = value;
  }

  get repMeasure(): RepeatedMeasure {
    return this._repMeasure;
  }

  set repMeasure(value: RepeatedMeasure) {
    this._repMeasure = value;
  }

  get dimensions(): string[] {
    return this._dimensions;
  }

  set dimensions(value: string[]) {
    this._dimensions = value;
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

  get spacingValues(): number[] {
    return this._spacingValues;
  }

  set spacingValues(value: number[]) {
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
}
