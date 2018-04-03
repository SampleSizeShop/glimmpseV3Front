import {ISUFactors} from './ISUFactors';
import {CombinationId, ISUFactorCombination} from './ISUFactorCombination';

describe('ISUFactors', () => {
  let component: ISUFactors;

  beforeEach( () => { component = new ISUFactors(); });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it( 'should correcly produce an object representation of marginal means from a Map', () => {
    const val0 = '0';
    const val1 = '1';
    const comb0 = new ISUFactorCombination([new CombinationId('Time', 0)], 1);
    const comb1 = new ISUFactorCombination([new CombinationId('Time', 1)], 1)
    const expected = [{name: val0, ISUFactorCombination: comb0}, {name: val1, ISUFactorCombination: comb1}]
    component.marginalMeans.set(val0, comb0);
    component.marginalMeans.set(val1, comb1);
    const actual = component.marginalMeansToArray();
    expect(expected).toEqual(actual);
  });

});
