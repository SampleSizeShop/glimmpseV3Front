import {StudyFormComponentPage} from '../src/app/study-form/study-form.po';
import {example_1_input, example_1_output} from './test_inputs/example_1_input';
import {generic_model} from './test_inputs/generic_test_data_model';
import {Qian_Ex_1, Qian_Ex_1_input, Qian_Ex_1_output} from './test_inputs/Qian_Ex_1';

describe('Glimmpse v3 automated integration tests', () => {
  let page: StudyFormComponentPage;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    page = new StudyFormComponentPage();
    page.navigateTo('/design/MODE');
  });

  it('Should fill out the study form', async function() {
    const expected = Qian_Ex_1_output;
    let actual = null;
    await page.fromJSON(Qian_Ex_1_input);
    await page.calculate();
    await page.output().then(text => {
      console.log(text);
      actual = JSON.parse(text);
    });
    expect(actual.model).toEqual(expected.model);
    expect(actual.results[0].power).toEqual(expected.results[0].power);
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
