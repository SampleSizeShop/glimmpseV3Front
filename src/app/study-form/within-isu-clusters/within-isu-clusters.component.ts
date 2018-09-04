import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Cluster} from '../../shared/Cluster';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudyService} from '../study.service';
import {NavigationService} from '../../shared/navigation.service';
import {constants} from '../../shared/constants';
import {Subscription} from 'rxjs/Subscription';
import {minMaxValidator} from '../../shared/minmax.validator';
import {clusterValidator} from './cluster.validator';
import {ClusterLevel} from '../../shared/ClusterLevel';

@Component({
  selector: 'app-within-isu-clusters',
  templateUrl: './within-isu-clusters.component.html',
  styleUrls: ['./within-isu-clusters.component.scss']
})
export class WithinIsuClustersComponent implements OnInit, DoCheck, OnDestroy {

  private _elementForm: FormGroup;
  private _clusterLevelForm: FormGroup;
  private _cluster: Cluster;
  private _max: number;
  private _stages;
  private _stage: number;
  private _validationMessages;
  private _formErrors;
  private _included: boolean;
  private _editing: boolean;
  private _maxLevels: number;
  private _levels: ClusterLevel[];

  private _directionCommand: string;
  private _navigationSubscription: Subscription;
  private _clusterSubscription: Subscription;

  constructor(private _fb: FormBuilder, private study_service: StudyService, private navigation_service: NavigationService) {

    this.validationMessages = constants.CLUSTERS_FORM_VALIDATION_MESSAGES;
    this.formErrors = constants.CLUSTERS_FORM_ERRORS;
    this.max = constants.MAX_ELEMENTS;
    this.maxLevels = constants.MAX_LEVELS;
    this.levels = [];
    this.stage = -1;
    this.stages = constants.CLUSTER_STAGES;

    this.navigationSubscription = this.navigation_service.navigation$.subscribe(
      direction => {
        this.directionCommand = direction;
        this.internallyNavigate(this.directionCommand);
      }
    );
    this.clusterSubscription = this.study_service.withinIsuCluster$.subscribe(
      cluster => {
        this.cluster = cluster;
      }
    );
  }

  buildForm() {
    this.elementForm = this.fb.group({
      name: ['']
    });
    this.elementForm.valueChanges.subscribe(data => this.onValueChangedElementForm(data));
    this.clusterLevelForm = this.fb.group({
      levelName: ['', clusterValidator(this.levels)],
      noElements: [0, minMaxValidator(2, 10000)]
    })
    this.clusterLevelForm.valueChanges.subscribe(data => this.onValueChangedClusterLevelForm(data));
    this.initClusterLevelFormValidMessage();
  }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    if (this.stage === 0) {
      if (this.elementForm.status !== 'INVALID') {
        this.updateStudyFormStatus('VALID');
      } else {
        this.updateStudyFormStatus('INVALID');
      }
    }
    if (this.stage === 1) {
      if (this.levels && this.levels.length > 0) {
        this.updateStudyFormStatus('VALID');
        this.formErrors.clusterlevelrequired = ''
      } else {
        this.updateStudyFormStatus('INVALID');
        this.formErrors.clusterlevelrequired = 'Need to specify at least one cluster level.'
      }
    }
    this.study_service.updateWithinIsuCluster(this.cluster);
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  onValueChangedElementForm(data?: any) {
    if (!this.elementForm) {
      return;
    }
    const form = this.elementForm;

    this.formErrors['cluster'] = '';
    for (const field in form.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['cluster'];
        for (const key in control.errors ) {
          this.formErrors['cluster'] = messages[key];
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
    if (control.dirty) {
      this.formErrors['clusterlevelname'] = '';
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['clusterlevelname'];
        for (const key in control.errors ) {
          this.formErrors['clusterlevelname'] = messages[key];
        }
      }
    }
    control = form.get('noElements');
    if (control.dirty) {
      this.formErrors['elementnumber'] = '';
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['elementnumber'];
        for (const key in control.errors ) {
          this.formErrors['elementnumber'] += messages[key];
        }
      }
    }
  }

