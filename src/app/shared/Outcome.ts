import {ISUFactor, ISUFactorJSON} from './ISUFactor';
import {constants} from './constants';

interface OutcomeJSON extends ISUFactorJSON {
  standardDeviation: number
}

export class Outcome extends ISUFactor {
  standardDeviation: number;

  // fromJSON is used to convert an serialized version
  // of the Outcome to an instance of the class
  static fromJSON(json: OutcomeJSON|string): Outcome {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Outcome.reviver);
    } else {
      // create an instance of the StudyDesign class
      const outcome = Object.create(Outcome.prototype);
      // copy all the fields from the json object
      return Object.assign(outcome, json, {
        // convert fields that need converting
        child: this.parseChild(json),
        partialMatrix: this.parsePartialMatrix(json),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Outcome.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? Outcome.fromJSON(value) : value;
  }

  constructor(name: string ) {
    super(name);
    this.nature = constants.HYPOTHESIS_NATURE.WITHIN;
    this.origin = constants.HYPOTHESIS_ORIGIN.OUTCOME;
    this.standardDeviation = 1;
  }
}
