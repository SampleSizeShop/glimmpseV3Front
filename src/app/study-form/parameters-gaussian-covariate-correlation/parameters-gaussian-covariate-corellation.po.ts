import { by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersGaussianCovariateCorellationPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.parameters_gaussian_covariate_correlation)) {
      this.fillTable(source.parameters_gaussian_covariate_correlation);
    }
  }

  fillTable(correlations) {
    correlations.forEach((stdev, j) => {
      const groupInput = element(by.id(j.toString()));
      groupInput.clear().then(() => groupInput.sendKeys(stdev));
    });
  }
}
