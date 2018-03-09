import { browser, by, element } from 'protractor';

export class DemoAppFrontPage {
  navigateTo() {
    return browser.get('/');
  }
}
