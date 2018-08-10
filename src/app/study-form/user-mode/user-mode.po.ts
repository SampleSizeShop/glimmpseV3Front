import { by, element, protractor } from 'protractor';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/constants';

export class UserModeComponentPage {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.user_mode)) {
      if (source.user_mode === constants.USER_MODE.GUIDED) {
        this.selectGuided();
      }
      if (source.user_mode === constants.USER_MODE.FLEX) {
        this.selectFlex();
      }
    }
  }

  selectGuided() {
    element(by.id('guidedbtn')).click();
  }

  selectFlex() {
    element(by.id('flexbtn')).click();
  }
}
