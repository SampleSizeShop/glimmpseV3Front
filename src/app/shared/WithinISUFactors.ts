import {RepeatedMeasure} from './RepeatedMeasure';
import {Cluster} from './Cluster';

export class WithinISUFactors {
  outcomes: Set<string> = new Set<string>();
  repeatedMeasures: RepeatedMeasure[] = null;
  cluster: Cluster = null;
}
