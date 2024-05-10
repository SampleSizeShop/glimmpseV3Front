import {
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Cluster} from '../../shared/model/Cluster';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {NavigationService} from '../../shared/services/navigation.service';
import {constants} from '../../shared/model/constants';
import {Subscription, Observable} from 'rxjs';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {clusterValidator} from './cluster.validator';
import {ClusterLevel} from '../../shared/model/ClusterLevel';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {fadeTransition} from '../../animations/animations';
import {NGXLogger} from 'ngx-logger';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-within-isu-clusters',
  templateUrl: './within-isu-clusters.component.html',
  animations: [fadeTransition],
  styleUrls: ['./within-isu-clusters.component.scss']
})
export class WithinIsuClustersComponent implements OnInit, DoCheck, OnDestroy {

  private _elementForm: UntypedFormGroup;
  private _clusterLevelForm: UntypedFormGroup;
  private _cluster: Cluster;
  private _max: number;
  private _stages;
  private _stage: number;
  private _next: number;
  private _validationMessages;
  private _validLevels;
  private _formErrors;
  private _maxLevels: number;
  private _levels: ClusterLevel[];
  private _clusterSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;
  private _editing = false;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;
  private _isuAdded: boolean;
  private _levelAdded: boolean;
  private _editingLevel: boolean;
  private _editingLevelName: string;

  @ViewChild('canDeactivate', {static: true}) canDeactivateModal;
  private modalReference: any;

  public _graphData = [];

