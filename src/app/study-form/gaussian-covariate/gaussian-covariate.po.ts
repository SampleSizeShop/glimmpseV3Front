import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class GaussianCovariatePo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.gaussian_covariate)) {
      this.fillForm(source.gaussian_covariate);
    }
  }

  fillForm(gaussian_covariate) {
      this.clickCreateBtn();
      this.fillGaussianCovariate(gaussian_covariate);
  }

  clickCreateBtn() {
    const createBtn = element(by.id('includegaussiancovariatebtn'));
    createBtn.click();
  }

  fillGaussianCovariate(name) {
    const gaussianCovariateInput = element(by.formControlName('variance'));
    gaussianCovariateInput.clear().then(() => gaussianCovariateInput.sendKeys(name))
  }
}
