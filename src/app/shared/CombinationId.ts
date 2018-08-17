/**
 * Model class used to generate a string factorName for a independent sampling unit (ISU) name and one of it's values.
 */
import {isNullOrUndefined} from 'util';

export class CombinationId {
  factorName: string;
  factorType: string;
  value: string;
  order = 0;

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

  equals(other: CombinationId) {
    if (this.label === other.label) {
      return true;
    } else {
      return false;
    }
  }
}
