import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class HypothesisBetweenPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.hypothesis_between)) {
      this.fillForm(source.hypothesis_between);
    }
  }

  fillForm(hypothesis_between) {
    if (hypothesis_between.nature === 'custom') {
      this.selectCustom();
      this.fillCustom(hypothesis_between);
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
      const next = element(by.id('nextbtn'));
      rowsInput.clear().then(() => rowsInput.sendKeys(source.rows));
      next.click();
      this.fillCustomMatrix(source.matrix);
    }
  }

  fillCustomMatrix(cMatrix) {
    const done = element(by.id('donebtn'));
    cMatrix.forEach((row, i) => {
      row.forEach((col, j) => {
        const groupInput = element(by.id(i + '-' + j));
        groupInput.clear().then(() => groupInput.sendKeys(col));
      })
    });
    done.click();
  }
}
