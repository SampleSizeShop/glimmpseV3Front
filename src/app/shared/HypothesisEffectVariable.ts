export class HypothesisEffectVariable {
  name: string;
  origin: string;
  type: string;

  constructor(name?: string, type?: string, origin?: string) {
    if (name) {
      this.name = name;
    }
    if (type) {
      this.type = type;
    }
    if (origin) {
      this.origin = origin;
    }
  }

  compare(variable: HypothesisEffectVariable) {
    if (variable.type === this.type && variable.name === this.name) {
      return true;
    }
    return false;
  }
}
