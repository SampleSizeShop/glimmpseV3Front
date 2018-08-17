import {browser, by, element, protractor} from 'protractor';
import {isNullOrUndefined} from 'util';

export class WithinIsuOutcomesPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.outcomes)) {
      this.fillForm(source.outcomes);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      const outcomeInput = element(by.id('outcomes'));
      input.forEach( outcome => {
        outcomeInput.clear().then(() => outcomeInput.sendKeys(outcome));
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
      });
    }
  }
}
