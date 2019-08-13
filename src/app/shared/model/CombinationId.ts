/**
 * Model class used to generate a string factorName for a independent sampling unit (ISU) name and one of it's values.
 */
import {isNullOrUndefined} from 'util';

interface CombinationIdJSON {
  factorName: string;
  factorType: string;
  value: string;
  order: number;
}

export class CombinationId {
  factorName: string;
  factorType: string;
  value: string;
  order = 0;

  // fromJSON is used to convert an serialized version
  // of the CombinationId to an instance of the class
  static fromJSON(json: CombinationIdJSON|string): CombinationId {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, CombinationId.reviver);
    } else {
      // create an instance of the StudyDesign class
      const combinationId = Object.create(CombinationId.prototype);
      // copy all the fields from the json object
      return Object.assign(combinationId, json, {
        // convert fields that need converting
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call CombinationId.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === '' ? CombinationId.fromJSON(value) : value;
  }

  constructor(factorName: string, factorType: string,  value?: string, order?: number) {
    this.factorName = factorName;
    this.factorType = factorType;
    if (!isNullOrUndefined(value)) {
      this.value = value;
    }
    if (!isNullOrUndefined(order)) {
      this.order = order;
    }
  }

  get label() {
    let label = this.factorName;
    if ((this.factorType !== 'outcome') && !isNullOrUndefined(this.value)) {
      label = label + this.value;
    }
    return label;
  }

  get tooltip() {
    let label = this.factorName;
    if ((this.factorType !== 'outcome') && !isNullOrUndefined(this.value)) {
      label = label + ': ' + this.value;
    }
    return label;
  }

  equals(other: CombinationId) {
    if (this.label === other.label) {
      return true;
    } else {
      return false;
    }
  }
}
