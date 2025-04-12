import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {RepeatedMeasure} from '../../shared/model/RepeatedMeasure';
import {constants} from '../../shared/model/constants';
import {Subscription, Observable} from 'rxjs';
import {StudyService} from '../../shared/services/study.service';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {CorrelationMatrix} from '../../shared/model/CorrelationMatrix';
import {noDuplicatesValidator} from '../../shared/validators/noduplicates.validator';
import {NavigationService} from '../../shared/services/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {fadeTransition} from '../../animations/animations';
import {NGXLogger} from 'ngx-logger';
import {integerValidator} from '../../shared/validators/integer.validator';
import {isNullOrUndefined} from 'util';
import {WithinIsuRepeatedMeasuresValidator} from '../../shared/validators/within-isu-repeated-measures.validator';
import {orderedValidator} from '../../shared/validators/ordered.validator';

@Component({
  selector: 'app-within-isu-repeated-measures',
  templateUrl: './within-isu-repeated-measures.component.html',
  animations: [fadeTransition],
  styleUrls: ['./within-isu-repeated-measures.component.scss']
})
export class WithinIsuRepeatedMeasuresComponent implements OnInit, OnDestroy {
  private _dimensionForm: UntypedFormGroup;
  private _typeForm: UntypedFormGroup;
  private _repeatsForm: UntypedFormGroup;
  private _spacingForm: UntypedFormGroup;
  private _repeatedMeasures: RepeatedMeasure[];
  private _repMeasure: RepeatedMeasure;
  private _spacingControlNames: number[];
  private _max: number;
  private _stages = constants.REPEATED_MEASURE_STAGES;
  private _stage: number;
  private _next = this._stages.INFO;
  private _validationMessages;
  private _formErrors;
  private _types: string[];
  private _type: string;
  private _repeats: number;
  private _spacingValues: string[];
  private _autoFillbool: boolean;
  private _editing = false;
  private _edited_name: string;

