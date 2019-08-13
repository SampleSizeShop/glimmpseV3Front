import {by, element} from 'protractor';
import {constants} from '../../shared/model/constants';

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
  readTargetPower(index: number, solveFor: string): Promise<number> {
    if (solveFor !== constants.SOLVE_FOR.SAMPLE_SIZE) {
      return new Promise((resolve) => {
        resolve(null);
      })
    }
    return new Promise( (resolve, reject) => {
      if (element(by.id('targetpower_' + index)).isDisplayed()) {
        element(by.id('targetpower_' + index)).getText().then(text => {
          resolve(parseFloat(text));
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
  readMeansScaleFactor(index: number): Promise<number> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('means_scale_factor_' + index)).isDisplayed()) {
        element(by.id('means_scale_factor_' + index)).getText().then(text => {
          resolve(parseFloat(text));
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
  readVarianceScaleFactor(index: number): Promise<number> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('variance_scale_factor_' + index)).isDisplayed()) {
        element(by.id('variance_scale_factor_' + index)).getText().then(text => {
          resolve(parseFloat(text));
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
  readTest(index: number): Promise<string> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('test_' + index)).isDisplayed()) {
        element(by.id('test_' + index)).getText().then(text => {
          resolve(text);
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
  readAlpha(index: number): Promise<number> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('alpha_' + index)).isDisplayed()) {
        element(by.id('alpha_' + index)).getText().then(text => {
          resolve(parseFloat(text));
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
  readGroupCombination(indexX: number, indexY: number): Promise<string> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('group_' + indexX + '_' + indexY)).isDisplayed()) {
        element(by.id('group_' + indexX + '_' + indexY)).getText().then(text => {
          resolve(text);
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
  readTotalSampleSize(): Promise<number> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('totalsamplesize')).isDisplayed()) {
        element(by.id('totalsamplesize')).getText().then(text => {
          resolve(parseFloat(text));
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
  readPerGroupSampleSize(index: number): Promise<number> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('per_group_sample_size_' + index)).isDisplayed()) {
        element(by.id('per_group_sample_size_' + index)).getText().then(text => {
          resolve(parseFloat(text));
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }

  readPredictor(index: number): Promise<string> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('predictor_' + index)).isDisplayed()) {
        element(by.id('predictor_' + index)).getText().then(text => {
          resolve(text);
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }

  readLevel(index: number): Promise<string> {
    return new Promise( (resolve, reject) => {
      if (element(by.id('level_' + index)).isDisplayed()) {
        element(by.id('level_' + index)).getText().then(text => {
          const result = text.split(' ').pop();
          resolve(result);
        });
      } else {
        console.log('nope');
        reject(false);
      }
    });
  }
}
