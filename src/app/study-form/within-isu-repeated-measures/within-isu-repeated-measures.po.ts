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
    element(by.id('navigate_next')).click();
  }

  fillDataType(input) {
    if (!isNullOrUndefined(input.type)) {
      const typeInput = element(by.id('type'));
      typeInput.click()
      typeInput.sendKeys(input.type.charAt(0));
    }
    element(by.id('navigate_next')).click();
  }

  fillNoRepeats(input) {
    if (!isNullOrUndefined(input.values)) {
      const noRepeatsInput = element(by.id('repeats'));
      noRepeatsInput.clear().then(() => noRepeatsInput.sendKeys(input.values.length))
    }
    element(by.id('navigate_next')).click();
  }

  fillValues(input) {
    if (!isNullOrUndefined(input.values)) {
      input.values.forEach((value, i) => {
        const valueInput = element(by.id('spacing-' + i));
        valueInput.clear().then(() => valueInput.sendKeys(value));
      });
    }
    element(by.id('navigate_next')).click();
  }
}
