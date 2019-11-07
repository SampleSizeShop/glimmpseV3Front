import { by, element } from 'protractor';

export class TargetPowerPo {

  fromJSON(source) {
    if (
      source !== null
      && source !== undefined
      && source.solve_for !== null
      && source.solve_for !== undefined
    ) {
      this.fillForm(source.solve_for);
    }
  }

  fillForm(input) {
    if (
      input !== null
      && input !== undefined
      && input.power !== null
      && input.power !== undefined
    ) {
      input.power.forEach( pow => {
        const powerInput = element(by.id('power'));
        powerInput.clear().then(() => powerInput.sendKeys(pow));
        element(by.id('addpower')).click();
      });
    }
  }
}
