import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ClusterService} from '../shared/cluster.service';
import {Cluster} from '../shared/Cluster';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss'],
  providers: [ClusterService]
})
export class ClusterComponent implements OnInit {
  private _clusterForm: FormGroup;
  private _clusterSubscription: Subscription;
  private _correlationMatrixSubscription: Subscription;
  private _childCluster: Cluster;
  private _hasChildCluster: boolean;

  constructor(
    private _fb: FormBuilder,
    private _clusterService: ClusterService,
    private _cluster: Cluster
  ) {
    this.hasChildCluster = false;
    this.childCluster = null;
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.clusterForm = this.fb.group({
      elementName: [this.cluster.elementName],
      clusterLevel: [this.cluster.clusterLevel],
      noElements: [this.cluster.noElements],
      childCluster: [this.cluster.childCluster],
      intraClassCorrelation: this.cluster.intraClassCorrelation,
      variance: [this.cluster.variance]
    });
  }

  enableAddClusterButton(): boolean {
    return this.clusterForm.status === 'VALID' ? true : false;
  }

  addChildCluster() {
    this.childCluster = new Cluster();
    this.childCluster.level = this.cluster.level + 1;
    this.hasChildCluster = true;
  }

  addCluster() {
    const formValues = this.clusterForm.value;
    this.cluster = formValues;
    this.clusterService.updateCluster(this.cluster)
  }

  isRoot(): boolean {
    return this.cluster.level === 0 ? true : false;
  }

  canHaveChild() {
    return this.cluster.level < 9 && !this.hasChildCluster ? true : false;
  }

  get clusterForm(): FormGroup {
    return this._clusterForm;
  }

  set clusterForm(value: FormGroup) {
    this._clusterForm = value;
  }

  get clusterSubscription(): Subscription {
    return this._clusterSubscription;
  }

  set clusterSubscription(value: Subscription) {
    this._clusterSubscription = value;
  }

  get correlationMatrixSubscription(): Subscription {
    return this._correlationMatrixSubscription;
  }

  set correlationMatrixSubscription(value: Subscription) {
    this._correlationMatrixSubscription = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get clusterService(): ClusterService {
    return this._clusterService;
  }

  set clusterService(value: ClusterService) {
    this._clusterService = value;
  }

  get cluster(): Cluster {
    return this._cluster;
  }

  @Input()
  set cluster(value: Cluster) {
    this._cluster = value;
  }

  get childCluster(): Cluster {
    return this._childCluster;
  }

  set childCluster(value: Cluster) {
    this._childCluster = value;
  }

  get hasChildCluster(): boolean {
    return this._hasChildCluster;
  }

  set hasChildCluster(value: boolean) {
    this._hasChildCluster = value;
  }
}
