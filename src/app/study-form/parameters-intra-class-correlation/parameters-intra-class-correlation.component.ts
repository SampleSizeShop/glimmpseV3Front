import { Component, OnInit } from '@angular/core';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs/Subscription';
import {ISUFactors} from '../../shared/ISUFactors';
import {Cluster} from '../../shared/Cluster';

@Component({
  selector: 'app-parameters-intra-class-correlation',
  templateUrl: './parameters-intra-class-correlation.component.html',
  styleUrls: ['./parameters-intra-class-correlation.component.scss']
})
export class ParametersIntraClassCorrelationComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _cluster: Cluster;

  constructor(private study_service: StudyService) {
      this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
        this.isuFactors = isuFactors;
      } );
  }

  ngOnInit() {
    this.cluster = this.isuFactors.cluster;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get cluster(): Cluster {
    return this._cluster;
  }

  set cluster(value: Cluster) {
    this._cluster = value;
  }
}
