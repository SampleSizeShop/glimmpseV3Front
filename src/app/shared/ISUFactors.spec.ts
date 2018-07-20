import {ISUFactors} from './ISUFactors';
import {ISUFactorCombination} from './ISUFactorCombination';
import {Outcome} from './Outcome';
import {CombinationId} from './CombinationId';
import {Predictor} from "./Predictor";
import {constants} from "./constants";

describe('ISUFactors', () => {
  let component: ISUFactors;

  beforeEach( () => { component = new ISUFactors(); });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it( 'should correctly map combinations of two predictors',
    () => {
    const a = new Predictor('a');
    a.valueNames = ['1', '2'];
    const b = new Predictor('b');
    b.valueNames = ['4', '5', '6'];

    const a1 = new CombinationId('a', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '1', 0);
    const a2 = new CombinationId('a', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '2', 1);
    const b3 = new CombinationId('b', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '4', 0);
    const b4 = new CombinationId('b', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '5', 1);
    const b5 = new CombinationId('b', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '6', 2);
    const expected = [
      new ISUFactorCombination([a1, b3]),
      new ISUFactorCombination([a1, b4]),
      new ISUFactorCombination([a1, b5]),
      new ISUFactorCombination([a2, b3]),
      new ISUFactorCombination([a2, b4]),
      new ISUFactorCombination([a2, b5])];
    const actual = component.generateCombinations([a, b]);
  });

});