  constructor(private _fb: UntypedFormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {

    this._validationMessages = constants.CLUSTERS_FORM_VALIDATION_MESSAGES;
    this._formErrors = constants.CLUSTERS_FORM_ERRORS;
    this._max = constants.MAX_ELEMENTS;
    this._maxLevels = constants.MAX_LEVELS;
    this._levels = [];
    this._stages = constants.CLUSTER_STAGES;
    this._next = this._stages.INFO;
    this._stage = this._stages.INFO;
    this._clusterSubscription = this.study_service.withinIsuCluster$.subscribe(
      cluster => {
        this._cluster = cluster;
        if (cluster !== null && cluster !== undefined) {
          this._levels = cluster.levels;
          this._elementForm = this._fb.group({
            name: [this._cluster.name]
          });
        }
      }
    );
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this._isuAdded = false;
    this._levelAdded = false;
    this._editingLevel = false;
  }

  buildForm() {
    this._elementForm = this._fb.group({
      name: ['']
    });
    this._elementForm.valueChanges.subscribe(data => this.onValueChangedElementForm(data));
    this._clusterLevelForm = this._fb.group({
      levelName: ['', clusterValidator(this.elementForm.controls['name'].value, this.levels, this._editingLevel)],
      noElements: [2, minMaxValidator(2, 10000)]
    });
    this._clusterLevelForm.valueChanges.subscribe(data => this.onValueChangedClusterLevelForm(data));
    this.initClusterLevelFormValidMessage();
    if (!isNullOrUndefined(this._cluster)) {
      this.setGraphData();
    }
  }

  ngOnInit() {
    this._afterInit = true;
    this.buildForm();
  }

  ngDoCheck() {
    if (this._stage === this._stages.ELEMENT_NAME) {
      if (this.isuAdded && (isNullOrUndefined(this.elementForm.get('name').value)
        || this.elementForm.get('name').value === '') ) {
        this._formErrors.required = 'ISU name is required.'
      } else {
        this._formErrors.required = null
      }
    }
    if (this._stage === this._stages.LEVELS) {
      if (this._levels && this.levels.length > 0) {
        this._formErrors.clusterlevelrequired = ''
        this._validLevels = true;
      } else {
        this._formErrors.clusterlevelrequired = 'You must to specify at least level one of clustering.'
        this._validLevels = false;
      }
    }
  }

  ngOnDestroy() {
    this.navigation_service.updateInternalFormSource(false);
    this._clusterSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  onValueChangedElementForm(data?: any) {
    if (!this.elementForm || !this._isuAdded) {
      return;
    }
    const form = this.elementForm;

    this._formErrors['cluster'] = '';
    for (const field of Object.keys(form.value)) {
      const control = form.get(field);
      const messages = this._validationMessages['cluster'];
      if (!isNullOrUndefined(control.errors)) {
        for (const key of Object.keys(control.errors)) {
          this._formErrors['cluster'] = messages[key];
        }
      }
    }
  }

  onValueChangedClusterLevelForm(data?: any) {
    if (!this.elementForm) {
      return;
    }
    const form = this.clusterLevelForm;
    let control = form.get('levelName');
    this._formErrors['clusterlevelname'] = '';
    if (control && !control.valid) {
      const messages = this.validationMessages['clusterlevelname'];
      if (!isNullOrUndefined(control.errors)) {
        for (const key of Object.keys(control.errors)) {
          this._formErrors['clusterlevelname'] = messages[key];
        }
      }
    }
    control = form.get('noElements');
    this._formErrors['elementnumber'] = '';
    if (control && !control.valid) {
      const messages = this._validationMessages['elementnumber'];
      if (!isNullOrUndefined(control.errors)) {
        for (const key of Object.keys(control.errors) ) {
          this._formErrors['elementnumber'] += messages[key];
        }
      }
    }
  }

  initClusterLevelFormValidMessage() {
    this._formErrors.elementnumber = 'Value too low.';
  }

  addCluster() {
    this._cluster = new Cluster();
    this._cluster.name = this._elementForm.value.name;

    for (const level of this.levels) {
      this._cluster.levels.push(level);
    }
    this.study_service.updateWithinIsuCluster(this.cluster);

    this.setGraphData();
    this.stage = this._stages.INFO;
  }

  editCluster() {
    this._editing = true;
    this.elementForm.get('name').setValue(this._cluster.name);
    this._levels = this._cluster.levels;
    this.stage = this._stages.ELEMENT_NAME;
  }

  removeCluster() {
    this._cluster = null;
    this._levels = [];
    this.study_service.updateWithinIsuCluster(this.cluster);
    this.buildForm();
  }

  addLevel() {
    this._levelAdded = true;
    // dynamically add required validator and update control then form validity.
    // this prevents the user being shown that the form is invalid before they have tried to submit it.
    this.clusterLevelForm.controls['levelName'].setValidators([
      clusterValidator(this.elementForm.controls['name'].value,
      this.levels, this._editingLevel), Validators.required]);
    this.clusterLevelForm.controls['levelName'].updateValueAndValidity();
    this.clusterLevelForm.controls['noElements'].setValidators([
      minMaxValidator(2, 10000),  Validators.required
    ]);
    this.clusterLevelForm.controls['noElements'].updateValueAndValidity();
    this.clusterLevelForm.updateValueAndValidity();
    const level = new ClusterLevel();
    level.levelName = this.clusterLevelForm.value.levelName;
    level.noElements = this.clusterLevelForm.value.noElements;
    if (this.clusterLevelForm.valid && level.levelName && level.noElements) {
      if (this._editingLevel) {
        this.levels.forEach(l => {
          if (this._editingLevelName === l.levelName) {
            l.levelName = level.levelName;
            l.noElements = level.noElements;
          }
          this._editingLevel = false
        })
      } else {
        this.levels.push(level);
      }
      this.clusterLevelForm.controls['levelName'].setValidators([
        clusterValidator(this.elementForm.controls['name'].value, this.levels, this._editingLevel)
      ]);
      this.clusterLevelForm.controls['noElements'].setValidators([minMaxValidator(2, 10000)]);
      this._levelAdded = false;
      this._editingLevel = false;
      this.clusterLevelForm.reset();
    }
  }

  addISU() {
    this._isuAdded = true;
    // dynamically add required validator and update control then form validity.
    // this prevents the user being shown that the form is invalid before they have tried to submit it.
    this.elementForm.controls['name'].setValidators([Validators.required]);
    this.elementForm.get('name').updateValueAndValidity();
    this.elementForm.updateValueAndValidity();
    this.onValueChangedElementForm();
    if (this.elementForm.valid && this._isuAdded) {
      this.stage = this.stages.LEVELS;
    }
  }

  includeClusters(cluster?: Cluster) {
    this.navigation_service.updateValid(false);
    if (cluster) {
      this._cluster = cluster;
    }
    this.stage = this._stages.ELEMENT_NAME;
  }

  getStageStatus(stage: number): string {
    if (stage === 0) {
      return this.elementForm.status;
    }
    if (stage === 1) {
      return this.clusterLevelForm.status;
    }
    return 'INVALID';
  }

  cancel() {
    this.stage = this.stages.INFO;
  }

  setStage(next: number) {
    this._stage = next;
    if (this.isInfo()) {
      this._editing = false;
      this.navigation_service.updateInternalFormSource(false);
      this._editingLevel = false;
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateInternalFormSource(true);
      this.navigation_service.updateValid(false);
    }
  }

  removeLevel(level: ClusterLevel) {
    this.levels.forEach((lvl, index) => {
      if (lvl.levelName === level.levelName) {
        this._levels.splice(index, 1);
      }
    });
  }

  editISU() {
    this._editingLevel = false;
    this.includeClusters();
  }

  editLevel(level: ClusterLevel) {
    this.stage = this.stages.LEVELS;
    this._editingLevel = true;
    this._editingLevelName = level.levelName;
    this.clusterLevelForm.controls['levelName'].setValue(level.levelName);
    this.clusterLevelForm.controls['noElements'].setValue(level.noElements);
  }

  startTransition(event) {
  }

  doneTransition(event) {
    this.setStage(this._next);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.isInfo()) {
      this.navigation_service.updateValid(true);
      return true;
    } else {
      console.log('cancel');
      this.showModal(this.canDeactivateModal);
      this.study_service.updateDirection('CANCEL');
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
      });
  }

