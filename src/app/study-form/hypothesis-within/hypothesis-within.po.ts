import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class HypothesisWithinPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.hypothesis_within)) {
      this.fillForm(source.hypothesis_within);
    }
  }

  fillForm(hypothesis_within) {
  }
}
