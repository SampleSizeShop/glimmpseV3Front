import {Component, OnChanges, OnInit} from '@angular/core';
import {StudyService} from '../shared/study.service';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {constants} from '../shared/constants';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {RepeatedMeasureService} from '../shared/repeatedMeasure.service';
import {Subscription} from 'rxjs/Subscription';
import {DifferentMeasuresService} from '../shared/differentMeasures.service';
import {DifferentMeasures} from '../shared/DifferentMeasures';
import {ClusterService} from '../shared/cluster.service';
import {Cluster} from '../shared/Cluster';

@Component({
  selector: 'app-witin-isu',
  templateUrl: './within-isu.component.html',
  styleUrls: ['./within-isu.component.scss'],
  providers: [
    RepeatedMeasure,
    RepeatedMeasureService,
    DifferentMeasures,
    DifferentMeasuresService,
    Cluster,
    ClusterService,
  ]
})
export class WitinIsuComponent {

  private _multipleOutcomes: boolean;
  private _withinISUForm: FormGroup;
  private _formErrors = constants.WITHIN_ISU_ERRORS;
  private _validationMessages = constants.WITHIN_ISU_VALIDATION_MESSAGES;
  private _repeatedMeasures: RepeatedMeasure[] = [];
  private _repeatedMeasure: RepeatedMeasure;
  private _differentMeasures: DifferentMeasures[] = [];
  private _differentMeasure: DifferentMeasures;
  private _clusters = [];
  private _cluster: Cluster[];
  private _repeatedMeasureSubscription: Subscription;
  private _differentMeasureSubscription: Subscription;
  private _clusterSubscription: Subscription;
  private _editingRepeatedMeasure: boolean;
  private _editingDifferentMeasures: boolean;
  private _editingClusters: boolean;

  constructor(private _study_service: StudyService,
              private _repeatedMeasureService: RepeatedMeasureService,
              private _differentMeasuresService: DifferentMeasuresService,
              private _clusterService: ClusterService,
              private _fb: FormBuilder) {
    this.editingRepeatedMeasure = false;
    this.buildForm();
    this.repeatedMeasureSubscription = this.repeatedMeasureService.repeatedMeasure$.subscribe(
      repeatedMeasure => {
        this.repeatedMeasures.push(repeatedMeasure);
        this.editingRepeatedMeasure = false;
      }
    );
    this.differentMeasureSubscription = this.differentMeasuresService.differentMeasures$.subscribe(
      differentMeasure => {
        this.differentMeasures.push(differentMeasure);
        this.editingDifferentMeasures = false;
      }
    );
    this.clusterSubscription = this.clusterService.cluster$.subscribe(
      cluster => {
        this.clusters.push(cluster);
        this.editingClusters = false;
      }
    );
  }

  buildForm(): void {
    this.withinISUForm = this._fb.group({
      singleoutcome: '',
    });

    this.withinISUForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.withinISUForm) {
      return;
    }
    const form = this.withinISUForm;

