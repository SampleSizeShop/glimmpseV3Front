import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersGaussianPowerPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.gaussian_covariate_method)) {
      this.fillForm(source.gaussian_covariate_method);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      const unconditionPowerchk = element(by.id('unconditionPowerchk'));
      const quantilePowerchk = element(by.id('quantilePowerchk'));
      if (input.unconditonpower) {
        unconditionPowerchk.click();
      }
      if (!input.quantilepower) {
        quantilePowerchk.click();
      }
      const quantilevalue = element(by.id('quantile'));
      const quantileAdd = element(by.id('addquantile'));
      if (input.quantiles) {
        input.quantiles.forEach(value => {
          quantilevalue.clear().then(() => quantilevalue.sendKeys(value));
          quantileAdd.click();
        });
      }
  }
}
}

