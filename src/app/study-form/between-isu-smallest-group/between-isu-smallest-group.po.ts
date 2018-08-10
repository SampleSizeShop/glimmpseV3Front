import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class BetweenIsuSmallestGroupPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.smallest_group)) {
      const smallestGroupInput = element(by.formControlName('smallestGroupSize'));
      smallestGroupInput.clear().then(() => smallestGroupInput.sendKeys(source.smallest_group));
    }
  }
}
