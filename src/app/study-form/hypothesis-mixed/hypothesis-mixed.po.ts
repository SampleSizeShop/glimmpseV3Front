import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class HypothesisMixedPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.hypothesis_between)) {
      this.fillForm(source.hypothesis_between);
    }
  }

  fillForm(hypothesis_between) {
    if (hypothesis_between.nature === 'custom') {
      this.selectCustom();
      this.fillCustom(hypothesis_between);
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
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.rows)) {
      const rowsInput = element(by.formControlName('norows'));
      rowsInput.clear().then(() => rowsInput.sendKeys(source.rows));
      const next = element(by.id('nextbtn'));
      next.click();
      this.fillCustomMatrix(source.matrix);
    }
  }

  fillCustomMatrix(cMatrix) {
    cMatrix.forEach((row, i) => {
      row.forEach((col, j) => {
        const groupInput = element(by.id(i + '-' + j));
        groupInput.clear().then(() => groupInput.sendKeys(col));
      })
    });
    const done = element(by.id('donebtn'));
    done.click();
  }
}
