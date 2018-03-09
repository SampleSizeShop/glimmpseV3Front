/**
 * Model object used for storing outcome vs repeated measure standard deviations
 */
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
}
