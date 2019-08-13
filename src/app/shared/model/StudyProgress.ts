export class StudyProgress {
  private _design: boolean;
  private _hypothesis: boolean;
  private _dimensions: boolean;
  private _parameters: boolean;
  private _optional: boolean;

  constructor() {
    this.design = false;
    this.hypothesis = false;
    this.dimensions = false;
    this.parameters = false;
    this.optional = false;
  }

  get design(): boolean {
    return this._design;
  }

  set design(value: boolean) {
    this._design = value;
  }

  get hypothesis(): boolean {
    return this._hypothesis;
  }

  set hypothesis(value: boolean) {
    this._hypothesis = value;
  }

  get dimensions(): boolean {
    return this._dimensions;
  }

  set dimensions(value: boolean) {
    this._dimensions = value;
  }

  get parameters(): boolean {
    return this._parameters;
  }

  set parameters(value: boolean) {
    this._parameters = value;
  }

  get optional(): boolean {
    return this._optional;
  }

  set optional(value: boolean) {
    this._optional = value;
  }
}
