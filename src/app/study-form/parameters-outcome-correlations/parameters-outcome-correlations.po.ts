import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersOutcomeCorrelationsPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.parameters_outcome_correlation)) {
      this.fillTable(source.parameters_outcome_correlation);
    }
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
