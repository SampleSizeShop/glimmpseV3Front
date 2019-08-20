import {StudyDesign} from './study-design';

describe('StudyDesign', () => {
  let component: StudyDesign;

  beforeEach( () => { component = new StudyDesign(); });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
