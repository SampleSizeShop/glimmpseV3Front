import {Outcome} from "./Outcome";

/**
 * Model object for ClusterLevel, defining properties of each level of a cluster.
 */
interface ClusterLevelJSON {
  standardDeviation: number
}

export class ClusterLevel {
  levelName = '';
  noElements = 0;
  intraClassCorellation = 1;

  // fromJSON is used to convert an serialized version
  // of the ClusterLevel to an instance of the class
  static fromJSON(json: ClusterLevelJSON|string): ClusterLevel {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, ClusterLevel.reviver);
    } else {
      // create an instance of the StudyDesign class
      const clusterLevel = Object.create(ClusterLevel.prototype);
      // copy all the fields from the json object
      return Object.assign(clusterLevel, json, {
        // convert fields that need converting
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call ClusterLevel.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? ClusterLevel.fromJSON(value) : value;
  }
}
