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
 * Model class used to generate a string id for a independent sampling unit (ISU) name and one of it's values.
 */
export class CombinationId {
  id: string;
  value: string;

  /**
   * @example
   * here's hoe to use this
   *
   * testing
   * @param {string} id
   * @param {string} value
   */
  constructor(id?: string, value?: string) {
    this.id = id;
    this.value = value;
  }
}
