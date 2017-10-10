export class HypothesisEffectVariable {
  name: string;
  type: string;

  constructor(name?: string, type?: string) {
    if (name) {
      this.name = name;
    }
    if (type) {
      this.type = type;
    }
  }

  compare(variable: HypothesisEffectVariable) {
    if (variable.type === this.type && variable.name === this.name) {
      return true;
    }
    return false;
  }
}
