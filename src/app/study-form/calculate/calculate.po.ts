import {by, element} from 'protractor';

export class CalculatePo {

  readOutput(): Promise<string> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('results')).isDisplayed()) {
        element(by.id('results')).getText().then(text => {
          const str = text;
          resolve(str);
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
  readPost(): Promise<string> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('reviewDataModel')).isDisplayed()) {
        element(by.id('reviewDataModel')).getText().then(text => {
          const str = text;
          resolve(str);
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
  readPower(index: number): Promise<number> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('power_' + index)).isDisplayed()) {
        element(by.id('power_' + index)).getText().then(text => {
          resolve(parseFloat(text));
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
}
