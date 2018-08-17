import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class OptionalSpecsPowerMethodPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.power_method)) {
      this.fillForm(source.power_method);
    }
  }

  fillForm(hypothesis_within) {
  }
}
