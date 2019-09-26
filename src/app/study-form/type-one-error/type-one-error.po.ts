import { by, element } from 'protractor';
import {isNullOrUndefined} from 'util';

export class TypeOneErrorPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.type_one_error)) {
      this.fillForm(source.type_one_error);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      // remove default value
      const remove = element(by.id('removealpha'));
      remove.click();
      const typeOneErrorInput = element(by.id('typeoneerror'));
      const typeOneErrorAdd = element(by.id('addalpha'));
      for (const alpha of input) {
        typeOneErrorInput.clear().then(() => typeOneErrorInput.sendKeys(alpha));
        typeOneErrorAdd.click();
      }
    }
  }
}
