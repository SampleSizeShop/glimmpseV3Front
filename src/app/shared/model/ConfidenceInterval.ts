import {constants} from './constants';
import {isNullOrUndefined} from 'util';

interface ConfidenceIntervalJSON {
  beta_known: boolean;
  lower_tail: number;
  upper_tail: number;
  rank_est: number;
  n_est: number;
}

/**
 * Model object for gaussian covariate.
 */
export class ConfidenceInterval {
  beta_known: boolean;
  lower_tail: number;
  upper_tail: number;
  rank_est: number;
  n_est: number;

  // fromJSON is used to convert an serialized version
  // of the ConfidenceInterval to an instance of the class
  static fromJSON(json: ConfidenceIntervalJSON|string): ConfidenceInterval {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return json === 'null' ? null : JSON.parse(json, ConfidenceInterval.reviver);
    } else {
      // create an instance of the StudyDesign class
      const study = Object.create(ConfidenceInterval.prototype);
      // copy all the fields from the json object
      return Object.assign(study, json, {
        // convert fields that need converting
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call ConfidenceInterval.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? ConfidenceInterval.fromJSON(value) : value;
  }

  constructor(beta_known?: boolean,
              lower_tail?: number,
              upper_tail?: number,
              rank_est?: number,
              n_est?: number, ) {
    if (beta_known) {
      this.beta_known = beta_known;
    } else {
      this.beta_known = true;
    }
    if (lower_tail) {
      this.lower_tail = lower_tail;
    } else {
      this.lower_tail = 0.05;
    }
    if (lower_tail) {
      this.upper_tail = upper_tail;
    } else {
      this.upper_tail = 0.0;
    }
    if (lower_tail) {
      this.rank_est = rank_est;
    } else {
      this.rank_est = 1;
    }
    if (lower_tail) {
      this.n_est = n_est;
    } else {
      this.n_est = 1;
    }
  }
}
