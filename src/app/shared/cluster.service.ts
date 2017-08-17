import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Cluster} from './Cluster';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ClusterService {
  private _clusterSource = new Subject<Cluster>();
  private _cluster$ = this.clusterSource.asObservable();

  updateCluster(cluster: Cluster) {
    this.clusterSource.next(cluster);
  }

  get clusterSource(): Subject<Cluster> {
    return this._clusterSource;
  }

  get cluster$(): Observable<Cluster> {
    return this._cluster$;
  }
}
