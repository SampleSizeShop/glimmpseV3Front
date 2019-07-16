import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class HypothesisMixedPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.hypothesis_between)) {
      this.fillForm(source);
    }
  }

  fillForm(source) {
    console.log(source.hypothesis_between.nature);
    if (source.hypothesis_between.nature === 'custom') {
      this.selectCustom();
      this.fillCustom(source);
      // the mathjax rendering causes a loss of focus issue. This is to prevent that causing the test to time out.
      browser.sleep(400);
    }
  }

  selectCustom() {
    const adv = element(by.id('pb'));
    adv.click();
    const input = element(by.id('customlbl'));
    if (input.getAttribute('class').then(classStr => classStr === 'active')) {
      input.click();
    }
  }

  fillCustom(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.hypothesis_between.rows)) {
      const rowsInput = element(by.formControlName('norows'));
      rowsInput.clear().then(() => rowsInput.sendKeys(source.hypothesis_between.rows));
      const next = element(by.id('nextbtn'));
      next.click();

      this.fillCustomMatrix(source.hypothesis_between.matrix);
      const withindone = element(by.id('betweendonebtn'));
      withindone.click();

      const colsInput = element(by.formControlName('nocols'));
      colsInput.clear().then(() => colsInput.sendKeys(source.hypothesis_within.cols));
      const nextCols = element(by.id('nextcolsbtn'));
      nextCols.click();

      this.fillCustomMatrix(source.hypothesis_within.matrix);
      const betweendone = element(by.id('withindonebtn'));
      betweendone.click();
    }
  }

  fillCustomMatrix(cMatrix) {
    cMatrix.forEach((row, i) => {
      row.forEach((col, j) => {
        const groupInput = element(by.id(i + '-' + j));
        groupInput.clear().then(() => groupInput.sendKeys(col));
      })
    });
  }
}
