import {AfterViewInit, Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {Subscription, Observable} from 'rxjs';
import {StudyService} from '../../shared/services/study.service';
import {Predictor} from '../../shared/model/Predictor';
import {constants, getName} from '../../shared/model/constants';
import {predictorValidator} from '../../shared/validators/predictor.validator';
import {groupValidator} from '../../shared/validators/group.validator';
import {NavigationService} from '../../shared/services/navigation.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {isNullOrUndefined} from 'util';
import {fadeTransition} from '../../animations/animations';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-between-isu',
  templateUrl: './between-isu-predictors.component.html',
  animations: [fadeTransition],
  styleUrls: ['./between-isu-predictors.component.css']
})
export class BetweenIsuPredictorsComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy {
  private _predictorForm: UntypedFormGroup;
  private _type: string;
  private _groupsForm: UntypedFormGroup;
  private _groups: string[];
  private _maxGroups: number;
  private _maxPredictors: number;
  private _betweenIsuPredictors: Array<Predictor>;
  private _validationMessages;
  private _formErrors;
  private _editing = false;
  private _edited_name: string;

  private _stages;
  private _stage: number;
  private _next: number;

  private _betweenIsuPredictorsSubscription: Subscription;

  @ViewChild('canDeactivate', {static: true}) canDeactivateModal;
  private modalReference: any;

  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: UntypedFormBuilder,
              private _study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
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
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  ngOnInit() {
    this._afterInit = true;
    this.buildForm();
  }

  ngDoCheck() {
    this.updateFormStatus();
  }

  ngOnDestroy() {
    this.navigation_service.updateInternalFormSource(false);
    this.betweenIsuPredictorsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.stage = this._next;
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
      const units = this.groupsForm.controls.units.value;
      this.groupsForm.reset();
      this.groupsForm.controls.units.setValue(units);
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
      this.predictorForm.get('predictorName').setValue(predictor.name);
      this.selectByType(predictor);
      this._groupsForm.get('units').setValue(predictor.units);
      this.groups = predictor.valueNames;
    }

    this._next = 1;
    this.stage = -1;
  }


  cancelPredictor() {
    this._next = 0;
    this.stage = -1;
    // remove the editing check from the predictor validator
    this.predictorForm = this.fb.group({
      predictorName: ['', predictorValidator(this.betweenIsuPredictors)]
    });
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
    predictor.type = this._type;
    predictor.units = this.groupsForm.value.units;
    predictor.valueNames = this.groups;

    // check we aren't creating a duplicate (usually when editing an existing predictor
    const names = [];
    this.betweenIsuPredictors.forEach( p => {
      names.push(p.name);
    });
    let index = names.indexOf(predictor.name);
    if (this.editing) {
      index = names.indexOf(this._edited_name);
    }
    if (index !== -1) {
      if (this.betweenIsuPredictors[index].polynomialOrder > this.betweenIsuPredictors[index].maxPolynomialOrder) {
        this.betweenIsuPredictors[index].polynomialOrder = this.betweenIsuPredictors[index].maxPolynomialOrder;
      }
      this.betweenIsuPredictors[index].name = this.predictorForm.value.predictorName;
      this.betweenIsuPredictors[index].type = this._type;
      this.betweenIsuPredictors[index].units = this.groupsForm.value.units;
      this.betweenIsuPredictors[index].valueNames = this.groups;
    } else {
      predictor.polynomialOrder = predictor.maxPolynomialOrder;
      this.betweenIsuPredictors.push(predictor);
    }
    this.resetForms();
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
    this._editing = true;
    this._edited_name = predictor.name;
    this.predictorForm = this.fb.group({
      predictorName: ['', predictorValidator(this.betweenIsuPredictors, predictor)]
    });
    this.includePredictors(predictor);
  }

  getStageStatus(stage: number): string {
    if (stage === this.stages.NAME) {
      return this.predictorForm.status;
    }
    if (stage === this.stages.TYPE) {
      return 'VALID';
    }
    if (stage === this.stages.GROUPS) {
      return this.groupsForm.status;
    }
    return 'INVALID';
  }

  setStage(next: number) {
    if (next === this.stages.INFO) {
      this._editing = false;
      this.navigation_service.updateInternalFormSource(false);
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateInternalFormSource(true);
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

  get twoOrMore(): boolean {
    if (this.hasPredictors() && this.betweenIsuPredictors.length > 1) {
      return true;
    }
    return false;
  }

  get firstPredictorName() {
    if (this.twoOrMore) {
      return this.betweenIsuPredictors[0].name;
    } else {
      return 'fixed predictor one'
    }
  }

  get secondPredictorName() {
    if (this.twoOrMore) {
      return this.betweenIsuPredictors[1].name;
    } else {
      return 'fixed predictor two'
    }
  }

  get stageName() {
    return this.stages[this.stage]
  }

  get predictorForm(): UntypedFormGroup {
    return this._predictorForm;
  }

  set predictorForm(value: UntypedFormGroup) {
    this._predictorForm = value;
  }

  get groupsForm(): UntypedFormGroup {
    return this._groupsForm;
  }

  set groupsForm(value: UntypedFormGroup) {
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

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  set fb(value: UntypedFormBuilder) {
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

  selectNominal() {
    this._type = getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.NOMINAL)
  }
  selectContinuous() {
    this._type = getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.CONTINUOUS)
  }
  selectByType(predictor: Predictor) {
    if (this.isNominal(predictor)) {
      this.selectNominal();
    } else if (this.isContinuous(predictor)) {
      this.selectContinuous();
    }
  }
  isNominal(predictor?: Predictor) {
    if (!isNullOrUndefined(predictor)) {
      return predictor.type === getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.NOMINAL) ? true : false;
    } else {
      return this._type === getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.NOMINAL) ? true : false;
    }
  }
  isContinuous(predictor?: Predictor) {
    if (!isNullOrUndefined(predictor)) {
      return predictor.type === getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.CONTINUOUS) ? true : false;
    } else {
      return this._type === getName(constants.BETWEEN_ISU_TYPES, constants.BETWEEN_ISU_TYPES.CONTINUOUS) ? true : false;
    }
  }

  startTransition(event) {
  }

  doneTransition(event) {
    this.setStage(this._next);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.stage === this.stages.INFO) {
      this.navigation_service.updateValid(true);
      return true;
    } else {
      console.log('cancel');
      this.showModal(this.canDeactivateModal);
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

  groupsValid() {
    if (this.groupsForm.status === 'VALID' && !isNullOrUndefined(this.groups) && this.groups.length >= 2) {
      return true;
    } else {
      return false;
    }
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }

  get editing(): boolean {
    return this._editing;
  }
}
