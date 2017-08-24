import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {constants} from '../shared/constants';
import {outcomeValidator} from '../within-isu-outcomes/outcome.validator';
import {NavigationService} from 'app/shared/navigation.service';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../shared/study.service';

@Component({
  selector: 'app-within-isu-repeated-measures',
  templateUrl: './within-isu-repeated-measures.component.html',
  styleUrls: ['./within-isu-repeated-measures.component.scss']
})
export class WithinIsuRepeatedMeasuresComponent implements OnInit {
  private _dimensionsForm: FormGroup;
  private _repeatedMeasures: RepeatedMeasure[];
  private _repMeasure: RepeatedMeasure;
  private _dimensions: string [];
  private _max: number;
  private _stages;
  private _stage: number;
  private _validationMessages;
  private _formErrors;
  private _included: boolean;
  private _editing: boolean;
  private _types: string[];
  private _maxDimensions: number;

  private _directionCommand: string;
  private _childNavigationMode: boolean;
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
    this.included = false;
    this.editing = false;
    this.types = constants.REPEATED_MEASURE_TYPES;


    this.navigationSubscription = this.navigation_service.navigation$.subscribe(
      direction => {
        this.directionCommand = direction;
        this.internallyNavigate(this.directionCommand);
      }
    );
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.dimensionsForm = this.fb.group({
        dimensions: ['', outcomeValidator(this.dimensions)]
    })
  };

  firstRepeatedMeasure(): boolean {
    return this.repeatedMeasures.length === 0 ? true : false;
  }

  nextRepeatedMeasure(): boolean {
    if (!this.firstRepeatedMeasure() && this.repeatedMeasures.length < this.max ) {
      return true;
    }
    return false;
  }

  firstDimension(): boolean {
    return this.dimensions.length === 0 ? true : false;
  }

  nextDimension(): boolean {
    if (!this.firstDimension() && this.dimensions.length < this.maxDimensions ) {
      return true;
    }
    return false;
  }

  addDimension() {
    if (this.dimensionsForm.status === 'VALID'
        && this.dimensionsForm.value.dimensions
        && this.dimensionsForm.value.dimensions.trim() !== '' ) {
      this.dimensions.push(this.dimensionsForm.value.dimensions.trim());
      this.dimensionsForm.reset();
    }
    if (this.dimensions && this.dimensions.length > 0) {
      this.study_service.updateValid(true);
    }
  }

  removeDimension(value: string) {
    const index = this.dimensions.indexOf(value);
    if (index > -1) {
      this.dimensions.splice(index, 1);
    }
    this.dimensionsForm.reset();
  }

  includeRepeatedMeasures() {
    this.included = true;
    this.editing = true;
    this.navigation_service.updateNavigationMode(true);
    this.navigation_service.updateNextEnabled(true);
    this.study_service.updateValid(false);
    this.repMeasure = new RepeatedMeasure();
    this.stage = this.stage = 0;
  }

  dontincludeRepeatedMeasures() {
    this.navigation_service.updateNextEnabled(false);
    this.navigation_service.updateNavigationMode(false);
    this.included = false;
    this.editing = false;
    this.study_service.updateValid(true);
    this.stage = -1;
  }

  internallyNavigate(direction: string): void {
    console.log(direction);
    let next = this.stage;
    if ( direction === 'BACK' ) {
      next = this.stage - 1;
    }
    if ( direction === 'NEXT' ) {
      next = this.stage + 1;
    }
    if ( next < 0) {
      this.dontincludeRepeatedMeasures();
    }
    if ( next >= Object.keys(this.stages).length ) {
      console.log('ADD REPEATED MEASURE NOW!!!');
    }
    if (this.stages[next]) {
      this.stage = next;
      console.log(this.stage)
    }
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

  get repeatedMeasures(): RepeatedMeasure[] {
    return this._repeatedMeasures;
  }

  set repeatedMeasures(value: RepeatedMeasure[]) {
    this._repeatedMeasures = value;
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

  get childNavigationMode(): boolean {
    return this._childNavigationMode;
  }

  set childNavigationMode(value: boolean) {
    this._childNavigationMode = value;
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
}
