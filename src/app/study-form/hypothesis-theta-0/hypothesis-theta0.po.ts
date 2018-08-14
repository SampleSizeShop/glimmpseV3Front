import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class HypothesisTheta0Po {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.theta0)) {
      this.fillForm(source.theta0);
    }
  }

  fillForm(theta0) {
  }
}