  modalChoice(choice: boolean) {
    this.modalReference.close();
    if (choice) {
      this.buildForm();
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

  hasCluster(): boolean {
    return this.cluster ? true : false;
  }

  hasLevels(): boolean {
    return this.levels ? true : false;
  }

  isInfo() {
    return this._stage === this._stages.INFO;
  }

  isElementName() {
    return this._stage === this._stages.ELEMENT_NAME;
  }

  isLevels() {
    return this._stage === this._stages.LEVELS;
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

  /**
   * Build the input data for out d3 visualisation of the cluster.
   * **/
  setGraphData() {
    const graphData = [];

    // add the root
    const isuId = this._cluster.name
    let parentIds = ['root'];

    graphData.push({id: parentIds[0], description: isuId});

    this._cluster.levels.forEach( level => {
      let newIds = [];
      parentIds.forEach(parentId => {
        let p = 'root';
        if (parentId !== p) {
          p = parentId[0];
        }

        // get position
        let pos = 1
        if (parentId !== 'root') {
          pos = this.getTreePosition(parentId[0]);
        }
        const elementNo = this.getElementNoFromPos(pos, parentId) * level.noElements;

        // set lower id
        let id = this.getLevelId(level.levelName, elementNo - (level.noElements - 1));
        newIds.push([id, level.noElements, level.noElements - 1]);
        graphData.push({id: id, description: id, parent: p});

        if (level.noElements > 2) {
          id = level.levelName + ' ...';
          graphData.push({id: id, description: id, parent: p});
        }

        // set upper id
        id = this.getLevelId(level.levelName, elementNo);
        newIds.push([id, level.noElements, 0]);
        graphData.push({id: id, description: id, parent: p});
      });
      // remove extra branches we don't want to display - really I should sort this algorithmically, but this is simple.
      if (newIds.length > 2) {
        newIds = [newIds[0], newIds[newIds.length - 1]];
      }
      parentIds = newIds;
    });

    this._graphData = graphData;
  }

  getElementNoFromPos(pos, parentId) {
    let elementNo = 1;
    if (parentId !== 'root') {
      elementNo = pos;
    }
    return elementNo;
  }

  getLevelId(level, elementNo) {
    return level + ' ' + elementNo;
  }

  getTreePosition(parent) {
    const r = parent.split(' ');
    const pos = r[r.length - 1];
    return pos;
  }

  levelDescription(level) {
    let desc = level.noElements + ' ' + level.levelName + '(s) in each ';
    const idx = this.levels.indexOf(level);
    if (idx === 0) {
      desc = desc + this.elementForm.get('name').value;
    } else {
      desc = desc + this.levels[idx - 1].levelName
    }
    return desc;
  }

  get graphData() {

    // return this.data4;
    return this._graphData;
  }

  get stageName() {
    return Object.keys(this._stages)[this.stage]
  }

  get elementForm(): UntypedFormGroup {
    return this._elementForm;
  }

  get clusterLevelForm(): UntypedFormGroup {
    return this._clusterLevelForm;
  }

  get cluster(): Cluster {
    return this._cluster;
  }

  get max(): number {
    return this._max;
  }

  get stages() {
    return this._stages;
  }

  get stage(): number {
    return this._stage;
  }

  set stage(value: number) {
    this._next = value;
    this._stage = -1;
  }

  get validationMessages() {
    return this._validationMessages;
  }

  get formErrors() {
    return this._formErrors;
  }

  get maxLevels(): number {
    return this._maxLevels;
  }

  get levels(): ClusterLevel[] {
    return this._levels;
  }

  get validLevels() {
    return this._validLevels;
  }

  get isuAdded(): boolean {
    return this._isuAdded;
  }

  get levelAdded(): boolean {
    return this._levelAdded;
  }

  get editing(): boolean {
    return this._editing;
  }
}