  initClusterLevelFormValidMessage() {
    this.formErrors.clusterlevelname = 'Value needs to be filled in.';
    this.formErrors.elementnumber = 'Value too low.';
  }
  addCluster() {
    this.cluster = new Cluster();
    this.cluster.name = this.elementForm.value.name;

    for (const level of this.levels) {
      this.cluster.levels.push(level);
    }
  }

  editCluster(cluster: Cluster) {
    this.removeCluster();
    this.elementForm.get('name').setValue(cluster.name);
    this.levels = cluster.levels;
    this.includeClusters();
  }

  removeCluster() {
    this.cluster = null;
  }

  addLevel() {
    const level = new ClusterLevel();
    level.levelName = this.clusterLevelForm.value.levelName;
    level.noElements = this.clusterLevelForm.value.noElements;
    if (level.levelName && level.noElements) {
      this.levels.push(level);
      this.clusterLevelForm.reset();
    }
  }

  includeClusters(cluster?: Cluster) {
    this.included = true;
    this.editing = true;
    this.navigation_service.updateNavigationMode(true);
    this.navigation_service.updateNextEnabled(true);
    this.navigation_service.updateValid(false);
    if (cluster) {
      this.cluster = cluster;
    }
    this.stage = this.stage = 0;
  }

  dontincludeClusters() {
    this.navigation_service.updateNavigationMode(false);
    this.included = false;
    this.editing = false;
    this.navigation_service.updateValid(true);
    this.stage = -1;
  }

  internallyNavigate(direction: string) {
    let next = this.stage;
    if ( direction === 'BACK' ) {
      next = this.stage - 1;
    }
    if ( direction === 'NEXT' ) {
      next = this.stage + 1;
    }
    if ( next < 0) {
      this.resetForms();
      this.dontincludeClusters();
    }
    if ( next >= Object.keys(this.stages).length ) {
      this.addCluster();
      this.resetForms();
    }
    if (this.stages[next]) {
      this.setStage(next);
    }
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

  setStage(next: number) {
    this.stage = next;
    this.updateStudyFormStatus(this.getStageStatus(this.stage));
  }

  updateStudyFormStatus(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
  }

  resetForms() {
    this.buildForm();
    this.levels = [];
    this.stage = -1;
    this.editing = false;
    this.navigation_service.updateNavigationMode(false);
  }

  hasCluster(): boolean {
    return this.cluster ? true : false;
  }

  get stageName() {
    return this.stages[this.stage]
  }

  get elementForm(): FormGroup {
    return this._elementForm;
  }

  set elementForm(value: FormGroup) {
    this._elementForm = value;
  }

  get clusterLevelForm(): FormGroup {
    return this._clusterLevelForm;
  }

  set clusterLevelForm(value: FormGroup) {
    this._clusterLevelForm = value;
  }

  get cluster(): Cluster {
    return this._cluster;
  }

  set cluster(value: Cluster) {
    this._cluster = value;
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
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

  get included(): boolean {
    return this._included;
  }

  set included(value: boolean) {
    this._included = value;
  }

  get editing(): boolean {
    return this._editing;
  }

  set editing(value: boolean) {
    this._editing = value;
  }

  get maxLevels(): number {
    return this._maxLevels;
  }

  set maxLevels(value: number) {
    this._maxLevels = value;
  }

  get directionCommand(): string {
    return this._directionCommand;
  }

  set directionCommand(value: string) {
    this._directionCommand = value;
  }

  get navigationSubscription(): Subscription {
    return this._navigationSubscription;
  }

  set navigationSubscription(value: Subscription) {
    this._navigationSubscription = value;
  }

  get levels(): ClusterLevel[] {
    return this._levels;
  }

  set levels(value: ClusterLevel[]) {
    this._levels = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get clusterSubscription(): Subscription {
    return this._clusterSubscription;
  }

  set clusterSubscription(value: Subscription) {
    this._clusterSubscription = value;
  }
}
