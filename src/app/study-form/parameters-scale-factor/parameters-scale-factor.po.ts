import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersScaleFactorPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.parameters_scale_factor)) {
      this.fillForm(source.parameters_scale_factor);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      const del = element(by.id('removescalefactor'));
      del.click();
      const scaleFactorInput = element(by.id('scalefactor'));
      const scaleFactorAdd = element(by.id('addfactor'));
      for (const betascale of input) {
        scaleFactorInput.clear().then(() => scaleFactorInput.sendKeys(betascale));
        scaleFactorAdd.click();
      }
    }
  }
}
