import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {StudyService} from '../study.service';
import {Predictor} from '../../shared/Predictor';
import {constants, getName} from '../../shared/constants';
import {predictorValidator} from './predictor.validator';
import {groupValidator} from './group.validator';
import {fadeOut, fadeIn} from 'ng-animate';
import {trigger, transition, useAnimation, query} from '@angular/animations';
import {NavigationService} from '../../shared/navigation.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from "rxjs/Observable";

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
  private _type: string;
  private _groupsForm: FormGroup;
  private _groups: string[];
  private _maxGroups: number;
  private _maxPredictors: number;
  private _betweenIsuPredictors: Array<Predictor>;
  private _validationMessages;
  private _formErrors;

  private _stages;
  private _stage: number;
  private _next: number;

  private _betweenIsuPredictorsSubscription: Subscription;

  @ViewChild('content') contentModal;
  private modalReference: any;

  constructor(private _fb: FormBuilder,
              private _study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal) {
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

  selectNominal() {
    this._type = getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.NOMINAL)
  }
  selectOrdinal() {
    this._type = getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.ORDINAL)
  }
  selectContinuous() {
    this._type = getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.CONTINUOUS)
  }
  isNominal() {
    return this._type === getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.NOMINAL) ? true : false;
  }
  isOrdinal() {
    return this._type === getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.ORDINAL) ? true : false;
  }
  isContinuous() {
    return this._type === getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.CONTINUOUS) ? true : false;
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
    this.predictorForm.valueChanges.subscribe(data => this.emptyPredictorFormErrMsg());
    this.selectNominal();
    this.groupsForm = this.fb.group({
      units: [''],
      group: ['', groupValidator(this.groups)]
    });
    this.groupsForm.valueChanges.subscribe(data => this.emptyGroupsFormErrMsg());
  }

  private updateFormStatus() {
    if (this.stage === this.stages.INFO) {
    }
    if (this.stage === this.stages.GROUPS) {
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
    this._next = 0;
    this.stage = -1;
  }

  addName() {
    this._next = this.stages.TYPE;
    this.stage = -1;
  }

  addType() {
    this._next = this.stages.GROUPS;
    this.stage = -1;
  }

  addPredictor() {
    const predictor = new Predictor();
    predictor.name = this.predictorForm.value.predictorName;
    predictor.valueNames = this.groups;

    this.betweenIsuPredictors.push(predictor);
    this.stage = -1;
    this._next = this.stages.INFO;
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
    if (stage === this.stages.NAME) {
      return this.predictorForm.status;
    }
    if (stage === this.stages.GROUPS) {
      return this.groupsForm.status;
    }
    return 'INVALID';
  }

  setStage(next: number) {
    if (next === this.stages.INFO) {
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateValid(false);
    }
    this.stage = next;
  }

  resetForms() {
    this.groups = [];
    this.groupsForm.reset();
    this.selectNominal();
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

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    console.log('hello!!!')
    if (this.stage === this.stages.INFO) {
      console.log('onward!!!')
      this.navigation_service.updateValid(true);
      return true;
    } else {
      console.log('cancel');
      this.showModal(this.contentModal);
      this._study_service.updateDirection('CANCEL');
      return this.navigation_service.navigateAwaySelection$;
    }
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
      this.resetForms();
      this.navigation_service.updateValid(true);
    }
    this.navigation_service.navigateAwaySelection$.next(choice);
  }
}
