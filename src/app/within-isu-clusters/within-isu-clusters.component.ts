import {Component, DoCheck, OnInit} from '@angular/core';
import {Cluster} from '../shared/Cluster';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {NavigationService} from '../shared/navigation.service';
import {constants} from '../shared/constants';
import {Subscription} from 'rxjs/Subscription';
import {minMaxValidator} from '../shared/minmax.validator';

@Component({
  selector: 'app-within-isu-clusters',
  templateUrl: './within-isu-clusters.component.html',
  styleUrls: ['./within-isu-clusters.component.scss']
})
export class WithinIsuClustersComponent implements OnInit, DoCheck {

  private _elementForm: FormGroup;
  private _clusterLevelForm: FormGroup;
  private _clusters: Cluster[];
  private _cluster: Cluster;
  private _max: number;
  private _stages;
  private _stage: number;
  private _validationMessages;
  private _formErrors;
  private _included: boolean;
  private _editing: boolean;
  private _maxLevels: number;

  private _directionCommand: string;
  private _navigationSubscription: Subscription;

  constructor(private _fb: FormBuilder, private study_service: StudyService, private navigation_service: NavigationService) {

    this.validationMessages = constants.CLUSTERS_FORM_VALIDATION_MESSAGES;
    this.formErrors = constants.CLUSTERS_FORM_ERRORS;
    this.max = constants.MAX_ELEMENTS;
    this.maxLevels = constants.MAX_LEVELS;
    this.clusters = [];
    this.stage = -1;
    this.stages = constants.CLUSTER_STAGES;

    this.navigationSubscription = this.navigation_service.navigation$.subscribe(
      direction => {
        this.directionCommand = direction;
        this.internallyNavigate(this.directionCommand);
      }
    );
  }

  buildForm() {
    this.elementForm = this.fb.group({
      elementName: ['']
    });
    this.clusterLevelForm = this.fb.group({
      levelName: [''],
      noElements: [0, minMaxValidator(2, 10000)]
    })
  }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    if (this.stage === 0) {
      this.elementForm.valueChanges.subscribe(status => {
        if (this.elementForm.status !== 'INVALID') {
          this.updateStudyFormStatus('VALID');
        } else {
          this.updateStudyFormStatus('INVALID');
        }
      });
    }
    if (this.stage === 1) {
      this.clusterLevelForm.valueChanges.subscribe(status => {
        if (this.clusterLevelForm.status !== 'INVALID') {
          this.updateStudyFormStatus('VALID');
        } else {
          this.updateStudyFormStatus('INVALID');
        }
      });
      }
  }

  addCluster() {
    this.cluster.elementName = this.elementForm.value.elementName;
    this.cluster.levelName = this.clusterLevelForm.value.levelName;
    this.cluster.noElements = this.clusterLevelForm.value.noElements;

    this.clusters.push(this.cluster);
  }

  editCluster(cluster: Cluster) {
    this.removeCluster(cluster);
    this.cluster = cluster;
    this.elementForm.get('elementName').setValue(this.cluster.elementName);
    this.clusterLevelForm.get('levelName').setValue(this.cluster.levelName);
    this.clusterLevelForm.get('noElements').setValue(this.cluster.noElements);
    this.includeClusters();
  }

  removeCluster(cluster: Cluster) {
    const index = this.clusters.indexOf(cluster);
    if (index > -1) {
      this.clusters.splice(index, 1);
    }
    if ( !this.hasClusters() ) {
      this.dontincludeClusters();
    }
  }

  includeClusters(cluster?: Cluster) {
    this.included = true;
    this.editing = true;
    this.navigation_service.updateNavigationMode(true);
    this.navigation_service.updateNextEnabled(true);
    this.study_service.updateValid(false);
    if (cluster) {
      this.cluster = cluster;
    } else {
      this.cluster = new Cluster();
    }
    this.stage = this.stage = 0;
  }

  dontincludeClusters() {
    this.navigation_service.updateNextEnabled(false);
    this.navigation_service.updateNavigationMode(false);
    this.included = false;
    this.editing = false;
    this.study_service.updateValid(true);
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
    this.study_service.updateValid(valid);
  }

  resetForms() {
    this.buildForm();

    this.cluster = new Cluster();

    this.stage = -1;
    this.editing = false;
    this.navigation_service.updateNavigationMode(false);
  }

  hasClusters(): boolean {
    return this.clusters && this.clusters.length > 0;
  }

  nextCluster(): boolean {
    if (this.hasClusters() && this.clusters.length < this.max) {
      return true;
    }
    return false;
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

  get clusters(): Cluster[] {
    return this._clusters;
  }

  set clusters(value: Cluster[]) {
    this._clusters = value;
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

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }
}
