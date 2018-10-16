import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {StudyService} from '../study.service';
import {Predictor} from '../../shared/Predictor';
import {constants} from '../../shared/constants';
import {predictorValidator} from './predictor.validator';
import {groupValidator} from './group.validator';
import {slideInRight, slideInLeft, slideOutRight, slideOutLeft, fadeOut, fadeIn} from 'ng-animate';
import {trigger, transition, useAnimation, query, style, stagger, sequence} from '@angular/animations';

@Component({
  selector: 'app-between-isu',
  templateUrl: './between-isu-predictors.component.html',
  animations: [
    trigger('fade', [
      transition('* => *', [
        query(':enter',
          useAnimation(fadeIn, {
            params: { timing: 0.2}
          }), {optional: true}
        ),
        query(':leave',
            useAnimation(fadeOut, {
              params: { timing: 0.2}
            }), {optional: true})
        ]
      )
    ])
  ],
  styleUrls: ['./between-isu-predictors.component.css']
})
export class BetweenIsuPredictorsComponent implements OnInit, DoCheck, OnDestroy {
  private _predictorForm: FormGroup;
  private _typeForm: FormGroup;
  private _groupsForm: FormGroup;
  private _groups: string[];
  private _maxGroups: number;
  private _maxPredictors: number;
  private _betweenIsuPredictors: Array<Predictor>;
  private _validationMessages;
  private _formErrors;

  private _editing: boolean;

  private _stages;
  private _stage: number;
  private _next: number;

  private _betweenIsuPredictorsSubscription: Subscription;