    for (const field of this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  deleteRepeatedMeasure(measure: RepeatedMeasure) {
    let index = -1;
    index = this.repeatedMeasures.indexOf(measure);
    if (index > -1) {
      this.repeatedMeasures.splice(index, 1);
    }
  }

  editRepeatedMeasure(measure: RepeatedMeasure) {
    this.repeatedMeasure = measure;
    this.deleteRepeatedMeasure(measure);
    this.editingRepeatedMeasure = true;
  }

  addRepeatedMeasure() {
    this.repeatedMeasure = new RepeatedMeasure();
    this.editingRepeatedMeasure = true;
  }

  addDifferentMeasure() {
    this.differentMeasure = new DifferentMeasures();
    this.editingDifferentMeasures = true;
  }

  addCluster() {
    this.cluster = [new Cluster()];
    this.editingClusters = true;
  }

  selectSingleOutcome() {
    this.multipleOutcomes = false;
    this.updateForm();
  }

  selectMultipleOutcomes() {
    this.multipleOutcomes = true;
    this.updateForm();
  }

  private updateForm() {
    this._study_service.selectMultipleOutcomes(this.multipleOutcomes);
  }

  get multipleOutcomes(): boolean {
    return this._multipleOutcomes;
  }

  set multipleOutcomes(value: boolean) {
    this._multipleOutcomes = value;
  }

  editing(): boolean {
    return this.editingRepeatedMeasure || this.editingDifferentMeasures || this.editingClusters ? true : false;
  }

  get withinISUForm(): FormGroup {
    return this._withinISUForm;
  }

  set withinISUForm(value: FormGroup) {
    this._withinISUForm = value;
  }

  get formErrors(): { singleoutcomeerror } | any {
    return this._formErrors;
  }

  set formErrors(value: { singleoutcomeerror } | any) {
    this._formErrors = value;
  }

  get validationMessages(): any {
    return this._validationMessages;
  }

  set validationMessages(value: any) {
    this._validationMessages = value;
  }

  get repeatedMeasures(): RepeatedMeasure[] {
    return this._repeatedMeasures;
  }

  set repeatedMeasures(value: RepeatedMeasure[]) {
    this._repeatedMeasures = value;
  }

  get repeatedMeasureService(): RepeatedMeasureService {
    return this._repeatedMeasureService;
  }

  get differentMeasuresService(): DifferentMeasuresService {
    return this._differentMeasuresService;
  }

  set differentMeasuresService(value: DifferentMeasuresService) {
    this._differentMeasuresService = value;
  }

  get differentMeasureSubscription(): Subscription {
    return this._differentMeasureSubscription;
  }

  set differentMeasureSubscription(value: Subscription) {
    this._differentMeasureSubscription = value;
  }

  set repeatedMeasureService(value: RepeatedMeasureService) {
    this._repeatedMeasureService = value;
  }

  get repeatedMeasureSubscription(): Subscription {
    return this._repeatedMeasureSubscription;
  }

  set repeatedMeasureSubscription(value: Subscription) {
    this._repeatedMeasureSubscription = value;
  }

  get editingRepeatedMeasure(): boolean {
    return this._editingRepeatedMeasure;
  }

  set editingRepeatedMeasure(value: boolean) {
    this._editingRepeatedMeasure = value;
  }

  get editingDifferentMeasures(): boolean {
    return this._editingDifferentMeasures;
  }

  set editingDifferentMeasures(value: boolean) {
    this._editingDifferentMeasures = value;
  }

  get repeatedMeasure(): RepeatedMeasure {
    return this._repeatedMeasure;
  }

  set repeatedMeasure(value: RepeatedMeasure) {
    this._repeatedMeasure = value;
  }

  get differentMeasures(): DifferentMeasures[] {
    return this._differentMeasures;
  }

  set differentMeasures(value: DifferentMeasures[]) {
    this._differentMeasures = value;
  }

  get differentMeasure(): DifferentMeasures {
    return this._differentMeasure;
  }

  set differentMeasure(value: DifferentMeasures) {
    this._differentMeasure = value;
  }

  get clusters() {
    return this._clusters;
  }

  set clusters(value) {
    this._clusters = value;
  }

  get cluster(): Cluster[] {
    return this._cluster;
  }

  set cluster(value: Cluster[]) {
    this._cluster = value;
  }

  get clusterSubscription(): Subscription {
    return this._clusterSubscription;
  }

  set clusterSubscription(value: Subscription) {
    this._clusterSubscription = value;
  }

  get study_service(): StudyService {
    return this._study_service;
  }

  set study_service(value: StudyService) {
    this._study_service = value;
  }

  get clusterService(): ClusterService {
    return this._clusterService;
  }

  set clusterService(value: ClusterService) {
    this._clusterService = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get editingClusters(): boolean {
    return this._editingClusters;
  }

  set editingClusters(value: boolean) {
    this._editingClusters = value;
  }
}
