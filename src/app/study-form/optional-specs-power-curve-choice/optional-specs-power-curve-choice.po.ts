import {browser, by, element, protractor} from 'protractor';
import {isNullOrUndefined} from 'util';

export class OptionalSpecsPowerCurveChoicePo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.power_curve)) {
    }
  }
}
