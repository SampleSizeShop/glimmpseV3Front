import { by, element } from 'protractor';
import {constants} from '../../shared/model/constants';

export class SolveForPo {

  fromJSON(source) {
    if (
      source !== null
      && source !== undefined
      && source.solve_for !== null
      && source.solve_for !== undefined
    ) {
      if (source.solve_for.solve_for === constants.SOLVE_FOR.POWER) {
        this.selectPower();
      }
      if (source.solve_for.solve_for === constants.SOLVE_FOR.SAMPLE_SIZE) {
        this.selectSampleSize();
      }
    }
  }

  selectPower() {
    const powerBtn = element(by.id('powerbtn'));
    const probBtn = element(by.id('probabilitybtn'));
    if (powerBtn !== null && powerBtn !== undefined) {
      powerBtn.click();
    } else if (probBtn !== null && probBtn !== undefined ) {
      probBtn.click();
    }
  }

  selectSampleSize() {
    element(by.id('samplesizebtn')).click();
  }
}
