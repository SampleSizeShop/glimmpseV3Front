/**
 * Model object used for comparing combinations of independent sampling units (ISUFactor)
 */
export class ISUFactorCombination {
  id: Array<CombinationId>;
  size: number;

  constructor(id?: Array<CombinationId>, size?: number) {
    if (id) { this.id = id; }
    if (size) { this.size = size; }
  }

  get name(): string {
    let name = '';
    this.id.forEach( groupId => {
      name = name + groupId.value;
    })
    return name;
  }
}

/**
 * Model class used to generate a string factorName for a independent sampling unit (ISU) name and one of it's values.
 */
export class CombinationId {
  factorName: string;
  value: string;

  /**
   * @example
   * here's hoe to use this
   *
   * testing
   * @param {string} factorName
   * @param {string} value
   */
  constructor(factorName?: string, value?: string) {
    this.factorName = factorName;
    this.value = value;
  }
}
