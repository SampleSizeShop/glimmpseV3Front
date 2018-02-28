import { NavigationE2E } from './navigation.po';

describe('demo-front-app navigation test', () => {
    let page: NavigationE2E;

    beforeEach(() => {
        page = new NavigationE2E();
        page.navigateToHome();
    });

    it('basic navigation without any input foward and backword', () => {
        //navi forward and should stop at WITHIN_ISU_OUTCOMES
        page.sleep(500);
        expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
        page.next();

        page.sleep(500);
        expect(page.findContentById("rejectionbtn").isDisplayed()).toBeTruthy();
        expect(page.findContentById("ciwidthbtn").isDisplayed()).toBeTruthy();
        expect(page.findContentById("wavrbtn").isDisplayed()).toBeTruthy();
        page.next();

        page.sleep(500);
        expect(page.findContentById("powerbtn").isDisplayed()).toBeTruthy();
        expect(page.findContentById("samplesizebtn").isDisplayed()).toBeTruthy();
        page.next();

        page.sleep(500);
        expect(page.findContentById("hlt").isDisplayed()).toBeTruthy();
        expect(page.findContentById("pb").isDisplayed()).toBeTruthy();
        page.next();

        page.sleep(500);
        expect(page.findContentById("typeoneerrorinput").isDisplayed()).toBeTruthy();
        page.next();
        
        page.sleep(500);
        expect(page.getURL().then(x => x.split("/")[0])).toBe('WITHIN_ISU_OUTCOMES')
        expect(page.findContentById("outcomes").isDisplayed()).toBeTruthy();
        page.next(); //nothing should happend

        //
        page.prev();
    });

    it('basic navigation without any input including browser action', () => {
    
    });

    it('end2end basic navigation with simple parameters', () => {
    
    });

    it('end2end basic navigation with complex parameters', () => {
    
    });

});