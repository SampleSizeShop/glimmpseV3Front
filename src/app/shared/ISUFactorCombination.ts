/**
 * Model object used for comparing combinations of independent sampling units (ISUFactor)
 */
import {CombinationId} from './CombinationId';
import {isNullOrUndefined} from 'util';

export class ISUFactorCombination {
  id: Array<CombinationId>;
  value = 1;

  constructor(id: Array<CombinationId>, value?: number) {
    this.id = id;
    if (!isNullOrUndefined(value)) {
      this.value = value;
    }
  }

  get name() {
    let name = '';
    this.id.forEach( conbinationId => {
      name = name + conbinationId.tooltip + ', ' ;
    })
    name = name.substring(0, name.length - 2);
    name = name.trim();
    return name;
  }
}
