import {ISUFactorCombination} from './ISUFactorCombination';
import {CombinationId} from './CombinationId';
import {RelativeGroupSizeTable} from './RelativeGroupSizeTable';
import {constants} from './constants';

describe('RelativeGroupSizeTable', () => {
  const a1 = new CombinationId('a', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '1', 0);
  const a2 = new CombinationId('a', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '2', 1);
  const b3 = new CombinationId('b', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '3', 0);
  const b4 = new CombinationId('b', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '4', 1);
  const c5 = new CombinationId('c', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '5', 0);
  const c6 = new CombinationId('c', constants.HYPOTHESIS_ORIGIN.BETWEEN_PREDICTOR, '6', 1);
  beforeEach( () => {
  });

  it('should pick out dimensions from element', () => {
    const tableId = new ISUFactorCombination([c5]);
    const element = new ISUFactorCombination([a1, b3, c5]);
    const table = new RelativeGroupSizeTable(tableId, [[element]]);
    const expected = [table.table[0][0].id[0], table.table[0][0].id[1]];
    const actual = table.getDimensions(element);
    expect(actual[0]).toBe(expected[0]);
  });

  it('Should correctly populate a 2x2 table of a by b', () => {
    const expected = new RelativeGroupSizeTable( null,
      [[new ISUFactorCombination([a1, b3], 1), new ISUFactorCombination([a2, b3], 1)],
             [new ISUFactorCombination([a1, b4], 1), new ISUFactorCombination([a2, b4], 1)]]);
    const actual = new RelativeGroupSizeTable(new ISUFactorCombination([c5]));
    const combinations = [
      new ISUFactorCombination([a1, b3], 1),
      new ISUFactorCombination([a2, b3], 1),
      new ISUFactorCombination([a1, b4], 1),
      new ISUFactorCombination([a2, b4], 1)];
    actual.populateTable(combinations);
    expect(actual === expected);
  });

  it( 'Should correctly return the column label', () => {
    const table = new RelativeGroupSizeTable( null,
      [ [new ISUFactorCombination([a1, b3], 1), new ISUFactorCombination([a2, b3], 1)],
              [new ISUFactorCombination([a1, b4], 1), new ISUFactorCombination([a2, b4], 1)]]);
    table.dimensions = table.getDimensions(table.table[0][0]);
    const expected = 'a1';
    const actual = table.getColLabel(table.table[0][0]);
  });

  it('Should correctly return the row label', () => {
    const table = new RelativeGroupSizeTable( null,
      [ [new ISUFactorCombination([a1, b3], 1), new ISUFactorCombination([a2, b3], 1)],
        [new ISUFactorCombination([a1, b4], 1), new ISUFactorCombination([a2, b4], 1)]]);
    table.dimensions = table.getDimensions(table.table[0][0]);
    const expected = 'b3';
    const actual = table.getRowLabel(table.table[0][0]);
  });

});
