import {StudyFormComponentPage} from '../src/app/study-form/study-form.po';

describe('demo-front-app short course homework test', () => {
  let page: StudyFormComponentPage;

  beforeEach(() => {
    page = new StudyFormComponentPage();
    page.navigateTo('/design/MODE');
  });

  it('Create a test case for Homework 1 from the short course', () => {
    // MODE
    const input = {user_mode: 'GUIDED'}
    page.fromJSON(input);
  });
});
