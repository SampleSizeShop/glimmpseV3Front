import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class HypothesisEffectChoicePo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.hypothesis)) {
      const hypothesisRadio = element(by.id(source.hypothesis));
      hypothesisRadio.click();
    }
  }
}
