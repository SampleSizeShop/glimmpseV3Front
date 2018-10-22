import {by, element} from 'protractor';
import {isNullOrUndefined} from 'util';
import {constants} from "../../shared/constants";

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
      this.fillType(predictor.type);
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
  }

  fillType(predictorType) {
    const noRepeatsInput = element(by.formControlName('predictorName'));
    let btn;
    if (predictorType === constants.BETWEEN_ISU_TYPES.NOMINAL) {
      btn = element(by.formControlName('nominalbtn'));
    } else if (predictorType === constants.BETWEEN_ISU_TYPES.ORDINAL) {
      btn = element(by.formControlName('ordinalbtn'));
    } else {
      btn = element(by.formControlName('continuousbtn'));
    }
    btn.click();
    const next = btn = element(by.formControlName('addtypebtn'));
    next.click();
  }

  fillGroups(groups) {
    const nameInput = element(by.id('group'));
    groups.forEach(group => {
      nameInput.clear().then(() => nameInput.sendKeys(group));
      element(by.id('addgroup')).click();
    });
  }
}
