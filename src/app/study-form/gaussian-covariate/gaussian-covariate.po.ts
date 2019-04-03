import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class GaussianCovariatePo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.gaussian_covariate)) {
      this.fillForm(source.gaussian_covariate);
    }
  }

  fillForm(gaussian_covariate) {
    if (!isNullOrUndefined(gaussian_covariate)) {
      this.clickCreateBtn();
    }
  }

  clickCreateBtn() {
    const createBtn = element(by.id('includegaussiancovariatebtn'));
    createBtn.click();
  }
}
