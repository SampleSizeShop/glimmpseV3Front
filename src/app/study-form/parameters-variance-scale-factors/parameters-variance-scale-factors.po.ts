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
      const del = element(by.id('removescalefactor'));
      del.click();
      const scaleFactorInput = element(by.id('scaleFactors'));
      const scaleFactorAdd = element(by.id('addscaleFactor'));
      input.forEach( scaleFactor => {
        scaleFactorInput.clear().then(() => scaleFactorInput.sendKeys(scaleFactor));
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        scaleFactorAdd.click();
      });
    }
  }
}
