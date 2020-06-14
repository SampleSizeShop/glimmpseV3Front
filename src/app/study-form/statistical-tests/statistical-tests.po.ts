import { by, element } from 'protractor';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/model/constants';

export class StatisticalTestsPo {

  fromJSON(source) {
    console.log('hello');
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.statistical_tests)) {
      // remove default selection of HLT
      element(by.id(constants.STATISTICAL_TESTS.HOTELLING_LAWLEY)).click();

      // Apply list
      source.statistical_tests.forEach(test => {
        const input = element(by.id(test));
        if (input.getAttribute('class').then(classStr => classStr === 'active')) {
          input.click();
        }
      });
    }
  }
}
