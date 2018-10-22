import {StudyFormComponentPage} from '../src/app/study-form/study-form.po';
import {example_1_input, example_1_output} from './test_inputs/example_1_input';
import {generic_model} from './test_inputs/generic_test_data_model';
import {O2R2P2C0_input, O2R2P2C0_output} from './test_inputs/O2R2P2C0_output';

describe('Glimmpse v3 automated integration tests', () => {
  let page: StudyFormComponentPage;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    page = new StudyFormComponentPage();
    page.navigateTo('/design/MODE');
  });

  it('Should calculate a power of alpha', async function() {
    const expected = O2R2P2C0_output;
    let actual = null;
    await page.fromJSON(O2R2P2C0_input);
    // await page.modelText().then(text => {
    //   console.log(text);
    // });
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });
    for (let i of actual.model) {
      expect(actual.model.i).toBeCloseTo(expected.model.i,  6);
    }
    expect(actual.results[0].power).toBeCloseTo(expected.results[0].power, 3);
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
});
