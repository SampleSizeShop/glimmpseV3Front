import {ISUFactors} from './ISUFactors';
import {CombinationId, ISUFactorCombination} from './ISUFactorCombination';
import {Outcome} from "./Outcome";

describe('ISUFactors', () => {
  let component: ISUFactors;

  beforeEach( () => { component = new ISUFactors(); });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it( 'should correcly produce an object representation of marginal means from a Map', () => {
    const val0 = '0';
    const val1 = '1';
    const comb0 = new ISUFactorCombination([new CombinationId('Time', val0)], 1);
    const comb1 = new ISUFactorCombination([new CombinationId('Time', val1)], 1);
    const expected = [
      {name: val0, ISUFactorCombination: comb0},
      {name: val1, ISUFactorCombination: comb1}
      ];
    component.marginalMeans.set(val0, comb0);
    component.marginalMeans.set(val1, comb1);
    const actual = component.marginalMeansToArray();
    expect(expected).toEqual(actual);
  });

  it( 'should correctly produce an object representation of outcome mean for a scenario ' +
                 'with one outcome and a grand mean hypothesis', () => {
    const val0 = '80';
    const comb0 = new ISUFactorCombination([new CombinationId('bp', val0)], 1);
    const expected = [
      {name: val0, ISUFactorCombination: comb0}
    ];
    component.marginalMeans.set(val0, comb0);
    const actual = component.marginalMeansToArray();
    expect(expected).toEqual(actual);
  });

  it( 'should correctly a marginal matrix for a scenario with one outcome and a grand mean hypothesis',
    () => {
    const bp = Outcome(name = 'bp', standardDeviation = 80);
    const expected = [
      {bp_grand_mean: ISUFactorCombination([CombinationId('bp', 80), 80])}
    ];
    component.marginalMeans.set(val0, comb0);
    const actual = component.marginalMeansToArray();
    expect(expected).toEqual(actual);
  });

});
