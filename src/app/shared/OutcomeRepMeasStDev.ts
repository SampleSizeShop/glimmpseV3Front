/**
 * Model object used for storing outcome vs repeated measure standard deviations
 */
import {isNullOrUndefined} from "util";

export class OutcomeRepMeasStDev {
  outcome: string;
  repMeasure: string;
  values: Map<string, number>;

  constructor(outcome: string, repMeasure: string, values?: Map<string, number>) {
    this.outcome = outcome;
    this.repMeasure = repMeasure;
    if (values) {
      this.values = values;
    }
  }

  toJSON() {
    const vals = []
    if (!isNullOrUndefined(this.values) && this.values.size > 0) {
      this.values.forEach( value => {vals.push(value)});
    }
    return {
      outcome: this.outcome,
      repMeasure: this.repMeasure,
      values: vals
    };
  }
}
