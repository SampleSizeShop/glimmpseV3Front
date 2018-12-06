import {ISUFactorCombination} from './ISUFactorCombination';
import {ISUFactor, ISUFactorJSON} from './ISUFactor';
import {constants} from './constants';

interface PredictorJSON extends ISUFactorJSON {
  units: string;
  type: string;
}

export class Predictor extends ISUFactor {
  units: string;
  type: string;

  // fromJSON is used to convert an serialized version
  // of the Predictor to an instance of the class
  static fromJSON(json: PredictorJSON|string): Predictor {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Predictor.reviver);
    } else {
      // create an instance of the Predictor class
      const cluster = Object.create(Predictor.prototype);
      // copy all the fields from the json object
      return Object.assign(cluster, json, {
        // convert fields that need converting
        child: this.parseChild(json),
        partialMatrix: this.parsePartialMatrix(json),
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call Predictor.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? Predictor.fromJSON(value) : value;
  }
  constructor(name?: string) {
    if (name) {
      super(name);
    } else {
      super();
    }
    this.nature = constants.HYPOTHESIS_NATURE.BETWEEN;
    this.origin = constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR;
  }

  combineLists(combinations, childCombinations) {
    const newCombinations = [];
    combinations.forEach( combination => {
      childCombinations.forEach( childCombination => {
          const id = combination.id.concat(childCombination.id);
          newCombinations.push(new ISUFactorCombination(id));
      });
      }
    );
    return newCombinations;
  }

  get groups() {
    return this.valueNames
  }
}

