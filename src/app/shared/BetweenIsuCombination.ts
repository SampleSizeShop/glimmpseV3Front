export class BetweenIsuCombination {
  id: GroupId[] = [];
  size: number;

  constructor( id?: GroupId[], size?: number) {
    if (id) { this.id = id; }
    if (size) { this.size = size; }
  }

  get name(): string {
    let name = '';
    this.id.forEach( groupId => {
      name = name + groupId.name + ' :';
    })
    return name;
  }
}

export class GroupId {
  predictor: string;
  name: string;

  constructor(predictor: string, name: string) {
    this.predictor = predictor;
    this.name = name;
  }
}
