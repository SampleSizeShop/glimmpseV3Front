import {ClusterLevel} from './ClusterLevel';
import {constants} from './constants';
import {ISUFactor} from './ISUFactor';

/**
 * Model object for Cluster.
 */
export class Cluster extends ISUFactor {
  levels: ClusterLevel[] = [];

  /**
   * Default constructor.
   * @param {string} name
   */
  constructor(name?: string) {
    super(name);
    this.nature = constants.HYPOTHESIS_NATURE.WITHIN;
    this.origin = constants.HYPOTHESIS_ORIGIN.CLUSTER;
  }

  levelRelation(level1, level2) {
    return level1['noElements'] + ' ' + level2['levelName'] + ' in each ' + level1['levelName'];
  }

  levelConclusion() {
    let totalCluster = 1;
    for (const level of this.levels) {
      totalCluster *= level['noElements'];
    }

    return '(a total of ' + totalCluster + ' ' + this.name + ' in each ' + this.levels[0]['levelName'] + ')'
  }

  buildClusterOverview() {
    const clusterOverview: String[] = [];
    const boundClusterLevel = new ClusterLevel();
    boundClusterLevel.levelName = this.name;
    boundClusterLevel.noElements = 1;

    const clusterLevelsBounded = this.levels.concat([boundClusterLevel]);

    for (let i = 0; i < clusterLevelsBounded.slice(0, -1).length ; i++) {
      clusterOverview.push(this.levelRelation(clusterLevelsBounded[i], clusterLevelsBounded[i + 1]));
    }

    clusterOverview.push(this.levelConclusion());

    return clusterOverview
  }
}
