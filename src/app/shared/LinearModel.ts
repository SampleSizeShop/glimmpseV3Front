import {isNullOrUndefined} from 'util';


interface LinearModelJSON {
  total_n: number;
  errors: string;
  target_power: number;
  means_scale_factor: number;
  variance_scale_factor: number;
  test: number;
  alpha: number;
}

export class LinearModel {
  total_n: number;
  errors: string;
  target_power: number;
  means_scale_factor: number;
  variance_scale_factor: number;
  test: string;
  alpha: number;

  static fromJSON(json: LinearModelJSON|string): LinearModel {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, LinearModel.reviver);
    } else {
      // create an instance of the StudyDesign class
      const linearmodel = Object.create(LinearModel.prototype);
      // copy all the fields linearmodel the json object
      return Object.assign(linearmodel, json, {
        // convert fields that need converting
        total_n: this.parseTotalN(json),
        errors: this.parseErrors(json),
        target_power: this.parseTargetPower(json),
        means_scale_factor: this.parseMeanScaleFactor(json),
        variance_scale_factor: this.parseVarianceScaleFactor(json),
        test: this.parseTest(json),
        alpha: this.parseAlpha(json),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Results.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? this.fromJSON(value) : value;
  }

  static parseTotalN(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.total_n)) {
      this.fromJSON(JSON.stringify(json.total_n))
    } else {
      return null;
    }
  }

  static parseErrors(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.errors)) {
      this.fromJSON(JSON.stringify(json.errors))
    } else {
      return null;
    }
  }

  static parseTargetPower(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.target_power)) {
      this.fromJSON(JSON.stringify(json.target_power))
    } else {
      return null;
    }
  }

  static parseMeanScaleFactor(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.means_scale_factor)) {
      this.fromJSON(JSON.stringify(json.means_scale_factor))
    } else {
      return null;
    }
  }

  static parseVarianceScaleFactor(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.variance_scale_factor)) {
      this.fromJSON(JSON.stringify(json.variance_scale_factor))
    } else {
      return null;
    }
  }

  static parseTest(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.test)) {
      this.fromJSON(JSON.stringify(json.test))
    } else {
      return null;
    }
  }

  static parseAlpha(json: LinearModelJSON) {
    if (!isNullOrUndefined(json.alpha)) {
      this.fromJSON(JSON.stringify(json.alpha))
    } else {
      return null;
    }
  }

  constructor() {}
}
