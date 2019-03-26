import {constants} from './constants';
import {isNullOrUndefined} from "util";

interface GaussianCovariateJSON {
  standard_deviation: number;
  power_method: Array<String>;
}

/**
 * Model object for gaussian covariate.
 */
export class GaussianCovariate {
  standard_deviation: number;
  power_method: Array<String>;

  // fromJSON is used to convert an serialized version
  // of the GaussianCovariate to an instance of the class
  static fromJSON(json: GaussianCovariateJSON|string): GaussianCovariate {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return json === 'null' ? null : JSON.parse(json, GaussianCovariate.reviver);
    } else {
      // create an instance of the StudyDesign class
      const study = Object.create(GaussianCovariate.prototype);
      // copy all the fields from the json object
      return Object.assign(study, json, {
        // convert fields that need converting
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call GaussianCovariate.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? GaussianCovariate.fromJSON(value) : value;
  }

  isQuantile(): boolean {
    if (isNullOrUndefined(this.power_method)) {
      return false;
    } else {
      return this.power_method.indexOf(constants.POWER_METHOD.QUANTILE) !== -1
    }
  }

  isUnconditional(): boolean {
    if (isNullOrUndefined(this.power_method)) {
      return false;
    } else {
      return this.power_method.indexOf(constants.POWER_METHOD.UNCONDITIONAL) !== -1
    }
  }
}