  private _repeatedMeasuresSubscription: Subscription;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};

  @ViewChild('canDeactivate', {static: true}) canDeactivateModal;
  private modalReference: any;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: UntypedFormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {

    this._validationMessages = constants.REPEATED_MEASURE_FORM_VALIDATION_MESSAGES;
    this._formErrors = constants.REPEATED_MEASURE_FORM_ERRORS;
    this._max = constants.MAX_REPEATED_MEASURES;
    this._stage = this._stages.INFO;
    this._spacingControlNames = [0, 1];
    this._types = constants.REPEATED_MEASURE_TYPES;
    this._spacingValues = new Array<string>();
    this._autoFillbool = false;

    this._repeatedMeasuresSubscription = this.study_service.withinIsuRepeatedMeasures$.subscribe( repeatedMeasures => {
      this.repeatedMeasures = repeatedMeasures;
    });
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this._isClickNextReference = {value: false};
    this._isClickNextSubscription = this.navigation_service.isClickInternalNext$.subscribe(
      isClickNext => {
        this.isClickNext = isClickNext;
        this._isClickNextReference.value = this.isClickNext;
        if (!isNullOrUndefined(this.dimensionForm)) {
          this.dimensionForm.get('dimension').updateValueAndValidity();
        }
        if (!isNullOrUndefined(this.repeatsForm)) {
          this.repeatsForm.get('repeats').updateValueAndValidity();
        }
      }
    );
  }

  buildForm() {
    this._dimensionForm = this._fb.group({
      dimension: ['', [WithinIsuRepeatedMeasuresValidator(this._isClickNextReference, this._repeatedMeasures)]]
    });
    this._dimensionForm.get('dimension').valueChanges.subscribe(data => {
      if (this.stage === this.stages.DIMENSIONS) {
        this.onValueChangedDimensionForm(data);
        this.resetClickNext(); // Reset clickNext when users reinsert value
      }
    });
    this._typeForm = this._fb.group({
      type: [this._types[0]]
    });
    this._repeatsForm = this._fb.group({
      repeats: [2, [
        minMaxValidator(2, 10),
        integerValidator(),
        WithinIsuRepeatedMeasuresValidator(this._isClickNextReference, this._repeatedMeasures)
      ]]});
    this._repeatsForm.valueChanges.subscribe(data => {
      if (this.stage === this.stages.REPEATS) {
        this.onValueChangedRepeatsForm();
        this.resetClickNext();
      }
    });
    this._spacingForm = this._fb.group({
      spacing: this._fb.array([]),
      first: [1],
      interval: [1]
    });
    this._spacingForm.setValidators([
      noDuplicatesValidator(this._spacingControlNames),
      orderedValidator(this._spacingControlNames, this.isCategorical())
    ]);
    this.updateSpacingFormControls(2, this._spacingValues);
    this._dimensionForm.valueChanges.subscribe(data => this.onValueChangedDimensionForm(data));
    this._spacingForm.valueChanges.subscribe(data => this.onValueChangedSpacingForm(data));
  };

  onValueChangedRepeatsForm(data?: any) {
    if (!this._repeatsForm) {
      return;
    }
    const form = this._repeatsForm;

    this._formErrors['repeatsform'] = '';
    for (const field in form.value) {
      const control = form.get(field);
      if (control && control.dirty && this.isClickNext && !control.valid) {
        const messages = this._validationMessages['repeatsform'];
        for (const key in control.errors ) {
          this._formErrors['repeatsform'] = messages[key];
        }
      }
    }
  }

  onValueChangedSpacingForm(data?: any) {
    if (!this._spacingForm) {
      return;
    }
    const form = this._spacingForm;

    this._formErrors['space'] = '';
    const messages = this._validationMessages['space'];
    for (const field in form.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        for (const key in control.errors ) {
          if (!this._formErrors['space'].includes(messages[key])) {
            this._formErrors['space'] += messages[key];
          }
        }
      }
    }
    if (this._spacingForm.errors) {
      Object.keys(this.spacingForm.errors).forEach(key => {
        this._formErrors['space'] += messages[key];
      });
    }
  }

  onValueChangedDimensionForm(data?: any) {
    if (!this._dimensionForm) {
      return;
    }
    this._formErrors['dimensionunits'] = '';
    const messages = this._validationMessages['dimensionunits'];
    for (const field in this._dimensionForm.controls) {
      const control = this._dimensionForm.get(field);
      if (control && this.isClickNext && !control.valid) {
        for (const key in control.errors ) {
          this._formErrors['dimensionunits'] = messages[key];
        }
      } else if (control && !control.valid) {
        for (const key in control.errors ) {
          if (key !== 'required') {
            this._formErrors['dimensionunits'] = messages[key];
          }
        }
      }
    }
  }

  ngOnInit() {
    this._afterInit = true;
    this.buildForm();
    this.updateSpacingFormControls(2, this._spacingValues);
  }

  ngOnDestroy() {
    this.navigation_service.updateInternalFormSource(false);
    this.study_service.updateWithinIsuRepeatedMeasures(this.repeatedMeasures);
    this._repeatedMeasuresSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this._stage === this._stages.INFO) {
      this.navigation_service.updateValid(true);
      return true;
    } else {
      console.log('cancel');
      this.showModal(this.canDeactivateModal);
      this.study_service.updateDirection('CANCEL');
      return this.navigation_service.navigateAwaySelection$;
    }
  }

  private updateRepeatsForm() {
    if (this._repeats !== this._repeatsForm.value.repeats) {
      this._repeats = this._repeatsForm.value.repeats;
      if (this._repeatsForm.status === 'VALID') {
        this.updateSpacingFormControls(this._repeats, this._spacingValues);
      }
    }
  }

  updateSpacingFormControls(repeats: number, values?: string[] ) {
    if (this._repeatsForm.status === 'VALID') {
      this._spacingControlNames = Array.from(Array(repeats).keys())
      const controlDefs = {};
      let i = 0;
      for (const name of this._spacingControlNames) {
        if (values && values.length === repeats) {
          controlDefs[name] = [values[name], minMaxValidator(0, 100000000000000)];
        } else {
          const j = i + 1;
          controlDefs[name] = [j, minMaxValidator(0, 100000000000000)];
        }
        i = i + 1;
      }

      controlDefs['first'] = this._spacingForm.value.first;
      controlDefs['interval'] = this._spacingForm.value.interval;

      this._spacingForm = this._fb.group(controlDefs);
      this._spacingForm.setValidators([
        noDuplicatesValidator(this._spacingControlNames),
        orderedValidator(this._spacingControlNames, this.isCategorical())
      ]);
      this._spacingForm.valueChanges.subscribe(data => this.onValueChangedSpacingForm(data));
      this._spacingValues = [];
    }
  }

  autoFill() {
    for ( const name of this._spacingControlNames ) {
        const value = this._spacingForm.value.first + name * this._spacingForm.value.interval;
        this._spacingForm.get(name.toString()).setValue(value);
    }
    this.toggleAutoFill();
  }

  addRepeatedMeasure() {
    const names = [];
    this._repeatedMeasures.forEach(m => {
      names.push(m.name);
    });

    let measure = new RepeatedMeasure();
    let index = names.indexOf(this._dimensionForm.value.dimension);
    if (this.editing) {
      index = names.indexOf(this._edited_name);
    }
    if (index !== -1) {
      measure = this.repeatedMeasures[index];
    }
    measure.name = this._dimensionForm.value.dimension;
    measure.noRepeats = this._repeatsForm.value.repeats;
    measure.type = this._typeForm.value.type;
    for (const name of this._spacingControlNames) {
      this._spacingValues.push(this._spacingForm.get(name.toString()).value.toString());
    }
    measure.valueNames = this._spacingValues;
    if (measure.polynomialOrder > measure.maxPolynomialOrder) {
      measure.polynomialOrder = measure.maxPolynomialOrder;
    }
    measure.correlationMatrix = new CorrelationMatrix(measure.valueNames);

    if (index === -1) {
      measure.polynomialOrder = measure.maxPolynomialOrder;
      this.repeatedMeasures.push(measure);
    }

    this._dimensionForm = this._fb.group({
      dimension: ['', [WithinIsuRepeatedMeasuresValidator(this._isClickNextReference, this._repeatedMeasures)]]
    });
    this.resetForms();
    this.buildForm();
    this.setStage(this.stages.INFO);
  }

  editRepeatedMeasure(measure: RepeatedMeasure) {
    this._editing = true;
    this._edited_name = measure.name;
    this._repMeasure = measure;
    this._type = measure.type;
    this._repeats = measure.noRepeats;
    this._spacingValues = measure.valueNames;

    this._dimensionForm = this._fb.group({
      dimension: ['', [WithinIsuRepeatedMeasuresValidator(this._isClickNextReference, this._repeatedMeasures, measure)]]
    });
    this._dimensionForm.get('dimension').valueChanges.subscribe(data => {
      if (this.stage === this.stages.DIMENSIONS) {
        this.onValueChangedDimensionForm(data);
        this.resetClickNext(); // Reset clickNext when users reinsert value
      }
    });
    this._dimensionForm.valueChanges.subscribe(data => this.onValueChangedDimensionForm(data));


    this._dimensionForm.get('dimension').setValue(measure.name);
    this._typeForm.get('type').setValue(measure.type);
    this._repeatsForm.get('repeats').setValue(measure.noRepeats);

    this._repMeasure = measure;
    this.setStage(this._stages.DIMENSIONS);
    this.updateSpacingFormControls(this._repeats, this._spacingValues);
  }

  removeRepeatedMeasure(measure: RepeatedMeasure) {
    const index = this.repeatedMeasures.indexOf(measure);
    if (index > -1) {
      this.repeatedMeasures.splice(index, 1);
    }
  }

  includeRepeatedMeasures(measure?: RepeatedMeasure) {
    this.buildForm();
    if (measure) {
      this._repMeasure = measure;
    } else {
      this._repMeasure = new RepeatedMeasure();
    }
    this.setStage(this._stages.DIMENSIONS);
  }

  getStageStatus(stage: number): string {
    if (this.isDimensions()) {
      return this._dimensionForm.status;
    }
    if (this.isType()) {
      return this._typeForm.status;
    }
    if (this.isRepeats()) {
      return this._repeatsForm.status;
    }
    if (this.isSpacing()) {
      return this._spacingForm.status;
    }
    return 'INVALID';
  }

  setStage(stage: number) {
    this.navigation_service.updateIsClickInternalNext(false);
    if (stage === this._stages.INFO) {
      this._editing = false;
      this.navigation_service.updateInternalFormSource(false);
      this.navigation_service.updateValid(true);
      this._dimensionForm = this._fb.group({
        dimension: ['', [WithinIsuRepeatedMeasuresValidator(this._isClickNextReference, this._repeatedMeasures)]]
      });
    } else {
      this.navigation_service.updateInternalFormSource(true);
      this.navigation_service.updateValid(false);
    }
    if (stage === this.stages.SPACING) {
      this.updateRepeatsForm();
    }
    if (stage === this.stages.TYPE && this.stage === this.stages.DIMENSIONS) {
      this.navigation_service.updateIsClickInternalNext(true);
      if (!this.dimensionForm.valid) {
        stage = this.stages.DIMENSIONS;
      }
    }
    if (stage === this.stages.SPACING && this.stage === this.stages.REPEATS) {
      this.navigation_service.updateIsClickInternalNext(true);
      if (!this.repeatsForm.valid) {
        stage = this.stages.REPEATS;
      }
    }

    this._next = stage;
    this._stage = -1;
  }

  resetForms() {
    this.buildForm();

    this._type = this._types[0];
    this._repeats = 2;
    this._spacingValues = [];
    this._repMeasure = new RepeatedMeasure();
    this.updateSpacingFormControls(2, this._spacingValues);

    this.setStage(this._stages.INFO);
  }

  hasRepeatedMeasures(): boolean {
    return this.repeatedMeasures.length > 0;
  }

  nextRepeatedMeasure(): boolean {
    if (this.hasRepeatedMeasures() && this.repeatedMeasures.length < this._max ) {
      return true;
    }
    return false;
  }

  get twoOrMore(): boolean {
    if (this.hasRepeatedMeasures() && this.repeatedMeasures.length > 1) {
      return true;
    }
    return false;
  }

  get firstMeasureName() {
    if (this.twoOrMore) {
      return this.repeatedMeasures[0].name;
    } else {
      return 'repeated measure one'
    }
  }

  get secondMeasureName() {
    if (this.twoOrMore) {
      return this.repeatedMeasures[1].name;
    } else {
      return 'repeated measure two'
    }
  }

  selectType(type: string) {
    this._typeForm.setValue({type: type});
    // if any of  the spacing values are non numeric and type is not Categorical, reset the spacing form to default.
    if (!this.typeSelected('Categorical')) {
      this._formErrors['space'] = '';
      this._spacingControlNames.forEach(name => {
        if (isNullOrUndefined(this.spacingForm.controls[name]) ||
          isNaN(Number(this.spacingForm.controls[name].value.toString()))) {
          this._spacingValues = [];
          this.updateSpacingFormControls(this._repeats, this._spacingValues);
        }
      });
    }
    this._spacingForm.setValidators([
      noDuplicatesValidator(this._spacingControlNames),
      orderedValidator(this._spacingControlNames, this.isCategorical())
    ]);
    this._typeForm.updateValueAndValidity();
  }

  typeSelected(type: string) {
    return this._typeForm.value.type === type;
  }

  startTransition(event) {
  }

  doneTransition(event) {
    this._stage = this._next;
  }

  showModal(content) {
    this.modalReference = this.modalService.open(content)
    this.modalReference.result.then(
      (closeResult) => {
        console.log('modal closed : ', closeResult);
      }, (dismissReason) => {
        if (dismissReason === ModalDismissReasons.ESC) {
          console.log('modal dismissed when used pressed ESC button');
        } else if (dismissReason === ModalDismissReasons.BACKDROP_CLICK) {
          console.log('modal dismissed when used pressed backdrop');
        } else {
          console.log(dismissReason);
        }
      })
  }

  modalChoice(choice: boolean) {
    this.modalReference.close();
    if (choice) {
      this.navigation_service.updateValid(true);
    }
    this.navigation_service.navigateAwaySelection$.next(choice);
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }

  dismissHelp() {
    this.helpTextModalReference.close();
  }

  showHelpText(content) {
    this.modalService.dismissAll();
    this.helpTextModalReference = this.modalService.open(content);
    this.helpTextModalReference.result.then(
      (closeResult) => {
        this.log.debug('modal closed : ' + closeResult);
      }, (dismissReason) => {
        if (dismissReason === ModalDismissReasons.ESC) {
          this.log.debug('modal dismissed when used pressed ESC button');
        } else if (dismissReason === ModalDismissReasons.BACKDROP_CLICK) {
          this.log.debug('modal dismissed when used pressed backdrop');
        } else {
          this.log.debug(dismissReason);
        }
      });
  }

  resetClickNext() {
    this.isClickNext = false;
  }

  get stageName() {
    return Object.keys(this._stages)[this._stage];
  }

  get repeatedMeasures(): RepeatedMeasure[] {
    return this._repeatedMeasures;
  }

  set repeatedMeasures(value: RepeatedMeasure[]) {
    this._repeatedMeasures = value;
  }

  get types(): string[] {
    return this._types;
  }

  get formErrors() {
    return this._formErrors;
  }

  get dimensionForm(): UntypedFormGroup {
    return this._dimensionForm;
  }

  get max(): number {
    return this._max;
  }

  get typeForm(): UntypedFormGroup {
    return this._typeForm;
  }

  get repeatsForm(): UntypedFormGroup {
    return this._repeatsForm;
  }

  get spacingForm(): UntypedFormGroup {
    return this._spacingForm;
  }

  get spacingControlNames(): number[] {
    return this._spacingControlNames;
  }

  get spacingValues(): string[] {
    return this._spacingValues;
  }

  get stage(): number {
    return this._stage;
  }

  set stage(value: number) {
    this._stage = value;
  }

  get stages(): { INFO: number; DIMENSIONS: number; TYPE: number; REPEATS: number; SPACING: number } {
    return this._stages;
  }

  get isClickNext(): boolean {
    return this._isClickNext;
  }

  set isClickNext(value: boolean) {
    this._isClickNext = value;
  }

  toggleAutoFill() {
    this._autoFillbool = !this._autoFillbool;
  }

  selectAutoFill() {
    this._autoFillbool = true;
  }

  selectManual() {
    this._autoFillbool = false;
  }

  isAutoFill() {
    return this._autoFillbool;
  }

  isInfo() {
    if (this._stage === this._stages.INFO) {
      return true;
    } else {
      return false
    }
  }

  isDimensions() {
    if (this._stage === this._stages.DIMENSIONS) {
      return true;
    } else {
      return false
    }
  }

  isType() {
    if (this._stage === this._stages.TYPE) {
      return true;
    } else {
      return false
    }
  }

  isRepeats() {
    if (this._stage === this._stages.REPEATS) {
      return true;
    } else {
      return false
    }
  }

  isSpacing() {
    if (this._stage === this._stages.SPACING) {
      return true;
    } else {
      return false
    }
  }

  isCategorical() {
    if (this._typeForm.value.type === ('Categorical')) {
      return true;
    } else {
      return false;
    }
  }

  spacingInputType() {
    if (this.isCategorical()) {
      return 'string';
    } else {
      return 'number';
    }
  }

  get editing(): boolean {
    return this._editing;
  }
}
