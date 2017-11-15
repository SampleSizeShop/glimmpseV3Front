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

export class CombinationId {
  id: string;
  value: string;

  constructor(id?: string, value?: string) {
    this.id = id;
    this.value = value;
  }
}
