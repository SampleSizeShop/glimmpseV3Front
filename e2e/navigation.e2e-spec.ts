import { NavigationE2E } from './navigation.po';

describe('demo-front-app navigation test', () => {
    let page: NavigationE2E;

    beforeEach(() => {
        page = new NavigationE2E();
        // page.navigateToHome();
        page.navigateTo('/design/MODE');
    });

    it('basic navigation without any input foward and backword', () => {
        //navi forward and should stop at WITHIN_ISU_OUTCOMES
        page.sleep(500);
        expect(page.findContentById("GUIDED").isDisplayed()).toBeTruthy();
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
        expect(page.getRouterURLString()).toBe('WITHIN_ISU_OUTCOMES');
        expect(page.findContentById("outcomes").isDisplayed()).toBeTruthy();
        // expect(page.findContentById('navigate_next').isEnabled()).toBe(false)

        //go backward
        page.prev();
        page.sleep(500);
        expect(page.findContentById("typeoneerrorinput").isDisplayed()).toBeTruthy();

        page.prev();
        page.sleep(500);
        expect(page.findContentById("hlt").isDisplayed()).toBeTruthy();
        expect(page.findContentById("pb").isDisplayed()).toBeTruthy();

        page.prev();
        page.sleep(500);
        expect(page.findContentById("powerbtn").isDisplayed()).toBeTruthy();
        expect(page.findContentById("samplesizebtn").isDisplayed()).toBeTruthy();

        page.prev();
        page.sleep(500);
        expect(page.findContentById("rejectionbtn").isDisplayed()).toBeTruthy();
        expect(page.findContentById("ciwidthbtn").isDisplayed()).toBeTruthy();
        expect(page.findContentById("wavrbtn").isDisplayed()).toBeTruthy();
        
        page.prev();
        page.sleep(500);
        expect(page.getRouterURLString()).toBe('MODE');
    });

    xit('basic navigation without any input including browser action', () => {
        // test browser back
        page.sleep(500);
        expect(page.getRouterURLString()).toBe('MODE');
        page.next();
        
        page.refresh();

        page.sleep(500);
        expect(page.getRouterURLString()).toBe('TARGET_EVENT');
        page.next();

        page.refresh();

        page.sleep(500);
        expect(page.getRouterURLString()).toBe('SOLVE_FOR');
        page.next();

        page.refresh();

        page.sleep(500);
        expect(page.getRouterURLString()).toBe('SOLVE_FOR');
        page.browserBack();

        page.sleep(1000);
        expect(page.getRouterURLString()).toBe('TARGET_EVENT');
        page.browserForward();

        page.sleep(1000);
        expect(page.getRouterURLString()).toBe('SOLVE_FOR');

        page.refresh();
        page.sleep(500);

        page.next();
        page.sleep(500);
        page.prev();
        page.sleep(500);
        page.next();
        page.sleep(500);
        page.next();
        page.sleep(500);
        page.next();
        page.sleep(500);
        expect(page.getRouterURLString()).toBe('WITHIN_ISU_OUTCOMES');

        page.refresh();
        page.sleep(500);
        page.browserBack();
        page.sleep(500);
        page.browserBack();
        page.sleep(1000);
        expect(page.getRouterURLString()).toBe('STATISTICAL_TESTS');

        page.browserForward();
        page.sleep(1000);
        page.browserForward();
        page.sleep(1000);
        expect(page.getRouterURLString()).toBe('WITHIN_ISU_OUTCOMES');

        page.prev();
        page.sleep(500);
        page.prev();
        page.sleep(500);
        page.prev();
        page.sleep(500);
        page.prev();
        page.sleep(500);
        page.prev();
        page.sleep(500);
        expect(page.getRouterURLString()).toBe('TYPE_ONE_ERROR');
    });

    it('end2end basic navigation with simple parameters', () => {
        //this test also will test the behavior of the page after input those parameters such as boundary check
        //MODE
        page.sleep(300);
        expect(page.getElementClass('guidedbtn')).toContain('active');
        page.next();

        //TARGET_EVENT
        page.sleep(300);
        expect(page.getElementClass('rejectionbtn')).toContain('active');
        page.findContentById('ciwidthbtn').click();
        expect(page.getElementClass('ciwidthbtn')).toContain('active');
        page.findContentById('rejectionbtn').click();
        expect(page.getElementClass('rejectionbtn')).toContain('active');
        page.next()

        //SOLVE_FOR
        page.sleep(300);
        expect(page.getElementClass('powerbtn')).toContain('active');
        page.findContentById('samplesizebtn').click();
        expect(page.getElementClass('samplesizebtn')).toContain('active');
        page.findContentById('powerbtn').click();
        expect(page.getElementClass('powerbtn')).toContain('active');
        page.findContentById('samplesize').clear();
        page.findContentById('samplesize').sendKeys(20);
        page.next()

        //STATISTICAL_TESTS
        page.sleep(300);
        expect(page.getElementClass('hlt')).toContain('active');
        page.findContentById('pb').click();
        expect(page.getElementClass('pb')).toContain('active');
        page.findContentById('pb').click();
        expect(page.getElementClass('pb')).not.toContain('active');
        page.next();

        //TYPE_ONE_ERROR
        page.sleep(300);
        page.findContentById('typeoneerror').clear();
        page.findContentById('typeoneerror').sendKeys(0.01);
        page.next();

        //WITHIN_ISU_OUTCOMES
        page.sleep(300);
        page.findContentById('outcomes').sendKeys('simple');
        page.findContentById('addoutcome').click();
        expect(page.findContentById('removeoutcome').isPresent()).toBe(true);
        expect(page.findByCssWithText('.col', 'simple').isPresent()).toBe(true);
        page.findContentById('removeoutcome').click();
        expect(page.findContentById('removeoutcome').isPresent()).toBe(false);
        expect(page.findByCssWithText('.col', 'simple').isPresent()).toBe(false);
        page.findContentById('outcomes').sendKeys('simple');
        page.findContentById('addoutcome').click();
        page.next();

        page.sleep(100);
        page.next();
        page.sleep(100);
        page.next();
        page.sleep(100);
        page.next();
        page.sleep(100);
        page.next();
        page.sleep(100);
        page.next();

        //HYPOTHESIS_BETWEEN
        page.sleep(1000);
        // expect(page.findContentByClass('mjx-chtml MathJax_CHTML').isDisplayed()).toBe(true)
        page.next();
        //HYPOTHESIS_WITHIN
        page.sleep(1000);
        // expect(page.findContentByClass('mjx-chtml MathJax_CHTML').isDisplayed()).toBe(true);
        // expect(page.findAllByClass('mjx-chtml MathJax_CHTML').count()).toBe(3);
        page.next();

        //PARAMETERS_STANDARD_DEVIATION
        page.sleep(300);
        //bug in this page: the input value are not saved
        page.next();
        page.sleep(100)
        page.next();
        
        //PARAMETERS_SCALE_FACTOR_VARIANCE
        page.sleep(100);
        page.findContentById('scaleFactors').clear();
        page.findContentById('scaleFactors').sendKeys('2');
        page.findContentById('addscaleFactor').click();
        expect(page.findContentById('removescaleFactor').isPresent()).toBe(true)
        expect(page.findByCssWithText('.col', '2').isPresent()).toBe(true)
        page.findContentById('removescaleFactor').click();
        expect(page.findContentById('removescaleFactor').isPresent()).toBe(false);
        page.findContentById('scaleFactors').clear();
        page.findContentById('scaleFactors').sendKeys('1');
        page.findContentById('addscaleFactor').click();
        page.next();

        page.sleep(100);
        page.next();

        page.sleep(100);
        expect(page.getRouterURLString()).toBe('CALCULATE');
        //add test here to eval results
    });

    it('end2end basic navigation with complex parameters power', () => {
        //MODE
        page.sleep(100);
        expect(page.getElementClass('guidedbtn')).toContain('active');
        page.next();

        //TARGET_EVENT
        page.sleep(100);
        expect(page.getElementClass('rejectionbtn')).toContain('active');
        page.next();

        //SOLVE_FOR
        page.sleep(100);
        page.findContentById('samplesize').clear();
        page.findContentById('samplesize').sendKeys('100');
        page.findContentById('powerbtn').click();
        expect(page.getElementClass('powerbtn')).toContain('active');
        page.next();

        //STATISTICAL_TESTS
        page.sleep(100);
        
    });

    it('end2end basic navigation with complex parameters sample size', () => {
        //MODE
        page.sleep(100);
        expect(page.getElementClass('guidedbtn')).toContain('active');
        page.next();

        //TARGET_EVENT
        page.sleep(100);
        expect(page.getElementClass('rejectionbtn')).toContain('active');
        page.next();
    });

    it('end2end basic navigation with tutorial parameters', () => {
        
    });

});