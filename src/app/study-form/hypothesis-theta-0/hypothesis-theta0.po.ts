import {browser, by, element, protractor} from 'protractor';
import {isNullOrUndefined} from 'util';

export class HypothesisTheta0Po {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.theta0)) {
      this.fillForm(source.theta0);
    }
  }

  fillForm(theta0) {
    element(by.id('showtheta0')).click();
    theta0.forEach((row, i) => {
      row.forEach((col, j) => {
        const elementInput = element(by.id(i + '-' + j));
        elementInput.clear().then(() => elementInput.sendKeys(col));
      })
    })
  }
}
