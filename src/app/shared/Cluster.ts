import {ClusterLevel} from './ClusterLevel';
import {HypothesisEffectVariable} from './HypothesisEffectVariable';

export class Cluster extends HypothesisEffectVariable {
  elementName = '';
  levels: ClusterLevel[] = [];
}
