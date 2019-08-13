import {ClusterLevel} from './ClusterLevel';
import {constants} from './constants';
import {ISUFactor, ISUFactorJSON} from './ISUFactor';
import {isNullOrUndefined} from 'util';

interface ClusterJSON extends ISUFactorJSON {
  levels: Array<ClusterLevel>;
}

/**
 * Model object for Cluster.
 */
export class Cluster extends ISUFactor {
  levels: ClusterLevel[] = [];

  static parseClusterLevels(json: ClusterJSON) {
    const list = [];
    if (!isNullOrUndefined(json.levels)){
      json.levels.forEach(level => {
        list.push(ClusterLevel.fromJSON(JSON.stringify(level)));
      });
      return list;
    } else {
      return null;
    }
  }

  // fromJSON is used to convert an serialized version
  // of the Cluster to an instance of the class
  static fromJSON(json: ClusterJSON|string): Cluster {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Cluster.reviver);
    } else {
      // create an instance of the Cluster class
      const cluster = Object.create(Cluster.prototype);
      // copy all the fields from the json object
      return Object.assign(cluster, json, {
        // convert fields that need converting
        child: this.parseChild(json),
        partialMatrix: this.parsePartialMatrix(json),
        levels: this.parseClusterLevels(json),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Cluster.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? Cluster.fromJSON(value) : value;
  }

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
