import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersRepeatedMeasureCorellationsPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.parameters_repeated_measure_correlations)) {
      this.fillForm(source.parameters_repeated_measure_correlations);
    }
  }

  fillForm(outcomerepMeasStdev) {
    outcomerepMeasStdev.forEach((repMeas, i) => {
      this.fillTable(repMeas.table);
      if (i + 1 < outcomerepMeasStdev.length) {
        element(by.id('navigate_next')).click();
      }
    });
  }

  fillTable(table) {
    table.forEach((row, i) => {
      row.forEach((col, j) => {
        if (!isNullOrUndefined(col)) {
          const groupInput = element(by.id(i + '-' + j));
          groupInput.clear().then(() => groupInput.sendKeys(col));
        }
      });
    });
  }
}
