import {browser, by, element, protractor} from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersVarianceScaleFactorsPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.parameters_scale_factor_variance)) {
      this.fillForm(source.parameters_scale_factor_variance);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      const scaleFactorInput = element(by.id('scaleFactors'));
      input.forEach( scaleFactor => {
        scaleFactorInput.clear().then(() => scaleFactorInput.sendKeys(scaleFactor));
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
      });
    }
  }
}
