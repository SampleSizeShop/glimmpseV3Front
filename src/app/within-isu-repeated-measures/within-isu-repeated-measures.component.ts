import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {constants} from '../shared/constants';
import {outcomeValidator} from '../within-isu-outcomes/outcome.validator';

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
  private _validationMessages;
  private _formErrors;
  private _included: boolean;
  private _editing: boolean;
  private _types: string[];
  private _step: string;
  private _maxDimensions: number;

  constructor(private _fb: FormBuilder) {

    this.validationMessages = constants.REPEATED_MEASURE_FORM_VALIDATION_MESSAGES;
    this.formErrors = constants.REPEATED_MEASURE_FORM_ERRORS;
    this.max = constants.MAX_REPEATED_MEASURES;
    this.maxDimensions = constants.MAX_REPEATED_MEASURE_DIMENSIONS;
    this.repeatedMeasures = [];
    this.dimensions = [];
    this.included = false;
    this.editing = false;
    this.types = constants.REPEATED_MEASURE_TYPES;
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
    this.repMeasure = new RepeatedMeasure();
    this.step = 'DIMENSIONS';
  }

  dontincludeRepeatedMeasures() {
    this.included = false;
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

  get step(): string {
    return this._step;
  }

  set step(value: string) {
    this._step = value;
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
}
