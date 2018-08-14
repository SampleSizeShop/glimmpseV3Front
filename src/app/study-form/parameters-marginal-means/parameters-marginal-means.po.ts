import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersMarginalMeansPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.marginal_means)) {
      this.fillForm(source.marginal_means);
    }
  }

  fillForm(mean_tables) {
    mean_tables.forEach((table, i) => {
      this.fillTable(table.means);
      if (i + 1 < mean_tables.length) {
        element(by.id('navigate_next')).click();
      }
    });
  }

  fillTable(table) {
    table.forEach((row, i) => {
      row.forEach((col, j) => {
        const groupInput = element(by.id(i + '-' + j));
        groupInput.clear().then(() => groupInput.sendKeys(col));
      })
    })
  }
}
