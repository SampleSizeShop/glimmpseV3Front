import { DemoAppFrontPage } from './app.po';

describe('demo-app-front App', () => {
  let page: DemoAppFrontPage;

  beforeEach(() => {
    page = new DemoAppFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });

  it('should display', () => {
  });

});
