import {browser, by, element} from 'protractor';
import {isNullOrUndefined} from 'util';

export class OptionalSpecsConfidenceIntervalsPo {

  fromJSON(source) {
    if (!isNullOrUndefined(source) && !isNullOrUndefined(source.confidence_interval)) {
      this.fillForm(source.confidence_interval);
    }
  }

  fillForm(input) {
    if (!isNullOrUndefined(input)) {
      const cibutton = element(by.id('removeconfidenceintervalsbtn'));
      cibutton.click();
      const betasigmabothestbutton = element(by.id('betaestimatedbtn'));
      const lowertailprob = element(by.id('lowertail'));
      const uppertailprob = element(by.id('uppertail'));
      const rankofdesign = element(by.id('rankest'));
      const samplesizeforbetasigma = element(by.id('samplesizeest'));
      if (!input.betaknown) {
        betasigmabothestbutton.click();
      }
      lowertailprob.clear().then(() => lowertailprob.sendKeys(input.lowertailprob));
      uppertailprob.clear().then(() => uppertailprob.sendKeys(input.uppertailprob));
      rankofdesign.clear().then(() => rankofdesign.sendKeys(input.rankofdesign));
      samplesizeforbetasigma.clear().then(() => samplesizeforbetasigma.sendKeys(input.samplesizeforbetasigma));
    }
  }
}
