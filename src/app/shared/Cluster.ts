import {Injectable} from '@angular/core';

@Injectable()
export class Cluster {
  private _elementName: string;
  private _clusterLevel: string;
  private _noElements: number;
  private _childCluster: Cluster;
  private _intraClassCorrelation: number;
  private _variance: number;

  constructor() {
    this.elementName = '';
    this.clusterLevel = '';
    this.noElements = 0;
    this.childCluster = null;
    this.intraClassCorrelation = 0;
    this.variance = 0;
  }

  get elementName(): string {
    return this._elementName;
  }

  set elementName(value: string) {
    this._elementName = value;
  }

  get clusterLevel(): string {
    return this._clusterLevel;
  }

  set clusterLevel(value: string) {
    this._clusterLevel = value;
  }

  get noElements(): number {
    return this._noElements;
  }

  set noElements(value: number) {
    this._noElements = value;
  }

  get childCluster(): Cluster {
    return this._childCluster;
  }

  set childCluster(value: Cluster) {
    this._childCluster = value;
  }

  get variance(): number {
    return this._variance;
  }

  set variance(value: number) {
    this._variance = value;
  }

  get intraClassCorrelation(): number {
    return this._intraClassCorrelation;
  }

  set intraClassCorrelation(value: number) {
    this._intraClassCorrelation = value;
  }
}
