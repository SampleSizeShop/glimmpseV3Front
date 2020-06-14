import { by, element } from 'protractor';

export class TypeOneErrorPo {

  fromJSON(source) {
      this.fillForm(source.type_one_error);
  }

  fillForm(input) {
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
