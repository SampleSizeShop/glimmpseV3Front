import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class BetweenIsuGroupsPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.groups)) {
      this.fillForm(source.groups);
    }
  }

  fillForm(groups) {
    groups.forEach((group, i) => {
      this.fillTable(group.table);
      if (i + 1 < groups.length) {
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
