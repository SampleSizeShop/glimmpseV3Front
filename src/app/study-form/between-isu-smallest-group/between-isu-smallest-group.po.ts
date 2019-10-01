import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class BetweenIsuSmallestGroupPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.smallest_group)) {
      this.fillForm(source.smallest_group);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      const smallestGroupInput = element(by.id('smallestgroupsize'));
      const smallestGroupAdd = element(by.id('addgroupsize'));
      for (const groupsize of input) {
        smallestGroupInput.clear().then(() => smallestGroupInput.sendKeys(groupsize));
        smallestGroupAdd.click();
      }
    }
  }
}
