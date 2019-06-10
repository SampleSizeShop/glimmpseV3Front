import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersGaussianCovariateVariancePo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.parameters_gaussian_covariate_variance)) {
      const groupInput = element(by.id('variance'));
      groupInput.clear().then(() => groupInput.sendKeys(source.parameters_gaussian_covariate_variance));
    }
  }
}
