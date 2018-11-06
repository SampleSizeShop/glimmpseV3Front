import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RepeatedMeasure} from '../../shared/RepeatedMeasure';
import {constants} from '../../shared/constants';
import {Subscription} from 'rxjs';
import {StudyService} from '../study.service';
import {minMaxValidator} from '../../shared/minmax.validator';
import {CorrelationMatrix} from '../../shared/CorrelationMatrix';
import {noDuplicatesValidator} from '../../shared/noduplicates.validator';
import {NavigationService} from '../../shared/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {fadeTransition} from '../../animations';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-within-isu-repeated-measures',
  templateUrl: './within-isu-repeated-measures.component.html',
  animations: [fadeTransition],
  styleUrls: ['./within-isu-repeated-measures.component.scss']
})
export class WithinIsuRepeatedMeasuresComponent implements OnInit, OnDestroy {
  private _dimensionForm: FormGroup;
  private _typeForm: FormGroup;
  private _repeatsForm: FormGroup;
  private _spacingForm: FormGroup;
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

  private _repeatedMeasuresSubscription: Subscription;

  @ViewChild('canDeactivate') canDeactivateModal;
  private modalReference: any;

  constructor(private _fb: FormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal) {

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
  }

  buildForm() {
    this._dimensionForm = this._fb.group({
      dimension: [''],
      units: ['']
    });
    this._dimensionForm.valueChanges.subscribe(data => this.onValueChangedDimensionForm(data));
    this._typeForm = this._fb.group({
      type: [this._types[0]]
    });
    this._repeatsForm = this._fb.group({
      repeats: [2, minMaxValidator(2, 10)]
    });
    this._repeatsForm.valueChanges.subscribe(data => this.onValueChangedRepeatsForm(data));
    this._spacingForm = this._fb.group({
      spacing: this._fb.array([]),
      first: [0],
      interval: [0]
    }, { validator: noDuplicatesValidator(this._spacingControlNames) });
    this._spacingForm.valueChanges.subscribe(data => this.onValueChangedSpacingForm(data));
  };

  onValueChangedDimensionForm(data?: any) {
    if (!this._dimensionForm) {
      return;
    }
    const form = this._dimensionForm;

    this._formErrors['dimensionunits'] = '';
    for (const field in this._dimensionForm.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this._validationMessages['dimensionunits'];
        for (const key in control.errors ) {
          this._formErrors['dimensionunits'] = messages[key];
        }
      }
    }
  }

  onValueChangedRepeatsForm(data?: any) {
    if (!this._repeatsForm) {
      return;
    }
    const form = this._repeatsForm;

    this._formErrors['repeatsform'] = '';
    for (const field in form.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
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
      this.formErrors['space'] += messages['duplicates'];
    }
  }

  ngOnInit() {
    this.buildForm();
    this.updateSpacingFormControls(2, this._spacingValues);
  }

  ngOnDestroy() {
    this.study_service.updateWithinIsuRepeatedMeasures(this.repeatedMeasures);
    this._repeatedMeasuresSubscription.unsubscribe();
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
      for (const name of this._spacingControlNames) {
        if (values && values.length === repeats) {
          controlDefs[name] = [values[name], minMaxValidator(0, 100000000000000)];
        } else {
          controlDefs[name] = [0, minMaxValidator(0, 100000000000000)];
        }
      }

      controlDefs['first'] = this._spacingForm.value.first;
      controlDefs['interval'] = this._spacingForm.value.interval;

      this._spacingForm = this._fb.group(controlDefs, {validator: noDuplicatesValidator(this._spacingControlNames)});
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
    const measure = new RepeatedMeasure();
    measure.name = this._dimensionForm.value.dimension;
    measure.units = this._dimensionForm.value.units;
    measure.noRepeats = this._repeatsForm.value.repeats;
    measure.type = this._typeForm.value.type;
    for (const name of this._spacingControlNames) {
      this._spacingValues.push(this._spacingForm.get(name.toString()).value.toString());
    }
    measure.valueNames = this._spacingValues;
    measure.correlationMatrix = new CorrelationMatrix(measure.valueNames);

    this.repeatedMeasures.push(measure);
    this.resetForms();
    this.setStage(this.stages.INFO);
  }

  editRepeatedMeasure(measure: RepeatedMeasure) {
    this.removeRepeatedMeasure(measure);

    this._repMeasure = measure;
    this._type = measure.type;
    this._repeats = measure.noRepeats;
    this._spacingValues = measure.valueNames;

    this._dimensionForm.get('dimension').setValue(measure.name);
    this._typeForm.get('type').setValue(measure.type);
    this._repeatsForm.get('repeats').setValue(measure.noRepeats);

    this.includeRepeatedMeasures(measure);
    this.updateSpacingFormControls(this._repeats, this._spacingValues);
  }

  removeRepeatedMeasure(measure: RepeatedMeasure) {
    const index = this.repeatedMeasures.indexOf(measure);
    if (index > -1) {
      this.repeatedMeasures.splice(index, 1);
    }
  }

  includeRepeatedMeasures(measure?: RepeatedMeasure) {
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
    if (stage === this._stages.INFO) {
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateValid(false);
    }
    if (stage === this.stages.SPACING) {
      this.updateRepeatsForm();
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

  selectType(type: string) {
    this._typeForm.setValue({type: type})
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

  get dimensionForm(): FormGroup {
    return this._dimensionForm;
  }

  get max(): number {
    return this._max;
  }

  get typeForm(): FormGroup {
    return this._typeForm;
  }

  get repeatsForm(): FormGroup {
    return this._repeatsForm;
  }

  get spacingForm(): FormGroup {
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

  toggleAutoFill() {
    this._autoFillbool = !this._autoFillbool;
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
}