  constructor(private _fb: FormBuilder,
              private _study_service: StudyService) {
    this._next = 0;
    this._stages = constants.BETWEEN_ISU_STAGES;
    this.stage = this.stages.INFO;

    this.validationMessages = constants.BETWEEN_ISU_PREDICTORS_VALIDATION_MESSAGES;
    this.formErrors = constants.BETWEEN_ISU_PREDICTORS_ERRORS;
    this.groups = [];
    this.maxGroups = constants.MAX_GROUPS;
    this.maxPredictors = constants.MAX_PREDICTORS;

    this.betweenIsuPredictorsSubscription = this.study_service.betweenIsuPredictors$.subscribe(betweenIsuFactors => {
      this.betweenIsuPredictors = betweenIsuFactors;
    });
  }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    this.updateFormStatus();
  }

  ngOnDestroy() {
    this.betweenIsuPredictorsSubscription.unsubscribe();
  }

  buildForm() {
    this.predictorForm = this.fb.group({
      predictorName: ['', predictorValidator(this.betweenIsuPredictors)]
    });
    this.typeForm = this.fb.group({
      predictorType: ['']
    });
    this.predictorForm.valueChanges.subscribe(data => this.emptyPredictorFormErrMsg());
    this.groupsForm = this.fb.group({
      group: ['', groupValidator(this.groups)]
    });
    this.groupsForm.valueChanges.subscribe(data => this.emptyGroupsFormErrMsg());
  }

  private updateFormStatus() {
    if (this.stage === 0) {
    }
    if (this.stage === 1) {
      if (this.groups && this.groups.length >= 2) {
        this.formErrors.groupsformtwogroups = '';
      }
    }
    this.study_service.updateBetweenIsuPredictors(this.betweenIsuPredictors);
  }
  onAddedPredictorForm(data?: any) {
    if (!this.predictorForm) {
      return;
    }
    const form = this.predictorForm;

    this.formErrors['predictorform'] = '';
    const messages = this.validationMessages['predictorform'];
    for (const field in form.value) {
      const control = form.get(field);
      if (control && !control.valid) {
        for (const key in control.errors ) {
          this.formErrors['predictorform'] += messages[key] + ' ';
        }
      }
    }
  }
  emptyPredictorFormErrMsg() {
    this.formErrors['predictorform'] = '';
  }
  onAddedGroupsForm(data?: any) {
    if (!this.groupsForm) {
      return;
    }
    const form = this.groupsForm;

    this.formErrors['groupsformduplicated'] = '';
    const messages = this.validationMessages['groupsformduplicated'];
    for (const field in form.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        for (const key in control.errors ) {
          this.formErrors['groupsformduplicated'] = messages[key];
        }
      }
    }
  }

  addName() {
    this._next = this.stages.TYPE
    this.stage = -1;
  }

  emptyGroupsFormErrMsg() {
    this.formErrors['groupsformduplicated'] = '';
  }
  firstGroup(): boolean {
    return this.groups.length === 0 ? true : false;
  }

  nextGroup(): boolean {
    if (!this.firstGroup() && this.groups.length < this.maxGroups ) {
      return true;
    }
    return false;
  }

  addGroup() {
    this.onAddedGroupsForm();
    if (this.groupsForm.status === 'VALID' && this.groupsForm.value.group && this.groupsForm.value.group.trim() !== '' ) {
      this.groups.push(this.groupsForm.value.group);
      this.groupsForm.reset();
    }
  }

  removeGroup(group: string) {
    const index = this.groups.indexOf(group);
    if (index > -1) {
      this.groups.splice(index, 1);
    }
    this.groupsForm.reset();
  }

  includePredictors(predictor?: Predictor) {
    if (!this.betweenIsuPredictors) {
      this.betweenIsuPredictors = new Array<Predictor>();
    }
    if ( predictor ) {
      this.predictorForm.get('predictorName').setValue(predictor.name)
      this.groups = predictor.valueNames;
    }

    this._next = 1;
    this.stage = -1;
  }

  cancelPredictor() {
    this.editing = false;
    this._next = 0;
    this.stage = -1;
  }

  addPredictor() {
    const predictor = new Predictor();
    predictor.name = this.predictorForm.value.predictorName;
    predictor.valueNames = this.groups;

    this.betweenIsuPredictors.push(predictor);
    this.editing = false;
  }

  removePredictor(predictor: Predictor) {
    const index = this.betweenIsuPredictors.indexOf(predictor);
    if (index > -1) {
      this.betweenIsuPredictors.splice(index, 1);
    }
  }

  editPredictor(predictor: Predictor) {
    this.removePredictor(predictor);
    this.predictorForm = this.fb.group({
      predictorName: ['', predictorValidator(this.betweenIsuPredictors)]
    });
    this.includePredictors(predictor);
  }

  getStageStatus(stage: number): string {
    if (stage === 0) {
      return this.predictorForm.status;
    }
    if (stage === 1) {
      return this.groupsForm.status;
    }
    return 'INVALID';
  }

  internallyNavigate(direction: string): void {
    let next = this.stage;
    if ( direction === 'BACK' ) {
      this.formErrors.groupsformtwogroups = '';
      next = this.stage - 1;
    }
    if ( direction === 'NEXT' ) {
      if (next === 0) {
        this.onAddedPredictorForm();
        if (this.formErrors.predictorform === '') {
          next = this.stage + 1;
        }
      } else if (next === 1) {
        if (this.groups && this.groups.length >= 2) {
          next = this.stage + 1;
        } else {
          this.formErrors.groupsformtwogroups = 'Need to specify at least two groups.';
        }
      }
    }
    if ( next < 0) {
      this.resetForms();
    }
    if ( next >= Object.keys(this.stages).length ) {
      this.addPredictor();
      this.resetForms();
    }
    if (this.stages[next]) {
      this.setStage(next);
    }
  }

  setStage(next: number) {
    this.stage = next;
  }

  resetForms() {
    this.groups = [];
    this.groupsForm.reset();
    this.predictorForm.reset();
    this.buildForm();
  }

  hasPredictors(): boolean {
    if (this.betweenIsuPredictors) {
      return this.betweenIsuPredictors.length > 0;
    }
    return false;
  }

  nextPredictors(): boolean {
    if (this.hasPredictors() && this.betweenIsuPredictors.length >= this.maxPredictors ) {
      return false;
    }
    return true;
  }

  get stageName() {
    return this.stages[this.stage]
  }

  get predictorForm(): FormGroup {
    return this._predictorForm;
  }

  set predictorForm(value: FormGroup) {
    this._predictorForm = value;
  }

  get groupsForm(): FormGroup {
    return this._groupsForm;
  }

  set groupsForm(value: FormGroup) {
    this._groupsForm = value;
  }

  get typeForm(): FormGroup {
    return this._typeForm;
  }

  set typeForm(value: FormGroup) {
    this._typeForm = value;
  }

  get betweenIsuPredictors(): Array<Predictor> {
    return this._betweenIsuPredictors;
  }

  set betweenIsuPredictors(value: Array<Predictor>) {
    this._betweenIsuPredictors = value;
  }

  get betweenIsuPredictorsSubscription(): Subscription {
    return this._betweenIsuPredictorsSubscription;
  }

  set betweenIsuPredictorsSubscription(value: Subscription) {
    this._betweenIsuPredictorsSubscription = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get study_service(): StudyService {
    return this._study_service;
  }

  set study_service(value: StudyService) {
    this._study_service = value;
  }

  get stages() {
    return this._stages;
  }

  get stage(): number {
    return this._stage;
  }

  set stage(value: number) {
    this._stage = value;
  }

  isStage(stage: number) {
    return this.stage === stage ? true : false;
  }

  get editing(): boolean {
    return this._editing;
  }

  set editing(value: boolean) {
    this._editing = value;
  }

  get maxGroups(): number {
    return this._maxGroups;
  }

  set maxGroups(value: number) {
    this._maxGroups = value;
  }

  get maxPredictors(): number {
    return this._maxPredictors;
  }

  set maxPredictors(value: number) {
    this._maxPredictors = value;
  }

  get groups(): string[] {
    return this._groups;
  }

  set groups(value: string[]) {
    this._groups = value;
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

  startTransition(event) {
  }

  doneTransition(event) {
    this.setStage(this._next);
  }
}
