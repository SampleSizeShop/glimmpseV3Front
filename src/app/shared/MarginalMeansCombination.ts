export class MarginalMeansCombination {
  id: MarginalMeansCombinationId[] = [];
  value: number;

  constructor(id?: MarginalMeansCombinationId[], value?: number) {
    if (id) {
      this.id = id;
    }
    if (value) {
      this.value = value;
    }
  }
}

export class MarginalMeansCombinationId {
  factor: string;
  name: string;

  constructor( factor?: string, name?: string) {
    this.factor = factor;
    this.name = name;
  }
}
