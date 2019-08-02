import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class WithinIsuClustersPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.cluster)) {
      this.fillForm(source.cluster);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      this.clickCreateBtn();
      this.fillElementName(input);
      this.fillLevels(input);
    }
  }

  clickCreateBtn() {
    const createBtn = element(by.css('.btn-primary'));
    createBtn.click();
  }

  fillElementName(input) {
    if (!isNullOrUndefined(input.element)) {
      const noRepeatsInput = element(by.id('name'));
      noRepeatsInput.clear().then(() => noRepeatsInput.sendKeys(input.element))
    }
    const nextBtn = element(by.id('addISU'));
    nextBtn.click();
  }

  fillLevels(input) {
    input.levels.forEach(level => {
      if (!isNullOrUndefined(level)) {
        const nameInput = element(by.id('levelName'));
        nameInput.clear().then(() => nameInput.sendKeys(level.name));
      }
      if (!isNullOrUndefined(level.no_elements)) {
        const noElementsInput = element(by.id('noElements'));
        noElementsInput.clear().then(() => noElementsInput.sendKeys(level.no_elements));
      }
      element(by.id('addLevel')).click();
    });
    const nextBtn = element(by.css('.btn-primary'));
    nextBtn.click();
  }
}
