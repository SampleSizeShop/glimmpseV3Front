import { by, element } from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersScaleFactorPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.parameters_scale_factor)) {
      this.fillForm(source.parameters_scale_factor);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      const scaleFactorInput = element(by.id('scalefactor'));
      scaleFactorInput.clear().then(() => scaleFactorInput.sendKeys(input));
    }
  }
}
