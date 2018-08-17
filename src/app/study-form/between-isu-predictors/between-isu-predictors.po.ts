import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class BetweenIsuPredictorsPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.predictors)) {
      this.fillForm(source.predictors);
    }
  }

  fillForm(predictors) {
    predictors.forEach(predictor => {
      this.clickCreateBtn();
      this.fillPredictorName(predictor.name);
      this.fillGroups(predictor.groups);
    });

  }

  clickCreateBtn() {
    const createBtn = element(by.css('.btn-primary'));
    createBtn.click();
  }

  fillPredictorName(name) {
    const noRepeatsInput = element(by.formControlName('predictorName'));
    noRepeatsInput.clear().then(() => noRepeatsInput.sendKeys(name))
    element(by.id('navigate_next')).click();
  }

  fillGroups(groups) {
    const nameInput = element(by.id('group'));
    groups.forEach(group => {
      nameInput.clear().then(() => nameInput.sendKeys(group));
      element(by.id('addgroup')).click();
    });
    element(by.id('navigate_next')).click();
  }
}
