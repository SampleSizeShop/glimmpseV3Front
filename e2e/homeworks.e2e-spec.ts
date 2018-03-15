import { NavigationE2E } from './navigation.po';

describe('demo-front-app short course homework test', () => {
    let page: NavigationE2E;
    
    beforeEach(() => {
        page = new NavigationE2E();
        // page.navigateToHome();
        page.navigateTo('/design/MODE');
    });

    it('Create a test case for Homework 1 from the short course', () => {
        //MODE
        page.sleep(100);
        //expect(page.getElementClass(input_complex.MODE)).toContain('active');
        expect(page.getElementClass('guidedbtn')).toContain('active');
        page.next();
 
        //TARGET_EVENT
        page.sleep(100);
        //expect(page.getElementClass(input_complex.TARGET_EVENT)).toContain('active');
        expect(page.getElementClass('rejectionbtn')).toContain('active');
        page.next();

        //SOLVE_FOR
        page.sleep(100);
        page.findContentById('samplesize').clear();
        //page.findContentById('samplesize').sendKeys(input_complex.SOLVE_FOR.samplesize);
        //page.findContentById(input_complex.SOLVE_FOR.solve_for).click();
        //expect(page.getElementClass(input_complex.SOLVE_FOR.solve_for)).toContain('active');
        page.findContentById('samplesize').sendKeys(20);
        page.findContentById('powerbtn').click();
        expect(page.getElementClass('powerbtn')).toContain('active');
        page.next();

        //STATISTICAL_TESTS
        page.sleep(100);
        page.findContentById('hlt').click();
        page.next();

        //TYPE_ONE_ERROR
        page.sleep(100);
        page.findContentById('typeoneerror').clear();
        page.findContentById('typeoneerror').sendKeys(0.05);
        page.next();

        //WITHIN_ISU_OUTCOMES
        page.sleep(100);
        page.findContentById('outcomes').sendKeys('DrinkingFrequency');
        page.findContentById('addoutcome').click();
        page.next();

        //WITHIN_ISU_REPEATED_MEASURES
        page.sleep(100);
        page.next();

        //WITHIN_ISU_CLUSTERS
        page.sleep(100);
        page.findContentById('includerptmeasuresbtn').click();
        page.findContentById('name').clear();
        page.findContentById('name').sendKeys('worker');
        page.next();
        page.sleep(100);
        page.findContentById('levelName').clear();
        page.findContentById('levelName').sendKeys('Workplace');
        page.findContentById('noElements').clear();
        page.findContentById('noElements').sendKeys(15);
        page.findContentById('addLevel').click();
        page.next();
        page.sleep(100);
        page.next();

        //BETWEEN_ISU_PREDICTORS
        page.sleep(100);
        page.findContentById('addbetweenbtn').click();
        page.findContentByCss('input[formcontrolname=predictorName]').sendKeys('treatment');
        page.next();
        page.sleep(100);
        page.findContentById('group').sendKeys('ControlGroup');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('WorkplaceTreatmentProgram');
        page.findContentById('addgroup').click();
        page.next();
        page.sleep(100);
        page.next();

        //BETWEEN_ISU_GROUPS
        page.sleep(100);
        page.findContentById('smallestgroupsize').clear();
        page.findContentById('smallestgroupsize').sendKeys(20);
        page.next();

        //GAUSSIAN_COVARIATE
        page.sleep(100);
        page.next();

        //HYPOTHESIS_EFFECT_CHOICE
        page.sleep(100);
        page.findAllByClass('form-check-input').get(1).click();
        page.next();

        //HYPOTHESIS_BETWEEN
        page.sleep(100);
        page.next();

        //HYPOTHESIS_WITHIN
        page.sleep(100);
        page.next();

        //PARAMETERS_MARGINAL_MEANS
        page.sleep(100);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(1.24);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(0.73);
        page.next();

    });

    xit('Create a test case for Homework 2 from the short course', () => {
        
    });

    xit('Create a test case for Homework 3 from the short course', () => {
        
    });

    xit('Create a test case for Homework 4 from the short course', () => {
        
    });

    xit('Create a test case for Homework 5 from the short course', () => {
        
    });

});