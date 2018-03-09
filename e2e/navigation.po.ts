import { browser, by, element } from 'protractor';

export class NavigationE2E {
    navigateToHome() {
      return browser.get('/design');
    };
  
    navigateTo(subURL: string) {
      return browser.get(subURL);
    };
  
    next(){
      element(by.id('navigate_next')).click();
    };

    refresh(){
      browser.refresh();
    }

    browserBack(){
      browser.navigate().back();
    }

    browserForward(){
      browser.navigate().forward();
    }

    getRouterURLString(){
     return browser.getCurrentUrl().then(url => url.split("/").pop());
    }

    getElementClass(cid: string){
      return element(by.id(cid)).getAttribute('class')
    }
  
    prev(){
      element(by.id('navigate_before')).click();
    };
  
    findContentById(cid: string){
      return element(by.id(cid))
    };
  
    findContentByClass(ccls: string){
      return element(by.className(ccls));
    };
  
    findAllcontentById(cid: string){
      return element.all(by.id(cid));
    };
  
    sleep(ms: number){
      browser.sleep(ms);
    };

    findAllByClass(ccls: string){
      return element.all(by.className(ccls));
    };

    findAllByTag(tag: string){
      return element.all(by.tagName(tag));
    };
  
    findByTag(tag: string){
      return element(by.tagName(tag));
    };
  
    findByCssWithText(cls: string, txt: string){
      return element(by.cssContainingText(cls, txt))
    };

  }