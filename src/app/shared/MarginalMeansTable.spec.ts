import {ISUFactorCombination} from './ISUFactorCombination';
import {Predictor} from './Predictor';
import {RepeatedMeasure} from './RepeatedMeasure';
import {ISUFactors} from './ISUFactors';
import {Outcome} from './Outcome';
import {CombinationId} from './CombinationId';
import {constants} from './constants';
import {MarginalMeansTable} from './MarginalMeansTable';

describe('MarginalMeansTable', () => {
  const outcomeA = new Outcome('A');
  const outcomeB = new Outcome('B');
  const predictor = new Predictor('P');
  predictor.valueNames = ['1', '2'];
  predictor.inHypothesis = true;
  const predictor2 = new Predictor('Q');
  predictor2.valueNames = ['3', '4'];
  predictor2.inHypothesis = true;
  const repeatedMeasure = new RepeatedMeasure('R');
  repeatedMeasure.valueNames = ['3' , '5', '7'];
  repeatedMeasure.inHypothesis = true;
  const repeatedMeasure2 = new RepeatedMeasure('S');
  repeatedMeasure2.valueNames = ['2' , '4', '6'];
  repeatedMeasure2.inHypothesis = true;
  const factors = new ISUFactors();

  const a = new CombinationId('A', constants.HYPOTHESIS_ORIGIN.OUTCOME, '', 0);
  const b = new CombinationId('B', constants.HYPOTHESIS_ORIGIN.OUTCOME, '', 0);
  const r3 = new CombinationId('R', constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE, '3', 0);
  const r5 = new CombinationId('R', constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE, '5', 1);
  const r7 = new CombinationId('R', constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE, '7', 2);
  const s2 = new CombinationId('S', constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE, '2', 0);
  const s4 = new CombinationId('S', constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE, '4', 1);
  const s6 = new CombinationId('S', constants.HYPOTHESIS_ORIGIN.REPEATED_MEASURE, '6', 2);
  const p1 = new CombinationId('P', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '1', 0);
  const p2 = new CombinationId('P', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '2', 1);
  const q1 = new CombinationId('Q', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '3', 0);
  const q2 = new CombinationId('Q', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '4', 1);

  beforeEach( () => {
    factors.variables = [outcomeA, outcomeB, repeatedMeasure, repeatedMeasure2, predictor, predictor2];
  });

  it('should correctly populate the marginal means table', () => {
    factors.variables = [outcomeA, outcomeB, repeatedMeasure, repeatedMeasure2, predictor, predictor2];
    const expectedTable = [
      [new ISUFactorCombination([a, r3, p1]), new ISUFactorCombination([a, r5, p1]), new ISUFactorCombination([a, r7, p1]), new ISUFactorCombination([a, s2, p1]), new ISUFactorCombination([a, s4, p1]), new ISUFactorCombination([a, s6, p1])],
      [new ISUFactorCombination([a, r3, p2]), new ISUFactorCombination([a, r5, p2]), new ISUFactorCombination([a, r7, p2]), new ISUFactorCombination([a, s2, p2]), new ISUFactorCombination([a, s4, p2]), new ISUFactorCombination([a, s6, p2])],
      [new ISUFactorCombination([a, r3, q1]), new ISUFactorCombination([a, r5, q1]), new ISUFactorCombination([a, r7, q1]), new ISUFactorCombination([a, s2, q1]), new ISUFactorCombination([a, s4, q1]), new ISUFactorCombination([a, s6, q1])],
      [new ISUFactorCombination([a, r3, q2]), new ISUFactorCombination([a, r5, q2]), new ISUFactorCombination([a, r7, q2]), new ISUFactorCombination([a, s2, q2]), new ISUFactorCombination([a, s4, q2]), new ISUFactorCombination([a, s6, q2])],
    ];
    const expected = new MarginalMeansTable(new ISUFactorCombination([a]), expectedTable);
    const actual = new MarginalMeansTable(new ISUFactorCombination([a]))
    actual.populateTable(factors);
    expect(actual.compareTableSize(expected)).toBeTruthy();
  });

  it('should correctly populate the marginal means table with only predictors', () => {
    factors.variables = [outcomeA, outcomeB, predictor, predictor2];
    const expectedTable = [
      [new ISUFactorCombination([a, p1])],
      [new ISUFactorCombination([a, p2])],
      [new ISUFactorCombination([a, q1])],
      [new ISUFactorCombination([a, q2])],
    ];
    const expected = new MarginalMeansTable(new ISUFactorCombination([a]), expectedTable);
    const actual = new MarginalMeansTable(new ISUFactorCombination([a]))
    actual.populateTable(factors);
    expect(actual.compareTableSize(expected)).toBeTruthy();
  });

  it('should correctly populate the marginal means table with only repeated measures', () => {
    factors.variables = [outcomeA, outcomeB, repeatedMeasure, repeatedMeasure2];
    const expectedTable = [
      [new ISUFactorCombination([a, r3]), new ISUFactorCombination([a, r5]), new ISUFactorCombination([a, r7]), new ISUFactorCombination([a, s2]), new ISUFactorCombination([a, s4]), new ISUFactorCombination([a, s6])],
    ];
    const expected = new MarginalMeansTable(new ISUFactorCombination([a]), expectedTable);
    const actual = new MarginalMeansTable(new ISUFactorCombination([a]))
    actual.populateTable(factors);
    expect(actual.compareTableSize(expected)).toBeTruthy();
  });
});
