import {StudyFormComponentPage} from '../src/app/study-form/study-form.po';
import {example_1_input, example_1_output} from './test_inputs/example_1_input';
import {generic_model} from './test_inputs/generic_test_data_model';
import {O2R2P2C0_input, O2R2P2C0_output} from './test_inputs/O2R2P2C0_output';
import {hw2_input, hw2_output} from './test_inputs/homework2_longitudinal';
import {hw3_input, hw3_output} from './test_inputs/homework3';
import {hw4_input, hw4_output} from './test_inputs/homework4';
import {hw5_input, hw5_output} from './test_inputs/homework5';
import {hw5_fullbeta_input, hw5_fullbeta_output} from './test_inputs/homework5_fullbeta';

describe('Glimmpse v3 automated integration tests', () => {
  let page: StudyFormComponentPage;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    page = new StudyFormComponentPage();
    page.navigateTo('/design/TARGET_EVENT');
  });

  it('Should calculate a power of 1 for Grand Mean with only one outcome', async function() {
    const expected = example_1_output;
    let actual = null;
    await page.fromJSON(example_1_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });
    expect(actual.model).toEqual(expected.model);
    expect(actual.results[0].power).toEqual(expected.results[0].power);
  });

  it('Should fill out the study form: Nonsense example designed to hit every page in glimmpse v3 front end', () => {
    page.fromJSON(generic_model);
  });

  it('O2R2P2C0, Should calculate a power of alpha', async function() {
    const expected = O2R2P2C0_output;
    let actual = null;
    await page.fromJSON(O2R2P2C0_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });
    for (let i of actual.model) {
      expect(actual.model.i).toBeCloseTo(expected.model.i, 6);
    }
    actual.results.forEach((result, i) => {
      expect(result.power).toBeCloseTo(expected.results[i].power, 4);
    });
  });

  it('HW2, Should return correct power', async function() {
    const expected = hw2_output;
    let actual = null;
    await page.fromJSON(hw2_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });
    for (let i of actual.model) {
      expect(actual.model.i).toBeCloseTo(expected.model.i, 6);
    }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('HW3, Should return correct power', async function() {
    const expected = hw3_output;
    let actual = null;
    await page.fromJSON(hw3_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });
    for (let i of actual.model) {
      expect(actual.model.i).toBeCloseTo(expected.model.i, 6);
    }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('HW4, Should return correct power', async function() {
    const expected = hw4_output;
    let actual = null;
    await page.fromJSON(hw4_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });
    for (let i of actual.model) {
      expect(actual.model.i).toBeCloseTo(expected.model.i, 6);
    }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('HW5, Should return correct power', async function() {
    const expected = hw5_output;
    let actual = null;
    await page.fromJSON(hw5_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });
    for (let i of actual.model) {
      expect(actual.model.i).toBeCloseTo(expected.model.i, 6);
    }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });

  it('HW5 full beta, Should return correct power', async function() {
    const expected = hw5_fullbeta_output;
    let actual = null;
    await page.fromJSON(hw5_fullbeta_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });
    for (let i of actual.model) {
      expect(actual.model.i).toBeCloseTo(expected.model.i, 6);
    }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 5);
  });
});
