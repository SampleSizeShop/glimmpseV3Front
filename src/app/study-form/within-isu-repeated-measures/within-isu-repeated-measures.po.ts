import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class WithinIsuRepeatedMeasuresPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.repeated_measures)) {
      this.fillForm(source.repeated_measures);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      input.forEach(repeatedMeasure => {
        this.clickCreateBtn();
        this.fillDimensionAndUnits(repeatedMeasure);
        this.fillDataType(repeatedMeasure);
        this.fillNoRepeats(repeatedMeasure);
        this.fillValues(repeatedMeasure);
      });
    }
  }

  clickCreateBtn() {
    const createBtn = element(by.css('.btn-primary'));
    createBtn.click();
  }

  fillDimensionAndUnits(input) {
    if (!isNullOrUndefined(input.dimension)) {
      const dimensionInput = element(by.id('dimension'));
      dimensionInput.clear().then(() => dimensionInput.sendKeys(input.dimension));
    }
    if (!isNullOrUndefined(input.units)) {
      const dimensionInput = element(by.id('units'));
      dimensionInput.clear().then(() => dimensionInput.sendKeys(input.units));
    }
    element(by.id('dimnextbtn')).click();
  }

  fillDataType(input) {
    if (!isNullOrUndefined(input.type)) {
      element(by.id(input.type)).click();
    }
    element(by.id('typenextbtn')).click();
  }

  fillNoRepeats(input) {
    if (!isNullOrUndefined(input.values)) {
      const noRepeatsInput = element(by.id('repeats'));
      noRepeatsInput.clear().then(() => noRepeatsInput.sendKeys(input.values.length))
    }
    element(by.id('repnextbtn')).click();
  }

  fillValues(input) {
    if (!isNullOrUndefined(input.values)) {
      input.values.forEach((value, i) => {
        const valueInput = element(by.id('spacing-' + i));
        valueInput.clear().then(() => valueInput.sendKeys(value));
      });
    }
    element(by.id('spacenextbtn')).click();
  }
}
