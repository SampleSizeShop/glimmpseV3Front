import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class HypothesisBetweenPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.hypothesis_between)) {
      this.fillForm(source.hypothesis_between);
    }
  }

  fillForm(hypothesis_between) {
  }
}
