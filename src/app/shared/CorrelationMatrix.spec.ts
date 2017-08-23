import {CorrelationMatrix} from './CorrelationMatrix';

describe('CorrelationMatrix', () => {
  let component: CorrelationMatrix;

  beforeEach( () => { component = new CorrelationMatrix(); });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should be populated as a square diagonal matrix', () => {
    component.populateDefaultValues(2);
    expect(component.values.get([0, 0])).toEqual(1);
    expect(component.values.get([0, 1])).toEqual(0);
    expect(component.values.get([1, 0])).toEqual(0);
    expect(component.values.get([1, 1])).toEqual(1);
  });

  it('Should return a TeX formatted string', () => {
    component.populateDefaultValues(2);
    expect(component.toTeX()).toEqual('$\\begin{bmatrix}1 & 0 \\\\0 & 1 \\end{bmatrix}$')
  });

});
