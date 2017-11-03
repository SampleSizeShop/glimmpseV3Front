import {ClusterLevel} from './ClusterLevel';
import {IsuFactor} from './HypothesisEffectVariable';

export class Cluster extends IsuFactor {
  elementName = '';
  levels: ClusterLevel[] = [];
}
