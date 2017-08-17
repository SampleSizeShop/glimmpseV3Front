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

  constructor(
    private _fb: FormBuilder,
    private _clusterService: ClusterService,
    private _cluster: Cluster
  ) { }

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

  addCluster() {
    const formValues = this.clusterForm.value;
    this.cluster = formValues;
    this.clusterService.updateCluster(this.cluster)
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
}
