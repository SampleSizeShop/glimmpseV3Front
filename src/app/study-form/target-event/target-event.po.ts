import { by, element } from 'protractor';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/constants';

export class TargetEventPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.target_event)) {
      if (source.target_event === constants.TARGET_EVENT.REJECT_NULL) {
        this.selectRejectionOnly();
      }
      if (source.target_event === constants.TARGET_EVENT.CI_WIDTH) {
        this.selectCIWidth();
      }
      if (source.target_event === constants.TARGET_EVENT.WAVR) {
        this.selectWAVR();
      }
    }
  }

  selectRejectionOnly() {
    element(by.id('rejectionbtn')).click();
  }

  selectCIWidth() {
    element(by.id('ciwidthbtn')).click();
  }

  selectWAVR() {
    element(by.id('wavrbtn')).click();
  }
}
