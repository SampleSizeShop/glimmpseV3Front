import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersRepeatedMeasureOutcomeStdevPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.parameters_outcome_repeated_measure_stdev)) {
      this.fillForm(source.parameters_outcome_repeated_measure_stdev);
    }
  }

  fillForm(outcomerepMeasStdev) {
    outcomerepMeasStdev.forEach((repMeas, i) => {
      this.fillTable(repMeas);
      if (i + 1 < outcomerepMeasStdev.length) {
        element(by.id('navigate_next')).click();
      }
    });
  }

  fillTable(reapMeas) {
    reapMeas.stdevs.forEach((stdev, j) => {
      const groupInput = element(by.id(j.toString()));
      groupInput.clear().then(() => groupInput.sendKeys(stdev));
    });
  }
}
