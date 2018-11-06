import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Cluster} from '../../shared/Cluster';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudyService} from '../study.service';
import {NavigationService} from '../../shared/navigation.service';
import {constants} from '../../shared/constants';
import {Subscription} from 'rxjs';
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
  private _maxLevels: number;
  private _levels: ClusterLevel[];
  private _clusterSubscription: Subscription;

  constructor(private _fb: FormBuilder, private study_service: StudyService, private navigation_service: NavigationService) {

    this._validationMessages = constants.CLUSTERS_FORM_VALIDATION_MESSAGES;
    this._formErrors = constants.CLUSTERS_FORM_ERRORS;
    this._max = constants.MAX_ELEMENTS;
    this._maxLevels = constants.MAX_LEVELS;
    this._levels = [];
    this._stages = constants.CLUSTER_STAGES;
    this._stage = this._stages.INFO;
    this._clusterSubscription = this.study_service.withinIsuCluster$.subscribe(
      cluster => {
        this._cluster = cluster;
      }
    );
  }

  buildForm() {
    this._elementForm = this._fb.group({
      name: ['']
    });
    this._elementForm.valueChanges.subscribe(data => this.onValueChangedElementForm(data));
    this._clusterLevelForm = this._fb.group({
      levelName: ['', clusterValidator(this.levels)],
      noElements: [0, minMaxValidator(2, 10000)]
    })
    this._clusterLevelForm.valueChanges.subscribe(data => this.onValueChangedClusterLevelForm(data));
    this.initClusterLevelFormValidMessage();
  }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    if (this._stage === this._stages.LEVELS) {
      if (this._levels && this.levels.length > 0) {
        this._formErrors.clusterlevelrequired = ''
      } else {
        this._formErrors.clusterlevelrequired = 'Need to specify at least one cluster level.'
      }
    }
    this.study_service.updateWithinIsuCluster(this.cluster);
  }

  ngOnDestroy() {
    this.study_service.updateWithinIsuCluster(this.cluster);
    this._clusterSubscription.unsubscribe();
  }

  onValueChangedElementForm(data?: any) {
    if (!this.elementForm) {
      return;
    }
    const form = this.elementForm;

    this._formErrors['cluster'] = '';
    for (const field of Object.keys(form.value)) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this._validationMessages['cluster'];
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
    if (control.dirty) {
      this._formErrors['clusterlevelname'] = '';
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['clusterlevelname'];
        for (const key of Object.keys(control.errors)) {
          this._formErrors['clusterlevelname'] = messages[key];
        }
      }
    }
    control = form.get('noElements');
    if (control.dirty) {
      this._formErrors['elementnumber'] = '';
      if (control && control.dirty && !control.valid) {
        const messages = this._validationMessages['elementnumber'];
        for (const key of Object.keys(control.errors) ) {
          this._formErrors['elementnumber'] += messages[key];
        }
      }
    }
  }

  initClusterLevelFormValidMessage() {
    this._formErrors.clusterlevelname = 'Value needs to be filled in.';
    this._formErrors.elementnumber = 'Value too low.';
  }

  addCluster() {
    this._cluster = new Cluster();
    this._cluster.name = this._elementForm.value.name;

    for (const level of this.levels) {
      this._cluster.levels.push(level);
    }
  }

  editCluster(cluster: Cluster) {
    this.removeCluster();
    this.elementForm.get('name').setValue(cluster.name);
    this._levels = cluster.levels;
    this.includeClusters();
  }

  removeCluster() {
    this._cluster = null;
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
    this.navigation_service.updateValid(false);
    if (cluster) {
      this._cluster = cluster;
    }
    this.setStage(this._stages.ELEMENT_NAME);
  }

  dontincludeClusters() {
    this.navigation_service.updateNavigationMode(false);
    this.navigation_service.updateValid(true);
    this.setStage(this._stages.INFO);
  }

  // internallyNavigate(direction: string) {
  //   let next = this.stage;
  //   if ( direction === 'BACK' ) {
  //     next = this.stage - 1;
  //   }
  //   if ( direction === 'NEXT' ) {
  //     next = this.stage + 1;
  //   }
  //   if ( next < 0) {
  //     this.resetForms();
  //     this.dontincludeClusters();
  //   }
  //   if ( next >= Object.keys(this.stages).length ) {
  //     this.addCluster();
  //     this.resetForms();
  //   }
  //   if (this.stages[next]) {
  //     this.setStage(next);
  //   }
  // }

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
    if (this.isInfo()) {
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateValid(false);
    }
    this._stage = next;
  }

  resetForms() {
    this.buildForm();
    this._levels = [];
    this.setStage(this._stages.INFO);
  }

  hasCluster(): boolean {
    return this.cluster ? true : false;
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

  get stageName() {
    return Object.keys(this._stages)[this.stage]
  }

  get elementForm(): FormGroup {
    return this._elementForm;
  }

  get clusterLevelForm(): FormGroup {
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
    this._stage = value;
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
}
