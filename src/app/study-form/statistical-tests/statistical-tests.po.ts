import { by, element } from 'protractor';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/model/constants';

export class StatisticalTestsPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.statistical_tests)) {
      // remove default selection of HLT
      element(by.id('hlt')).click();

      // Apply list
      source.statistical_tests.forEach(test => {
        if (test === constants.STATISTICAL_TESTS.HOTELLING_LAWLEY) {
          this.selectHLT();
        } else if (test === constants.STATISTICAL_TESTS.PILLAI_BARTLET) {
          this.selectPB();
        } else if (test === constants.STATISTICAL_TESTS.WILKS_LIKLIEHOOD) {
          this.selectWL();
        } else if (test === constants.STATISTICAL_TESTS.BOX_CORRECTION) {
          this.selectBC();
        } else if (test === constants.STATISTICAL_TESTS.GEISSER_GREENHOUSE) {
          this.selectGG();
        } else if (test === constants.STATISTICAL_TESTS.HUYNH_FELDT) {
          this.selectHF();
        } else if (test === constants.STATISTICAL_TESTS.UNCORRECTED) {
          this.selectUC();
        }
      });
    }
  }

  selectHLT() {
    const input = element(by.id('hlt'));
    if (input.getAttribute('class').then(classStr => classStr === 'active')) {
      input.click();
    }
  }

  selectPB() {
    const input = element(by.id('pb'));
    if (input.getAttribute('class').then(classStr => classStr === 'active')) {
      input.click();
    }
  }

  selectWL() {
    const input = element(by.id('wl'));
    if (input.getAttribute('class').then(classStr => classStr === 'active')) {
      input.click();
    }
  }

  selectBC() {
    const input = element(by.id('bc'));
    if (input.getAttribute('class').then(classStr => classStr === 'active')) {
      input.click();
    }
  }

  selectGG() {
    const input = element(by.id('gg'));
    if (input.getAttribute('class').then(classStr => classStr === 'active')) {
      input.click();
    }
  }

  selectHF() {
    const input = element(by.id('hf'));
    if (input.getAttribute('class').then(classStr => classStr === 'active')) {
      input.click();
    }
  }

  selectUC() {
    const input = element(by.id('uc'));
    if (input.getAttribute('class').then(classStr => classStr === 'active')) {
      input.click();
    }
  }
}
