/**
 * Model object used for comparing combinations of independent sampling units (ISUFactor)
 */
import {CombinationId} from './CombinationId';
import {isNullOrUndefined} from 'util';

interface ISUFactorCombinationJSON {
  id: Array<CombinationId>;
  value: number;
}

export class ISUFactorCombination {
  id: Array<CombinationId>;
  value = 1;

  static parseId(json: ISUFactorCombinationJSON) {
    if (!isNullOrUndefined(json.id)) {
      const list  = [];
      json.id.forEach( combinationId => {
        list.push(CombinationId.fromJSON(combinationId));
      });

      return list;
    } else {
      return null
    }
  }

  // fromJSON is used to convert an serialized version
  // of the ISUFactorCombination to an instance of the class
  static fromJSON(json: ISUFactorCombinationJSON|string): ISUFactorCombination {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, ISUFactorCombination.reviver);
    } else {
      // create an instance of the StudyDesign class
      const isuFactors = Object.create(ISUFactorCombination.prototype);
      // copy all the fields from the json object
      const ret =  Object.assign(isuFactors, json, {
        // convert fields that need converting
        id: this.parseId(json),
        value: json.value
      });
      return ret;
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call ISUFactors.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? ISUFactorCombination.fromJSON(value) : value;
  }

  constructor(id: Array<CombinationId>, value?: number) {
    this.id = id;
    if (value !== undefined) {
      this.value = value;
    }
  }

  get name() {
    let name = '';
    this.id.forEach( conbinationId => {
      name = name + conbinationId.tooltip + ', ' ;
    });
    name = name.substring(0, name.length - 2);
    name = name.trim();
    return name;
  }
}
