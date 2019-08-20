import { by, element } from 'protractor';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/model/constants';

export class SolveForPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.solve_for)) {
      if (source.solve_for.solve_for === constants.SOLVE_FOR.POWER) {
        this.selectPower();
      }
      if (source.solve_for.solve_for === constants.SOLVE_FOR.SAMPLE_SIZE) {
        this.selectSampleSize();
        this.fillForm(source.solve_for);
      }
    }
  }

  selectPower() {
    if (!isNullOrUndefined(element(by.id('powerbtn')))) {
      element(by.id('powerbtn')).click();
    } else if (!isNullOrUndefined(element(by.id('probabilitybtn')))) {
      element(by.id('probabilitybtn')).click();
    }
  }

  selectSampleSize() {
    element(by.id('samplesizebtn')).click();
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      if (!isNullOrUndefined(input.power)) {
        input.power.forEach( pow => {
          const powerInput = element(by.id('power'));
          powerInput.clear().then(() => powerInput.sendKeys(pow));
          element(by.id('addpower')).click();
        });
      }
    }
  }
}
