import {CMatrix} from './CMatrix';

describe('CMatrix', () => {
  let component: CMatrix;

  beforeEach( () => { component = new CMatrix(); });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should be matrix with one row and 2 columns', () => {
    component.populateMainEffect(2);
    expect(component.values.get([0, 0])).toEqual(1);
    expect(component.values.get([0, 1])).toEqual(-1);
  });

  it('Should be matrix with three rows and 4 columns', () => {
    component.populateMainEffect(4);
    expect(component.values.get([0, 0])).toEqual(1);
    expect(component.values.get([0, 1])).toEqual(-1);
    expect(component.values.get([0, 2])).toEqual(0);
    expect(component.values.get([0, 3])).toEqual(0);

    expect(component.values.get([1, 0])).toEqual(1);
    expect(component.values.get([1, 1])).toEqual(0);
    expect(component.values.get([1, 2])).toEqual(-1);
    expect(component.values.get([1, 3])).toEqual(0);

    expect(component.values.get([2, 0])).toEqual(1);
    expect(component.values.get([2, 1])).toEqual(0);
    expect(component.values.get([2, 2])).toEqual(0);
    expect(component.values.get([2, 3])).toEqual(-1);
  });

});
