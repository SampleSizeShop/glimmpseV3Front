import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class ParametersStandardDeviationPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.parameters_standard_deviation)) {
      this.fillForm(source.parameters_standard_deviation);
    }
  }

  fillForm(input) {
    input.forEach(outcome => {
      const stDevInput = element(by.id(outcome.outcome));
      stDevInput.clear().then(() => stDevInput.sendKeys(outcome.st_dev));
    });
  }
}
