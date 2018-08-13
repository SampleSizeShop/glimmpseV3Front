import {StudyFormComponentPage} from '../src/app/study-form/study-form.po';
import {generic_model} from './test_inputs/generic_test_data_model';

describe('demo-front-app short course homework test', () => {
  let page: StudyFormComponentPage;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    page = new StudyFormComponentPage();
    page.navigateTo('/design/MODE');
  });

  it('Should fill out the study form', () => {
    page.fromJSON(generic_model);
    page.calculate();
  });
});
