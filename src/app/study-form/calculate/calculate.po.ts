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
}
