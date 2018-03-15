import { NavigationE2E } from './navigation.po';

describe('demo-front-app navigation test', () => {
    let page: NavigationE2E;

    // var input_complex = require("./test_inputs/complex_sample.json")
    // console.log(input_complex.MODE)
    // console.log(input_complex.WITHIN_ISU_REPEATED_MEASURES[0].Dimension)

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

    //deprecated testcase
    it('basic navigation without any input including browser action', () => {
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

    xit('end2end basic navigation with simple parameters', () => {
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
        page.findContentById('samplesize').sendKeys(100);
        page.findContentById('powerbtn').click();
        expect(page.getElementClass('powerbtn')).toContain('active');
        page.next();

        //STATISTICAL_TESTS
        page.sleep(100);
        page.findContentById('hlt').click();
        expect(page.getElementClass('hlt')).not.toContain('active');
        //add test to assert if no element selected, the forward button should be inactive
        expect(page.getElementClass('navigate_next')).toContain('disabled');
        page.findContentById('hlt').click();
        expect(page.getElementClass('navigate_next')).not.toContain('disabled');
        page.findContentById('pb').click();
        page.next();

        //TYPE_ONE_ERROR
        page.sleep(100);
        page.findContentById('typeoneerror').clear();
        page.findContentById('typeoneerror').sendKeys(0.01);
        page.next();

        //WITHIN_ISU_OUTCOMES
        page.sleep(100);
        page.findContentById('outcomes').sendKeys('bloodpressure');
        page.findContentById('addoutcome').click();
        page.findContentById('outcomes').sendKeys('weight');
        page.clickEnterKey();
        expect(page.findAllcontentById('removeoutcome').count()).toBe(2);
        page.next();

        //WITHIN_ISU_REPEATED_MEASURES
        page.sleep(100);
        page.findContentById('includerptmeasuresbtn').click();
        page.sleep(50);
        page.findContentById('dimension').sendKeys('time');
        page.findContentById('units').sendKeys('day');
        page.next();
        page.sleep(50);
        page.findContentById('type').click();
        page.findByCssWithText('option', 'Numeric').click();
        page.next();
        page.sleep(50);
        page.findContentById('repeats').clear();
        page.findContentById('repeats').sendKeys(4);
        page.next();
        page.sleep(50);
        page.findContentById('first').clear();
        page.findContentById('first').sendKeys(1);
        page.findContentById('interval').clear();
        page.findContentById('interval').sendKeys(2);
        page.findByCssWithText('.btn.btn-secondary', 'Fill').click();
        expect(page.findAllcontentById('spacing').count()).toBe(4);
        expect(page.findAllcontentById('spacing').get(0).getAttribute('value')).toBe('1');
        expect(page.findAllcontentById('spacing').get(1).getAttribute('value')).toBe('3');
        expect(page.findAllcontentById('spacing').get(2).getAttribute('value')).toBe('5');
        expect(page.findAllcontentById('spacing').get(3).getAttribute('value')).toBe('7');
        page.findAllcontentById('spacing').get(0).clear();
        page.findAllcontentById('spacing').get(0).sendKeys(2);
        expect(page.findAllcontentById('spacing').get(0).getAttribute('value')).toBe('2');
        page.findByCssWithText('.btn.btn-secondary', 'Fill').click();
        expect(page.findAllcontentById('spacing').get(0).getAttribute('value')).toBe('1');
        page.next();
        page.sleep(100);
        page.findContentById('includenextrptmeasuresbtn').click();
        page.sleep(50);
        page.findContentById('dimension').sendKeys('doctor');
        page.next();
        page.sleep(50);
        page.findContentById('type').click();
        page.findByCssWithText('option', 'Categorical').click();
        page.next();
        page.sleep(50);
        page.findContentById('repeats').clear();
        page.findContentById('repeats').sendKeys(3);
        page.next();
        //should be a different UI set up for categorical compared with numeric
        page.findAllcontentById('spacing').get(0).clear();
        page.findAllcontentById('spacing').get(0).sendKeys(1);
        page.findAllcontentById('spacing').get(1).clear();
        page.findAllcontentById('spacing').get(1).sendKeys(2);
        page.findAllcontentById('spacing').get(2).clear();
        page.findAllcontentById('spacing').get(2).sendKeys(3);
        page.next();
        page.sleep(50);
        expect(page.findAllcontentById('removerepeatedMeasure').count()).toBe(2);
        page.next();

        //WITHIN_ISU_CLUSTERS
        page.sleep(100);
        page.findContentById('includerptmeasuresbtn').click();
        page.findContentById('name').clear();
        page.findContentById('name').sendKeys('hospital');
        page.next();
        page.sleep(100);
        page.findContentById('levelName').clear();
        page.findContentById('levelName').sendKeys('city');
        page.findContentById('noElements').clear();
        page.findContentById('noElements').sendKeys(10);
        page.findContentById('addLevel').click();
        page.findContentById('levelName').clear();
        page.findContentById('levelName').sendKeys('state');
        page.findContentById('noElements').clear();
        page.findContentById('noElements').sendKeys(20);
        page.findContentById('addLevel').click();
        page.next();
        page.sleep(100);
        expect(page.findContentById('removecluster').isPresent()).toBe(true);
        // page.findContentById('editcluster').click();
        // page.next();
        // page.next();
        page.next();
        //the edit function seems not implementated completely, only the name of clustering can be changed, the levels cannot be modified unless we remove the cluster and restart again

        //BETWEEN_ISU_PREDICTORS
        page.sleep(100);
        page.findContentById('addbetweenbtn').click();
        page.findContentByCss('input[formcontrolname=predictorName]').sendKeys('treatment');
        page.next();
        page.sleep(100);
        page.findContentById('group').sendKeys('no dose');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('one dose');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('two dose');
        page.clickEnterKey();
        page.next();
        page.sleep(100);
        page.findContentById('addbetweenbtn').click();
        page.findContentByCss('input[formcontrolname=predictorName]').sendKeys('instrument');
        page.next();
        page.sleep(100);
        page.findContentById('group').sendKeys('Xray');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('MRI');
        page.findContentById('addgroup').click();
        page.next();
        expect(page.findAllcontentById('removepredictor').count()).toBe(2);
        page.next();

        //BETWEEN_ISU_GROUPS
        page.sleep(100);
        page.findContentById('smallestgroupsize').clear();
        page.findContentById('smallestgroupsize').sendKeys(10);
        page.next();

        //GAUSSIAN_COVARIATE
        page.sleep(100);
        page.findContentById('includegaussiancovariatebtn').click();
        page.findContentById('variance').clear();
        page.findContentById('variance').sendKeys(100);
        page.findContentById('removegaussiancovariatebtn').click();
        page.findContentById('includegaussiancovariatebtn').click();
        page.findContentById('variance').clear();
        page.findContentById('variance').sendKeys(1);
        page.next();

        //HYPOTHESIS_EFFECT_CHOICE
        page.sleep(100);
        page.findAllByClass('form-check-input').get(-1).click();
        page.next();

        //HYPOTHESIS_BETWEEN
        //not sure what content should be expected in this page
        page.sleep(300);
        page.next();

        //HYPOTHESIS_WITHIN
        page.sleep(300);
        page.findContentById('pb').click();
        expect(page.findByCssWithText('.btn.btn-secondary', 'Hide Advanced Options').isPresent()).toBe(true);
        page.findAllcontentById('dropdownBasic1').get(0).click();
        page.sleep(50);
        // page.findAllByClass('dropdown-item').get(2).click();
        page.findByCssWithText('button', '  POLYNOMIAL').click();
        page.sleep(50);
        page.next();

        //PARAMETERS_STANDARD_DEVIATION
        page.sleep(100);
        expect(page.findAllByClass('col-1').get(0).getText()).toContain('bloodpressure');
        expect(page.findAllByClass('col-1').get(1).getText()).toContain('weight');
        expect(page.findAllByTag('input').count()).toBe(2);
        page.findAllByTag('input').get(0).sendKeys(15);
        page.findAllByTag('input').get(1).sendKeys(40);
        page.next();

        //PARAMETERS_OUTCOME_CORRELATION
        page.sleep(100);
        page.findContentById('1-0').clear();
        page.findContentById('1-0').sendKeys(0.7);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_OUTCOME_ST_DEV/bloodpressure/time
        page.sleep(100);
        expect(page.findAllByTag('input').count()).toBe(4);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(2).clear();
        page.findAllByTag('input').get(3).clear();
        page.findAllByTag('input').get(0).sendKeys(17);
        page.findAllByTag('input').get(1).sendKeys(16);
        page.findAllByTag('input').get(2).sendKeys(14);
        page.findAllByTag('input').get(3).sendKeys(13);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_OUTCOME_ST_DEV/bloodpressure/doctor
        page.sleep(100);
        expect(page.findAllByTag('input').count()).toBe(3);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(1);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(2);
        page.findAllByTag('input').get(2).clear();
        page.findAllByTag('input').get(2).sendKeys(3);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_OUTCOME_ST_DEV/weight/time
        page.sleep(100);
        expect(page.findAllByTag('input').count()).toBe(4);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(2).clear();
        page.findAllByTag('input').get(3).clear();
        page.findAllByTag('input').get(0).sendKeys(50);
        page.findAllByTag('input').get(1).sendKeys(45);
        page.findAllByTag('input').get(2).sendKeys(40);
        page.findAllByTag('input').get(3).sendKeys(35);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_OUTCOME_ST_DEV/weight/doctor
        page.sleep(100);
        expect(page.findAllByTag('input').count()).toBe(3);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(30);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(29);
        page.findAllByTag('input').get(2).clear();
        page.findAllByTag('input').get(2).sendKeys(31);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_CORRELATION/time
        page.sleep(100);
        // expect(page.findByTag('input').getAttribute('id')).toContain('1-0')
        page.findContentById('1-0').clear();
        page.findContentById('1-0').sendKeys(0.8);
        page.findContentById('2-0').clear();
        page.findContentById('2-0').sendKeys(0.64);
        page.findContentById('3-0').clear();
        page.findContentById('3-0').sendKeys(0.512);
        page.findContentById('2-1').clear();
        page.findContentById('2-1').sendKeys(0.8);
        page.findContentById('3-1').clear();
        page.findContentById('3-1').sendKeys(0.64);
        page.findContentById('3-2').clear();
        page.findContentById('3-2').sendKeys(0.8);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_CORRELATION/doctor
        page.sleep(100);
        page.findContentById('1-0').clear();
        page.findContentById('1-0').sendKeys(0.1);
        page.findContentById('2-0').clear();
        page.findContentById('2-0').sendKeys(-0.1);
        // page.findContentById('2-1').clear();
        // page.findContentById('2-1').sendKeys(0);
        page.next();

        //PARAMETERS_INTRA_CLASS_CORRELATION
        page.sleep(100);
        expect(page.findAllByClass('row').get(0).getText()).toContain('city');
        expect(page.findAllByClass('row').get(1).getText()).toContain('state');
        page.findAllByTag('input').get(0).sendKeys(0.5);
        page.findAllByTag('input').get(0).sendKeys(0.6);
        page.next();

        //PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE
        page.sleep(100);
        expect(page.findAllByTag('input').get(0).getAttribute('value')).toBe(1);
        page.next();

        //PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION
        page.sleep(100);
        expect(page.findAllByTag('input').get(0).getAttribute('value')).not.toBe('15');
        expect(page.findAllByTag('input').get(1).getAttribute('value')).not.toBe('40');
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(-0.8);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(0.9);
        page.next();

        //PARAMETERS_SCALE_FACTOR_VARIANCE (should not allow duplicate)
        page.sleep(100);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(0.5);
        page.findContentById('addscaleFactor').click();
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(1);
        page.findContentById('addscaleFactor').click();
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(2);
        page.clickEnterKey();
        expect(page.findAllcontentById('removescaleFactor').count()).toBe(3);
        page.next();

        //OPTIONAL_SPECS_POWER_METHOD
        page.sleep(100);
        page.findContentById('quantilebtn').click();
        expect(page.getElementClass('unconditionalbtn')).not.toContain('active');
        page.findContentById('unconditionalbtn').click();
        expect(page.getElementClass('unconditionalbtn')).toContain('active');
        page.next();

        //OPTIONAL_SPECS_POWER_CURVE_CHOICE
        page.sleep(100);
        page.findContentById('curvebtn').click();

        //OPTIONAL_SPECS_POWER_CURVE_AXES
        page.sleep(100);
        page.findContentById('wavrbtn').click();
        expect(page.getElementClass('ciwidthbtn')).not.toContain('active');
        page.findContentById('ciwidthbtn').click();
        expect(page.getElementClass('ciwidthbtn')).toContain('active');
        page.next();

        //OPTIONAL_SPECS_POWER_CURVE_DATA_SERIES
        page.sleep(100);
        page.findContentById('varscalefactordropdown').click();
        expect(page.findAllByClass('dropdown-item').get(0).getAttribute('class')).toContain('0.5')
        page.findAllByClass('dropdown-item').get(0).click();
        page.findContentById('addoutcome').click();
        page.findContentById('varscalefactordropdown').click();
        expect(page.findAllByClass('dropdown-item').get(1).getAttribute('class')).toContain('1')
        page.findAllByClass('dropdown-item').get(1).click();
        page.findContentById('addoutcome').click();
        page.findContentById('varscalefactordropdown').click();
        expect(page.findAllByClass('dropdown-item').get(2).getAttribute('class')).toContain('2')
        page.findAllByClass('dropdown-item').get(2).click();
        page.findContentById('addoutcome').click();
        page.next();

        //OPTIONAL_SPECS_CI_CHOICE
        page.sleep(100);
        expect(page.findContentById('CI').isDisplayed()).toBe(true);
        page.findContentById('CI').click();

        //OPTIONAL_SPECS_CI_ASSUMPTIONS
        page.sleep(100);
        expect(page.getElementClass('bothestimatedbtn')).not.toContain('active');
        page.findContentById('bothestimatedbtn').click();
        expect(page.getElementClass('bothestimatedbtn')).toContain('active');
        page.next();

        //OPTIONAL_SPECS_CI_LOWER_TAIL
        page.sleep(100);
        page.findContentById('lowertail').clear();
        page.findContentById('lowertail').sendKeys(0.025);
        page.next();

        //OPTIONAL_SPECS_CI_UPPER_TAIL
        page.sleep(100);
        page.findContentById('uppertail').clear();
        page.findContentById('uppertail').sendKeys(0.025);
        page.next();

        //OPTIONAL_SPECS_CI_BETA_SAMPLE_SIZE
        page.sleep(100);
        page.findContentById('betasamplesize').clear();
        page.findContentById('betasamplesize').sendKeys(500);
        page.next();

        //OPTIONAL_SPECS_CI_BETA_DESIGN_MATRIX_RANK
        page.sleep(100);
        page.findContentById('designmatrixrank').clear();
        page.findContentById('designmatrixrank').sendKeys(2);
        page.next();

        //OPTIONAL_SPECS_CI_CHOICE
        page.sleep(100);
        //TODO add expects to confirm the summary of the confidentce interval
        page.next();

        //OPTIONAL_SPECS_POWER_CURVE_CHOICE
        page.sleep(100);
        //TODO add expects to confirm the summary of the power curve
        page.next();

        //CALCULATE
        //TODO add expects to confirm the summary of the calculate
        //TODO add expects to confirm the calculated results are correct and presented correctly
    });
});