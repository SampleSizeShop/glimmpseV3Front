import {ClusterLevel} from './ClusterLevel';
import {ISUFactor} from './ISUFactor';

export class Cluster extends ISUFactor {
  elementName = '';
  levels: ClusterLevel[] = [];
}
