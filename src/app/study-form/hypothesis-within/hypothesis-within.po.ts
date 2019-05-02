import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class HypothesisWithinPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.hypothesis_within)) {
      this.fillForm(source.hypothesis_within);
    }
  }

  fillForm(hypothesis_within) {
    if (hypothesis_within.nature === 'custom') {
      this.selectCustom();
      this.fillCustom(hypothesis_within);
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
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.cols)) {
      const cols = element(by.formControlName('nocols'));
      const next = element(by.id('nextbtn'));
      cols.clear().then(() => cols.sendKeys(source.cols));
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
