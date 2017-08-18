import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ClusterService} from '../shared/cluster.service';
import {Cluster} from '../shared/Cluster';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss']
})
export class ClusterComponent implements OnInit {
  private _clusterForm: FormGroup;
  private _clusterSubscription: Subscription;
  private _correlationMatrixSubscription: Subscription;
  private _clusters: Cluster[];

  constructor(
    private _fb: FormBuilder,
    private _clusterService: ClusterService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const clusterFGs = this.clusters.map(cluster => this.fb.group({
      elementName: [cluster.elementName],
      clusterLevel: [cluster.clusterLevel],
      noElements: [cluster.noElements],
      intraClassCorrelation: [cluster.intraClassCorrelation],
      variance: [cluster.variance]
    }));
    this.clusterForm = this.fb.group({
      clusters: this.fb.array(clusterFGs)
    });
  }

  setClusters(clusters: Cluster[]) {
    const clusterFGs = clusters.map(cluster => this.fb.group({
      elementName: [cluster.elementName],
      clusterLevel: [cluster.clusterLevel],
      noElements: [cluster.noElements],
      intraClassCorrelation: [cluster.intraClassCorrelation],
      variance: [cluster.variance]
    }));
    const measureFormArray = this.fb.array(clusterFGs);
    this.clusterForm.setControl('clusters', measureFormArray);
  }

  enableAddClusterButton(): boolean {
    return this.clusterForm.status === 'VALID' ? false : true;
  }

  addChildCluster() {
    const child = new Cluster();
    child.level = this.getMaxLevel() + 1;
    this.clusters.push(child);
    this.setClusters(this.clusters);
  }

  getMaxLevel(): number {
    let level = 0;
    for (const cluster of this.clusters) {
      if (cluster.level > level) {
        level = cluster.level;
      }
    }
    return level;
  }

  addCluster() {
    const formValues = this.clusterForm.value;
    this.clusters = formValues.clusters;
    this.clusterService.updateCluster(this.clusters)
  }

  canHaveChild() {
    return this.clusters.length < 9 ? true : false;
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

  get clusters(): Cluster[] {
    return this._clusters;
  }

  @Input()
  set clusters(value: Cluster[]) {
    this._clusters = value;
  }
}
