import { NavigationE2E } from './navigation.po';
import { HomeworkDataModelE2E } from './homeworks.po';

describe('demo-front-app short course homework test', () => {
    let page: NavigationE2E;
    let hdm: HomeworkDataModelE2E;
    
    beforeEach(() => {
        page = new NavigationE2E();
        hdm = new HomeworkDataModelE2E();
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
        page.findContentById('samplesize').sendKeys(20);
        page.findContentById('powerbtn').click();
        expect(page.getElementClass('powerbtn')).toContain('active');
        page.next();

        //STATISTICAL_TESTS
        page.sleep(100);
        // page.findContentById('hlt').click();
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
        page.sleep(500);
        page.next();

        //HYPOTHESIS_WITHIN
        page.sleep(500);
        page.next();

        //PARAMETERS_MARGINAL_MEANS
        page.sleep(100);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(1.24);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(0.73);
        page.next();

        //PARAMETERS_SCALE_FACTOR
        page.sleep(100);
        page.findContentById('scalefactor').clear();
        page.findContentById('scalefactor').sendKeys(1);
        page.next();

        //PARAMETERS_STANDARD_DEVIATION
        page.sleep(100);
        page.findByTag('input').clear();
        page.findByTag('input').sendKeys('1.1');
        page.next();

        //PARAMETERS_OUTCOME_CORRELATION
        page.sleep(100);
        page.next();

        //PARAMETERS_INTRA_CLASS_CORRELATION
        page.sleep(100);
        page.findByTag('input').clear();
        page.findByTag('input').sendKeys('0.13');
        page.next();

        //PARAMETERS_SCALE_FACTOR_VARIANCE
        page.sleep(100);
        page.findContentById('scaleFactors').clear();
        page.findContentById('scaleFactors').sendKeys(1);
        page.findContentById('addscaleFactor').click();
        page.next();

        //OPTIONAL_SPECS_POWER_CURVE_CHOICE
        page.sleep(100);
        page.next();
        
        //CALCULATE
        // id='reviewDataModel'
        // file='./gold_standard_data_model_for_homeworks/hw1_data_model.json'
        // test the input data are stored in a right format in the frontend compared with gold standard data model revised by statician 
        var dm = hdm.loadGoldStandard('./gold_standard_data_model_for_homeworks/hw1_data_model.json');
        var tdm = hdm.getOutputDataModel('reviewDataModel');
        // expect(hdm.getOutputDataModelValue('reviewDataModel', '_solveFor')).toEqual(dm['_solveFor'])
        // expect(hdm.getOutputDataModelValue('reviewDataModel', '_typeOneErrorRate')).toEqual(dm['_typeOneErrorRate'])
        // expect(hdm.getOutputDataModelValue('reviewDataModel', '_scaleFactor')).toEqual(dm['_scaleFactor'])
        expect(tdm.then(x => x['_solveFor'])).toEqual(dm['_solveFor']);
        expect(tdm.then(x => x['_typeOneErrorRate'])).toEqual(dm['_typeOneErrorRate']);
        expect(tdm.then(x => x['_scaleFactor'])).toEqual(dm['_scaleFactor']);
        expect(tdm.then(x => x['_samplesize'])).toEqual(dm['_samplesize']);
        expect(tdm.then(x => x['_ciwidth'])).toEqual(dm['_ciwidth']);
        expect(tdm.then(x => x['_gaussianCovariate'])).toEqual(dm['_gaussianCovariate']);
        expect(tdm.then(x => x['_targetEvent'])).toEqual(dm['_targetEvent']);
        expect(tdm.then(x => x['_powerCurve'])).toEqual(dm['_powerCurve']);
        expect(tdm.then(x => x['_varianceScaleFactors'])).toEqual(dm['_varianceScaleFactors']);
        expect(tdm.then(x => x['_selectedTests'])).toEqual(dm['_selectedTests']);
        expect(tdm.then(x => x['_power'])).toEqual(dm['_power']);
        
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['valueNames'])).toEqual(dm['_isuFactors']['variables'][0]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['name'])).toEqual(dm['_isuFactors']['variables'][0]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][0]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][0]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['nature'])).toEqual(dm['_isuFactors']['variables'][0]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['origin'])).toEqual(dm['_isuFactors']['variables'][0]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['standardDeviation'])).toEqual(dm['_isuFactors']['variables'][0]['standardDeviation']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['valueNames'])).toEqual(dm['_isuFactors']['variables'][1]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['name'])).toEqual(dm['_isuFactors']['variables'][1]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][1]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][1]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['nature'])).toEqual(dm['_isuFactors']['variables'][1]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['origin'])).toEqual(dm['_isuFactors']['variables'][1]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['levels'][0]['levelName'])).toEqual(dm['_isuFactors']['variables'][1]['levels'][0]['levelName']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['levels'][0]['noElements'])).toEqual(dm['_isuFactors']['variables'][1]['levels'][0]['noElements']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['levels'][0]['intraClassCorellation'])).toEqual(dm['_isuFactors']['variables'][1]['levels'][0]['intraClassCorellation']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['valueNames'])).toEqual(dm['_isuFactors']['variables'][2]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['name'])).toEqual(dm['_isuFactors']['variables'][2]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][2]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][2]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['nature'])).toEqual(dm['_isuFactors']['variables'][2]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['origin'])).toEqual(dm['_isuFactors']['variables'][2]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child'])).toEqual(dm['_isuFactors']['variables'][2]['child']);

        expect(tdm.then(x => x['_isuFactors']['smallestGroupSize'])).toEqual(dm['_isuFactors']['smallestGroupSize']);
        expect(tdm.then(x => x['_isuFactors']['marginalMeans'])).toEqual(dm['_isuFactors']['marginalMeans']);
        expect(tdm.then(x => x['_isuFactors']['outcomeRepeatedMeasureStDevs'])).toEqual(dm['_isuFactors']['outcomeRepeatedMeasureStDevs']);
        expect(tdm.then(x => x['_isuFactors']['betweenIsuRelativeGroupSizes'])).toEqual(dm['_isuFactors']['betweenIsuRelativeGroupSizes']);
        expect(tdm.then(x => x['_isuFactors']['outcomeCorrelationMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['outcomeCorrelationMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['outcomeCorrelationMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['outcomeCorrelationMatrix']['_values']['size']);
    });

    it('Create a test case for Homework 2 from the short course', () => {
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
        page.findContentById('samplesizebtn').click();
        expect(page.getElementClass('samplesizebtn')).toContain('active');
        page.findContentById('power').clear();
        page.findContentById('power').sendKeys(0.85);
        //TODO should allow multiple inputs
        page.next();

        //STATISTICAL_TESTS
        page.sleep(100);
        // page.findContentById('hlt').click();
        page.next();

        //TYPE_ONE_ERROR
        page.sleep(100);
        page.findContentById('typeoneerror').clear();
        page.findContentById('typeoneerror').sendKeys(0.05);
        page.next();

        //WITHIN_ISU_OUTCOMES
        page.sleep(100);
        page.findContentById('outcomes').sendKeys('MemoryOfPai');
        page.findContentById('addoutcome').click();
        page.next();

        //WITHIN_ISU_REPEATED_MEASURES
        page.sleep(100);
        page.findContentById('includerptmeasuresbtn').click();
        page.sleep(50);
        page.findContentById('dimension').sendKeys('HalfYear');
        page.next();
        page.sleep(50);
        page.next();
        page.sleep(50);
        page.findContentById('repeats').clear();
        page.findContentById('repeats').sendKeys(3);
        page.next();
        page.sleep(50);
        page.findContentById('first').clear();
        page.findContentById('first').sendKeys(1);
        page.findContentById('interval').clear();
        page.findContentById('interval').sendKeys(1);
        page.findByCssWithText('.btn.btn-secondary', 'Fill').click();
        page.next();
        page.sleep(50);
        page.next();

        //WITHIN_ISU_CLUSTERS
        page.sleep(50);
        page.next();

        //BETWEEN_ISU_PREDICTORS
        page.sleep(100);
        page.findContentById('addbetweenbtn').click();
        page.findContentByCss('input[formcontrolname=predictorName]').sendKeys('treatment');
        page.next();
        page.sleep(100);
        page.findContentById('group').sendKeys('SensoryFocus');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('StandardOfCare');
        page.clickEnterKey();
        page.next();
        page.sleep(50);
        page.next();

        //BETWEEN_ISU_GROUPS
        page.sleep(100);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(1);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(1);
        page.next();

        //GAUSSIAN_COVARIATE
        page.sleep(50);
        page.next();

        //HYPOTHESIS_EFFECT_CHOICE
        page.sleep(100);
        page.findAllByClass('form-check-input').get(-1).click();
        page.next();

        //HYPOTHESIS_BETWEEN
        page.sleep(300);
        page.next();

        //HYPOTHESIS_WITHIN
        page.sleep(300);
        page.next();

        //PARAMETERS_MARGINAL_MEANS
        page.sleep(100);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(3.6);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(2.8);
        page.findAllByTag('input').get(2).clear();
        page.findAllByTag('input').get(2).sendKeys(0.9);
        page.findAllByTag('input').get(3).clear();
        page.findAllByTag('input').get(3).sendKeys(4.5);
        page.findAllByTag('input').get(4).clear();
        page.findAllByTag('input').get(4).sendKeys(4.3);
        page.findAllByTag('input').get(5).clear();
        page.findAllByTag('input').get(5).sendKeys(3);
        page.next();
        
        //PARAMETERS_SCALE_FACTOR
        page.sleep(50);
        page.findContentById('scalefactor').clear();
        page.findContentById('scalefactor').sendKeys(1);
        page.next();

        //ARAMETERS_STANDARD_DEVIATION
        page.sleep(100);
        page.findByTag('input').clear();
        page.findByTag('input').sendKeys(0.9);
        page.next();

        //PARAMETERS_OUTCOME_CORRELATION
        page.sleep(50);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_OUTCOME_ST_DEV/MemoryOfPai/HalfYear
        page.sleep(50);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_CORRELATION/HalfYear
        page.sleep(100);
        page.findContentById('1-0').clear();
        page.findContentById('1-0').sendKeys(0.5);
        page.findContentById('2-0').clear();
        page.findContentById('2-0').sendKeys(0.4);
        page.findContentById('2-1').clear();
        page.findContentById('2-1').sendKeys(0.5);
        page.next();

        //PARAMETERS_SCALE_FACTOR_VARIANCE
        page.sleep(50);
        page.findContentById('scaleFactors').clear();
        page.findContentById('scaleFactors').sendKeys(1);
        page.findContentById('addscaleFactor').click();
        page.next();

        //OPTIONAL_SPECS_POWER_CURVE_CHOICE
        page.sleep(50);
        page.next();

        //CALCULATE
        var dm = hdm.loadGoldStandard('./gold_standard_data_model_for_homeworks/hw2_data_model.json');
        var tdm = hdm.getOutputDataModel('reviewDataModel');
        expect(tdm.then(x => x['_solveFor'])).toEqual(dm['_solveFor']);
        expect(tdm.then(x => x['_typeOneErrorRate'])).toEqual(dm['_typeOneErrorRate']);
        expect(tdm.then(x => x['_scaleFactor'])).toEqual(dm['_scaleFactor']);
        expect(tdm.then(x => x['_samplesize'])).toEqual(dm['_samplesize']);
        expect(tdm.then(x => x['_ciwidth'])).toEqual(dm['_ciwidth']);
        expect(tdm.then(x => x['_gaussianCovariate'])).toEqual(dm['_gaussianCovariate']);
        expect(tdm.then(x => x['_targetEvent'])).toEqual(dm['_targetEvent']);
        expect(tdm.then(x => x['_powerCurve'])).toEqual(dm['_powerCurve']);
        expect(tdm.then(x => x['_varianceScaleFactors'])).toEqual(dm['_varianceScaleFactors']);
        expect(tdm.then(x => x['_selectedTests'])).toEqual(dm['_selectedTests']);
        expect(tdm.then(x => x['_power'])).toEqual(dm['_power']);
        expect(tdm.then(x => x['smallestGroupSize'])).toEqual(dm['smallestGroupSize']);
        expect(tdm.then(x => x['marginalMeans'])).toEqual(dm['marginalMeans']);

        expect(tdm.then(x => x['_isuFactors']['variables'][0]['valueNames'])).toEqual(dm['_isuFactors']['variables'][0]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['name'])).toEqual(dm['_isuFactors']['variables'][0]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][0]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][0]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['nature'])).toEqual(dm['_isuFactors']['variables'][0]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['origin'])).toEqual(dm['_isuFactors']['variables'][0]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['standardDeviation'])).toEqual(dm['_isuFactors']['variables'][0]['standardDeviation']);
        
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['valueNames'])).toEqual(dm['_isuFactors']['variables'][1]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['name'])).toEqual(dm['_isuFactors']['variables'][1]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['child'])).toEqual(dm['_isuFactors']['variables'][1]['child']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][1]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][1]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['nature'])).toEqual(dm['_isuFactors']['variables'][1]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['origin'])).toEqual(dm['_isuFactors']['variables'][1]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['type'])).toEqual(dm['_isuFactors']['variables'][1]['type']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['_noRepeats'])).toEqual(dm['_isuFactors']['variables'][1]['_noRepeats']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['name'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['_type'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['_type']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['_values']['size']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['correlationMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['variables'][1]['correlationMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['correlationMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['variables'][1]['correlationMatrix']['_values']['size']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['correlationMatrix']['_names'])).toEqual(dm['_isuFactors']['variables'][1]['correlationMatrix']['_names']);

        expect(tdm.then(x => x['_isuFactors']['variables'][2]['valueNames'])).toEqual(dm['_isuFactors']['variables'][2]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['name'])).toEqual(dm['_isuFactors']['variables'][2]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][2]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][2]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['nature'])).toEqual(dm['_isuFactors']['variables'][2]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['origin'])).toEqual(dm['_isuFactors']['variables'][2]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['valueNames'])).toEqual(dm['_isuFactors']['variables'][2]['child']['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['name'])).toEqual(dm['_isuFactors']['variables'][2]['child']['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['child'])).toEqual(dm['_isuFactors']['variables'][2]['child']['child']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][2]['child']['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][2]['child']['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['nature'])).toEqual(dm['_isuFactors']['variables'][2]['child']['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['origin'])).toEqual(dm['_isuFactors']['variables'][2]['child']['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['type'])).toEqual(dm['_isuFactors']['variables'][2]['child']['type']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['_noRepeats'])).toEqual(dm['_isuFactors']['variables'][2]['child']['_noRepeats']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['partialUMatrix']['_type'])).toEqual(dm['_isuFactors']['variables'][2]['child']['partialUMatrix']['_type']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['partialUMatrix']['name'])).toEqual(dm['_isuFactors']['variables'][2]['child']['partialUMatrix']['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['partialUMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['variables'][2]['child']['partialUMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['partialUMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['variables'][2]['child']['partialUMatrix']['_values']['size']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['correlationMatrix']['_names'])).toEqual(dm['_isuFactors']['variables'][2]['child']['correlationMatrix']['_names']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['correlationMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['variables'][2]['child']['correlationMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child']['correlationMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['variables'][2]['child']['correlationMatrix']['_values']['size']);

        expect(tdm.then(x => x['_isuFactors']['smallestGroupSize'])).toEqual(dm['_isuFactors']['smallestGroupSize']);
        expect(tdm.then(x => x['_isuFactors']['marginalMeans'])).toEqual(dm['_isuFactors']['marginalMeans']);
        expect(tdm.then(x => x['_isuFactors']['betweenIsuRelativeGroupSizes'])).toEqual(dm['_isuFactors']['betweenIsuRelativeGroupSizes']);
        
        expect(tdm.then(x => x['_isuFactors']['outcomeCorrelationMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['outcomeCorrelationMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['outcomeCorrelationMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['outcomeCorrelationMatrix']['_values']['size']);

        expect(tdm.then(x => x['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['outcome'])).toEqual(dm['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['outcome']);
        expect(tdm.then(x => x['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['repMeasure'])).toEqual(dm['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['repMeasure']);
        expect(tdm.then(x => x['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['values'])).toEqual(dm['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['values']);
    });

    xit('Create a test case for Homework 3 from the short course', () => {
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
        page.findContentById('powerbtn').click();
        expect(page.getElementClass('powerbtn')).toContain('active');
        page.next();

        //STATISTICAL_TESTS
        page.sleep(100);
        // page.findContentById('hlt').click();
        page.next();

        //TYPE_ONE_ERROR
        page.sleep(100);
        page.findContentById('typeoneerror').clear();
        page.findContentById('typeoneerror').sendKeys(0.05);
        page.next();

        //WITHIN_ISU_OUTCOMES
        page.sleep(100);
        page.findContentById('outcomes').clear();
        page.findContentById('outcomes').sendKeys('GRADE difference score');
        page.findContentById('addoutcome').click();
        page.findContentById('outcomes').clear();
        page.findContentById('outcomes').sendKeys('LSK difference score');
        page.findContentById('addoutcome').click();
        page.findContentById('outcomes').clear();
        page.findContentById('outcomes').sendKeys('CTOPP difference score');
        page.findContentById('addoutcome').click();
        page.next();

        //WITHIN_ISU_REPEATED_MEASURES
        page.sleep(100);
        page.next();

        //WITHIN_ISU_CLUSTERS
        page.sleep(100);
        page.findContentById('includerptmeasuresbtn').click();
        page.findContentById('name').clear();
        page.findContentById('name').sendKeys('student');
        page.next();
        page.sleep(100);
        page.findContentById('levelName').clear();
        page.findContentById('levelName').sendKeys('classroom');
        page.findContentById('noElements').clear();
        page.findContentById('noElements').sendKeys(5);
        page.findContentById('addLevel').click();
        page.findContentById('levelName').clear();
        page.findContentById('levelName').sendKeys('school');
        page.findContentById('noElements').clear();
        page.findContentById('noElements').sendKeys(4);
        page.findContentById('addLevel').click();
        page.next();
        page.sleep(100);
        page.next();

        //BETWEEN_ISU_PREDICTORS
        page.sleep(100);
        page.findContentById('addbetweenbtn').click();
        page.findContentByCss('input[formcontrolname=predictorName]').sendKeys('LiteracyProgram');
        page.next();
        page.sleep(100);
        page.findContentById('group').sendKeys('ABRACADABRA');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('English Arts Program');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('bi-lingual education');
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
        page.sleep(300);
        page.next();

        //HYPOTHESIS_WITHIN
        page.sleep(300);
        page.next();
    
        //TODO 
        //PARAMETERS_MARGINAL_MEANS
        //  page.sleep(100);
        //  page.findAllByTag('input').get(0).clear();
        //  page.findAllByTag('input').get(0).sendKeys(1.24);
        //  page.findAllByTag('input').get(1).clear();
        //  page.findAllByTag('input').get(1).sendKeys(0.73);
        //  page.next();
 
        //  //PARAMETERS_SCALE_FACTOR
        //  page.sleep(100);
        //  page.findContentById('scalefactor').clear();
        //  page.findContentById('scalefactor').sendKeys(1);
        //  page.next();
 
        //  //PARAMETERS_STANDARD_DEVIATION
        //  page.sleep(100);
        //  page.findByTag('input').clear();
        //  page.findByTag('input').sendKeys(1);
        //  page.next();
 
        //  //PARAMETERS_OUTCOME_CORRELATION
        //  page.sleep(100);
        //  page.next();
 
        //  //PARAMETERS_INTRA_CLASS_CORRELATION
        //  page.sleep(100);
        //  page.findByTag('input').clear();
        //  page.findByTag('input').sendKeys('0.13');
        //  page.next();
 
        //  //PARAMETERS_SCALE_FACTOR_VARIANCE
        //  page.sleep(100);
        //  page.findContentById('scaleFactors').clear();
        //  page.findContentById('scaleFactors').sendKeys(1);
        //  page.findContentById('addscaleFactor').click();
        //  page.next();
 
        //  //OPTIONAL_SPECS_POWER_CURVE_CHOICE
        //  page.sleep(100);
        //  page.next();
 
        //CALCULATE
        //TODO fill toEqual('') with expected output data model
        
    });

    it('Create a test case for Homework 4 from the short course', () => {
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
        page.findContentById('samplesizebtn').click();
        expect(page.getElementClass('samplesizebtn')).toContain('active');
        page.findContentById('power').clear();
        page.findContentById('power').sendKeys(0.9);
        page.next();

        //STATISTICAL_TESTS
        page.sleep(100);
        // page.findContentById('hlt').click();
        page.next();

        //TYPE_ONE_ERROR
        page.sleep(100);
        page.findContentById('typeoneerror').clear();
        page.findContentById('typeoneerror').sendKeys(0.05);
        page.next();

        //WITHIN_ISU_OUTCOMES
        page.sleep(100);
        page.findContentById('outcomes').sendKeys('Alcohol Use Score');
        page.findContentById('addoutcome').click();
        page.next();
 
         //WITHIN_ISU_REPEATED_MEASURES
        page.sleep(100);
        page.findContentById('includerptmeasuresbtn').click();
        page.sleep(50);
        page.findContentById('dimension').sendKeys('HalfYear');
        page.next();
        page.sleep(50);
        page.next();
        page.sleep(50);
        page.findContentById('repeats').clear();
        page.findContentById('repeats').sendKeys(4);
        page.next();
        page.sleep(50);
        page.findAllcontentById('spacing').get(0).clear();
        page.findAllcontentById('spacing').get(0).sendKeys(0);
        page.findAllcontentById('spacing').get(1).clear();
        page.findAllcontentById('spacing').get(1).sendKeys(1);
        page.findAllcontentById('spacing').get(2).clear();
        page.findAllcontentById('spacing').get(2).sendKeys(3);
        page.findAllcontentById('spacing').get(3).clear();
        page.findAllcontentById('spacing').get(3).sendKeys(5);
        page.next();
        page.sleep(50);
        page.next();
 
        //WITHIN_ISU_CLUSTERS
        page.sleep(100);
        page.findContentById('includerptmeasuresbtn').click();
        page.findContentById('name').clear();
        page.findContentById('name').sendKeys('student');
        page.next();
        page.sleep(100);
        page.findContentById('levelName').clear();
        page.findContentById('levelName').sendKeys('classroom');
        page.findContentById('noElements').clear();
        page.findContentById('noElements').sendKeys(20);
        page.findContentById('addLevel').click();
        page.findContentById('levelName').clear();
        page.findContentById('levelName').sendKeys('school');
        page.findContentById('noElements').clear();
        page.findContentById('noElements').sendKeys(3);
        page.findContentById('addLevel').click();
        page.findContentById('levelName').clear();
        page.findContentById('levelName').sendKeys('neighborhood');
        page.findContentById('noElements').clear();
        page.findContentById('noElements').sendKeys(2);
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
        page.findContentById('group').sendKeys('Alcohol Education Program');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('Standard Of Care');
        page.findContentById('addgroup').click();
        page.next();
        page.sleep(100);
        page.next();

        //BETWEEN_ISU_GROUPS
        page.sleep(100);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(2);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(1);
        page.next();

        //GAUSSIAN_COVARIATE
        page.sleep(100);
        page.next();

        //HYPOTHESIS_EFFECT_CHOICE
        page.sleep(100);
        page.findAllByClass('form-check-input').get(5).click();
        page.next();

        //HYPOTHESIS_BETWEEN
        page.sleep(500);
        page.next();

        //HYPOTHESIS_WITHIN
        page.sleep(500);
        page.next();

        //PARAMETERS_MARGINAL_MEANS
        //TODO: in the version2, the method used is LEAR, but we convert the data to unstructured in order to fit the VERSION3
        page.sleep(100);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(5.2);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(5.3);
        page.findAllByTag('input').get(2).clear();
        page.findAllByTag('input').get(2).sendKeys(5.3);
        page.findAllByTag('input').get(3).clear();
        page.findAllByTag('input').get(3).sendKeys(5.3);
        page.findAllByTag('input').get(4).clear();
        page.findAllByTag('input').get(4).sendKeys(5.2);
        page.findAllByTag('input').get(5).clear();
        page.findAllByTag('input').get(5).sendKeys(5.5);
        page.findAllByTag('input').get(6).clear();
        page.findAllByTag('input').get(6).sendKeys(5.9);
        page.findAllByTag('input').get(7).clear();
        page.findAllByTag('input').get(7).sendKeys(6.2);
        page.next();

        //PARAMETERS_SCALE_FACTOR
        page.sleep(100);
        page.findContentById('scalefactor').clear();
        page.findContentById('scalefactor').sendKeys(1);
        page.next();

        //PARAMETERS_STANDARD_DEVIATION
        page.sleep(100);
        page.findByTag('input').clear();
        page.findByTag('input').sendKeys(4);
        page.next();

        //PARAMETERS_OUTCOME_CORRELATION
        page.sleep(100);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_OUTCOME_ST_DEV/Alcohol%20Use%20Score/Halfyear
        page.sleep(100);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_CORRELATION/Halfyear
        page.sleep(100);
        page.findContentById('1-0').clear();
        page.findContentById('1-0').sendKeys(0.6);
        page.findContentById('2-0').clear();
        page.findContentById('2-0').sendKeys(0.5017694177101615);
        page.findContentById('3-0').clear();
        page.findContentById('3-0').sendKeys(0.41962091424865766);
        page.findContentById('2-1').clear();
        page.findContentById('2-1').sendKeys(0.5486908515968686);
        page.findContentById('3-1').clear();
        page.findContentById('3-1').sendKeys(0.45886048184775574);
        page.findContentById('3-2').clear();
        page.findContentById('3-2').sendKeys(0.5486908515968686);
        page.next();

        //PARAMETERS_INTRA_CLASS_CORRELATION
        page.sleep(100);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(0.09);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(0.04);
        page.findAllByTag('input').get(2).clear();
        page.findAllByTag('input').get(2).sendKeys(0.03);
        page.next();

        //PARAMETERS_SCALE_FACTOR_VARIANCE
        page.sleep(100);
        page.findContentById('scaleFactors').clear();
        page.findContentById('scaleFactors').sendKeys(1);
        page.findContentById('addscaleFactor').click();
        page.next();

        //OPTIONAL_SPECS_POWER_CURVE_CHOICE
        page.sleep(100);
        page.next();

         //CALCULATE
        var dm = hdm.loadGoldStandard('./gold_standard_data_model_for_homeworks/hw4_data_model.json');
        var tdm = hdm.getOutputDataModel('reviewDataModel');
        expect(tdm.then(x => x['_solveFor'])).toEqual(dm['_solveFor']);
        expect(tdm.then(x => x['_typeOneErrorRate'])).toEqual(dm['_typeOneErrorRate']);
        expect(tdm.then(x => x['_scaleFactor'])).toEqual(dm['_scaleFactor']);
        expect(tdm.then(x => x['_samplesize'])).toEqual(dm['_samplesize']);
        expect(tdm.then(x => x['_ciwidth'])).toEqual(dm['_ciwidth']);
        expect(tdm.then(x => x['_gaussianCovariate'])).toEqual(dm['_gaussianCovariate']);
        expect(tdm.then(x => x['_targetEvent'])).toEqual(dm['_targetEvent']);
        expect(tdm.then(x => x['_powerCurve'])).toEqual(dm['_powerCurve']);
        expect(tdm.then(x => x['_varianceScaleFactors'])).toEqual(dm['_varianceScaleFactors']);
        expect(tdm.then(x => x['_selectedTests'])).toEqual(dm['_selectedTests']);
        expect(tdm.then(x => x['_power'])).toEqual(dm['_power']);

        expect(tdm.then(x => x['_isuFactors']['variables'][0]['valueNames'])).toEqual(dm['_isuFactors']['variables'][0]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['name'])).toEqual(dm['_isuFactors']['variables'][0]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][0]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][0]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['nature'])).toEqual(dm['_isuFactors']['variables'][0]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['origin'])).toEqual(dm['_isuFactors']['variables'][0]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['standardDeviation'])).toEqual(dm['_isuFactors']['variables'][0]['standardDeviation']);
        
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['valueNames'])).toEqual(dm['_isuFactors']['variables'][1]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['name'])).toEqual(dm['_isuFactors']['variables'][1]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['child'])).toEqual(dm['_isuFactors']['variables'][1]['child']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][1]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][1]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['nature'])).toEqual(dm['_isuFactors']['variables'][1]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['origin'])).toEqual(dm['_isuFactors']['variables'][1]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['type'])).toEqual(dm['_isuFactors']['variables'][1]['type']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['_noRepeats'])).toEqual(dm['_isuFactors']['variables'][1]['_noRepeats']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['_values']['size']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['_type'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['_type']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['name'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['correlationMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['variables'][1]['correlationMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['correlationMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['variables'][1]['correlationMatrix']['_values']['size']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['correlationMatrix']['_names'])).toEqual(dm['_isuFactors']['variables'][1]['correlationMatrix']['_names']);

        expect(tdm.then(x => x['_isuFactors']['variables'][2]['valueNames'])).toEqual(dm['_isuFactors']['variables'][2]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['name'])).toEqual(dm['_isuFactors']['variables'][2]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][2]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][2]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['nature'])).toEqual(dm['_isuFactors']['variables'][2]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['origin'])).toEqual(dm['_isuFactors']['variables'][2]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['levels'][0]['levelName'])).toEqual(dm['_isuFactors']['variables'][2]['levels'][0]['levelName']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['levels'][0]['noElements'])).toEqual(dm['_isuFactors']['variables'][2]['levels'][0]['noElements']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['levels'][0]['intraClassCorellation'])).toEqual(dm['_isuFactors']['variables'][2]['levels'][0]['intraClassCorellation']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['levels'][1]['levelName'])).toEqual(dm['_isuFactors']['variables'][2]['levels'][1]['levelName']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['levels'][1]['noElements'])).toEqual(dm['_isuFactors']['variables'][2]['levels'][1]['noElements']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['levels'][1]['intraClassCorellation'])).toEqual(dm['_isuFactors']['variables'][2]['levels'][1]['intraClassCorellation']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['levels'][2]['levelName'])).toEqual(dm['_isuFactors']['variables'][2]['levels'][2]['levelName']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['levels'][2]['noElements'])).toEqual(dm['_isuFactors']['variables'][2]['levels'][2]['noElements']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['levels'][2]['intraClassCorellation'])).toEqual(dm['_isuFactors']['variables'][2]['levels'][2]['intraClassCorellation']);

        expect(tdm.then(x => x['_isuFactors']['variables'][3]['valueNames'])).toEqual(dm['_isuFactors']['variables'][3]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['name'])).toEqual(dm['_isuFactors']['variables'][3]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][3]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][3]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['nature'])).toEqual(dm['_isuFactors']['variables'][3]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['origin'])).toEqual(dm['_isuFactors']['variables'][3]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['valueNames'])).toEqual(dm['_isuFactors']['variables'][3]['child']['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['name'])).toEqual(dm['_isuFactors']['variables'][3]['child']['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['child'])).toEqual(dm['_isuFactors']['variables'][3]['child']['child']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][3]['child']['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][3]['child']['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['nature'])).toEqual(dm['_isuFactors']['variables'][3]['child']['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['origin'])).toEqual(dm['_isuFactors']['variables'][3]['child']['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['type'])).toEqual(dm['_isuFactors']['variables'][3]['child']['type']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['_noRepeats'])).toEqual(dm['_isuFactors']['variables'][3]['child']['_noRepeats']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['partialUMatrix']['_type'])).toEqual(dm['_isuFactors']['variables'][3]['child']['partialUMatrix']['_type']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['partialUMatrix']['name'])).toEqual(dm['_isuFactors']['variables'][3]['child']['partialUMatrix']['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['partialUMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['variables'][3]['child']['partialUMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['partialUMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['variables'][3]['child']['partialUMatrix']['_values']['size']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['correlationMatrix']['_names'])).toEqual(dm['_isuFactors']['variables'][3]['child']['correlationMatrix']['_names']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['correlationMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['variables'][3]['child']['correlationMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['correlationMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['variables'][3]['child']['correlationMatrix']['_values']['size']);
       
        expect(tdm.then(x => x['_isuFactors']['smallestGroupSize'])).toEqual(dm['_isuFactors']['smallestGroupSize']);
        expect(tdm.then(x => x['_isuFactors']['marginalMeans'])).toEqual(dm['_isuFactors']['marginalMeans']);
        expect(tdm.then(x => x['_isuFactors']['betweenIsuRelativeGroupSizes'])).toEqual(dm['_isuFactors']['betweenIsuRelativeGroupSizes']);

        expect(tdm.then(x => x['_isuFactors']['outcomeCorrelationMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['outcomeCorrelationMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['outcomeCorrelationMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['outcomeCorrelationMatrix']['_values']['size']);
        
        expect(tdm.then(x => x['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['outcome'])).toEqual(dm['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['outcome']);
        expect(tdm.then(x => x['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['repMeasure'])).toEqual(dm['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['repMeasure']);
        expect(tdm.then(x => x['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['values'])).toEqual(dm['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['values']);
    });

    it('Create a test case for Homework 5 from the short course', () => {
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
        page.findContentById('powerbtn').click();
        expect(page.getElementClass('powerbtn')).toContain('active');
        page.next();

        //STATISTICAL_TESTS
        page.sleep(100);
        // page.findContentById('hlt').click();
        page.next();

        //TYPE_ONE_ERROR
        page.sleep(100);
        page.findContentById('typeoneerror').clear();
        page.findContentById('typeoneerror').sendKeys(0.05);
        page.next();

        //WITHIN_ISU_OUTCOMES
        page.sleep(100);
        page.findContentById('outcomes').clear();
        page.findContentById('outcomes').sendKeys('SOAM1');
        // page.findContentById('addoutcome').click();
        page.clickEnterKey();
        page.next();

        //WITHIN_ISU_REPEATED_MEASURES
        page.sleep(100);
        page.findContentById('includerptmeasuresbtn').click();
        page.sleep(50);
        page.findContentById('dimension').sendKeys('BrainRegion');
        page.next();
        page.sleep(50);
        page.findContentById('type').click();
        page.findByCssWithText('option', 'Categorical').click();
        page.next();
        page.sleep(50);
        page.findContentById('repeats').clear();
        page.findContentById('repeats').sendKeys(2);
        page.next();
        page.sleep(50);
        //TODO should be a different UI set up for categorical compared with numeric
        page.findAllcontentById('spacing').get(0).clear();
        page.findAllcontentById('spacing').get(0).sendKeys(1);
        page.findAllcontentById('spacing').get(1).clear();
        page.findAllcontentById('spacing').get(1).sendKeys(2);
        page.next();
        page.sleep(50);
        page.next();

        //WITHIN_ISU_CLUSTERS
        page.sleep(100);
        page.next();

        //BETWEEN_ISU_PREDICTORS
        page.sleep(100);
        page.findContentById('addbetweenbtn').click();
        page.findContentByCss('input[formcontrolname=predictorName]').sendKeys('treatment');
        page.next();
        page.sleep(100);
        page.findContentById('group').sendKeys('Placebo');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('Chemotherapy');
        page.findContentById('addgroup').click();
        page.next();
        page.findContentById('addbetweenbtn').click();
        page.findContentByCss('input[formcontrolname=predictorName]').sendKeys('Genotype');
        page.next();
        page.sleep(100);
        page.findContentById('group').sendKeys('GenotypeA');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('GenotypeB');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('GenotypeC');
        page.findContentById('addgroup').click();
        page.findContentById('group').sendKeys('GenotypeD');
        page.findContentById('addgroup').click();
        page.next();
        page.sleep(100);
        page.next();

        //BETWEEN_ISU_GROUPS
        page.sleep(100);
        page.findContentById('smallestgroupsize').clear();
        page.findContentById('smallestgroupsize').sendKeys(5);
        page.next();

        //GAUSSIAN_COVARIATE
        page.sleep(100);
        page.next();

        //HYPOTHESIS_EFFECT_CHOICE
        page.sleep(100);
        page.findAllByClass('form-check-input').get(6).click();
        page.next();

        //HYPOTHESIS_BETWEEN
        page.sleep(500);
        page.next();

        //HYPOTHESIS_WITHIN
        page.sleep(500);
        page.next();

        //PARAMETERS_MARGINAL_MEANS
        page.sleep(100);
        page.findAllByTag('input').get(0).clear();
        page.findAllByTag('input').get(0).sendKeys(3.145);
        page.findAllByTag('input').get(1).clear();
        page.findAllByTag('input').get(1).sendKeys(2.125);
        page.findAllByTag('input').get(2).clear();
        page.findAllByTag('input').get(2).sendKeys(3.145);
        page.findAllByTag('input').get(3).clear();
        page.findAllByTag('input').get(3).sendKeys(2.325);
        page.findAllByTag('input').get(4).clear();
        page.findAllByTag('input').get(4).sendKeys(3.145);
        page.findAllByTag('input').get(5).clear();
        page.findAllByTag('input').get(5).sendKeys(2.525);
        page.findAllByTag('input').get(6).clear();
        page.findAllByTag('input').get(6).sendKeys(3.145);
        page.findAllByTag('input').get(7).clear();
        page.findAllByTag('input').get(7).sendKeys(2.975);
        page.next();

        //PARAMETERS_SCALE_FACTOR
        page.sleep(100);
        page.findContentById('scalefactor').clear();
        page.findContentById('scalefactor').sendKeys(1);
        page.next();

        //PARAMETERS_STANDARD_DEVIATION
        page.sleep(100);
        page.findByTag('input').clear();
        page.findByTag('input').sendKeys(0.3);
        page.next();

        //PARAMETERS_OUTCOME_CORRELATION
        page.sleep(100);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_OUTCOME_ST_DEV/SOAM1/BrainRegion
        page.sleep(100);
        page.next();

        //PARAMETERS_REPEATED_MEASURE_CORRELATION/BrainRegion
        page.sleep(100);
        page.findContentById('1-0').clear();
        page.findContentById('1-0').sendKeys(0.53);
        page.next();

        //PARAMETERS_SCALE_FACTOR_VARIANCE
        page.sleep(100);
        page.findContentById('scaleFactors').clear();
        page.findContentById('scaleFactors').sendKeys(1);
        // page.findConten(tById('addscaleFactor').click();
        page.clickEnterKey();
        page.next();

        //OPTIONAL_SPECS_POWER_CURVE_CHOICE
        page.sleep(100);
        page.next();

        page.sleep(10000)
        //CALCULATE
        var dm = hdm.loadGoldStandard('./gold_standard_data_model_for_homeworks/hw5_data_model.json');
        var tdm = hdm.getOutputDataModel('reviewDataModel');
        expect(tdm.then(x => x['_solveFor'])).toEqual(dm['_solveFor']);
        expect(tdm.then(x => x['_typeOneErrorRate'])).toEqual(dm['_typeOneErrorRate']);
        expect(tdm.then(x => x['_scaleFactor'])).toEqual(dm['_scaleFactor']);
        expect(tdm.then(x => x['_samplesize'])).toEqual(dm['_samplesize']);
        expect(tdm.then(x => x['_ciwidth'])).toEqual(dm['_ciwidth']);
        expect(tdm.then(x => x['_gaussianCovariate'])).toEqual(dm['_gaussianCovariate']);
        expect(tdm.then(x => x['_targetEvent'])).toEqual(dm['_targetEvent']);
        expect(tdm.then(x => x['_powerCurve'])).toEqual(dm['_powerCurve']);
        expect(tdm.then(x => x['_varianceScaleFactors'])).toEqual(dm['_varianceScaleFactors']);
        expect(tdm.then(x => x['_selectedTests'])).toEqual(dm['_selectedTests']);
        expect(tdm.then(x => x['_power'])).toEqual(dm['_power']);

        expect(tdm.then(x => x['_isuFactors']['variables'][0]['valueNames'])).toEqual(dm['_isuFactors']['variables'][0]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['name'])).toEqual(dm['_isuFactors']['variables'][0]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][0]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][0]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['nature'])).toEqual(dm['_isuFactors']['variables'][0]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['origin'])).toEqual(dm['_isuFactors']['variables'][0]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][0]['standardDeviation'])).toEqual(dm['_isuFactors']['variables'][0]['standardDeviation']);
        
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['valueNames'])).toEqual(dm['_isuFactors']['variables'][1]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['name'])).toEqual(dm['_isuFactors']['variables'][1]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][1]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][1]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['nature'])).toEqual(dm['_isuFactors']['variables'][1]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['origin'])).toEqual(dm['_isuFactors']['variables'][1]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['type'])).toEqual(dm['_isuFactors']['variables'][1]['type']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['_noRepeats'])).toEqual(dm['_isuFactors']['variables'][1]['_noRepeats']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['_values']['size']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['_type'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['_type']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['partialUMatrix']['name'])).toEqual(dm['_isuFactors']['variables'][1]['partialUMatrix']['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['correlationMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['variables'][1]['correlationMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['correlationMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['variables'][1]['correlationMatrix']['_values']['size']);
        expect(tdm.then(x => x['_isuFactors']['variables'][1]['correlationMatrix']['_names'])).toEqual(dm['_isuFactors']['variables'][1]['correlationMatrix']['_names']);

        expect(tdm.then(x => x['_isuFactors']['variables'][2]['valueNames'])).toEqual(dm['_isuFactors']['variables'][2]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['name'])).toEqual(dm['_isuFactors']['variables'][2]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][2]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][2]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['nature'])).toEqual(dm['_isuFactors']['variables'][2]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['origin'])).toEqual(dm['_isuFactors']['variables'][2]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][2]['child'])).toEqual(dm['_isuFactors']['variables'][2]['child']);

        expect(tdm.then(x => x['_isuFactors']['variables'][3]['valueNames'])).toEqual(dm['_isuFactors']['variables'][3]['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['name'])).toEqual(dm['_isuFactors']['variables'][3]['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][3]['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][3]['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['nature'])).toEqual(dm['_isuFactors']['variables'][3]['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['origin'])).toEqual(dm['_isuFactors']['variables'][3]['origin']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['valueNames'])).toEqual(dm['_isuFactors']['variables'][3]['child']['valueNames']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['name'])).toEqual(dm['_isuFactors']['variables'][3]['child']['name']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['child'])).toEqual(dm['_isuFactors']['variables'][3]['child']['child']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['inHypothesis'])).toEqual(dm['_isuFactors']['variables'][3]['child']['inHypothesis']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['isuFactorNature'])).toEqual(dm['_isuFactors']['variables'][3]['child']['isuFactorNature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['nature'])).toEqual(dm['_isuFactors']['variables'][3]['child']['nature']);
        expect(tdm.then(x => x['_isuFactors']['variables'][3]['child']['origin'])).toEqual(dm['_isuFactors']['variables'][3]['child']['origin']);
       
        expect(tdm.then(x => x['_isuFactors']['smallestGroupSize'])).toEqual(dm['_isuFactors']['smallestGroupSize']);
        expect(tdm.then(x => x['_isuFactors']['marginalMeans'])).toEqual(dm['_isuFactors']['marginalMeans']);
        expect(tdm.then(x => x['_isuFactors']['betweenIsuRelativeGroupSizes'])).toEqual(dm['_isuFactors']['betweenIsuRelativeGroupSizes']);

        expect(tdm.then(x => x['_isuFactors']['outcomeCorrelationMatrix']['_values']['data'])).toEqual(dm['_isuFactors']['outcomeCorrelationMatrix']['_values']['data']);
        expect(tdm.then(x => x['_isuFactors']['outcomeCorrelationMatrix']['_values']['size'])).toEqual(dm['_isuFactors']['outcomeCorrelationMatrix']['_values']['size']);
        
        expect(tdm.then(x => x['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['outcome'])).toEqual(dm['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['outcome']);
        expect(tdm.then(x => x['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['repMeasure'])).toEqual(dm['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['repMeasure']);
        expect(tdm.then(x => x['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['values'])).toEqual(dm['_isuFactors']['outcomeRepeatedMeasureStDevs'][0]['values']);
    });
});