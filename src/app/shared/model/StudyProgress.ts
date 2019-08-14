export class StudyProgress {
  /**
   * Class used to indicate completeion of study design, split into five sections.
   *
   * @type {boolean}
   * @private
   */
  private _design = false;
  private _hypothesis = false;
  private _dimensions = false;
  private _parameters = false;
  private _optional = false;

  constructor(
    design?: boolean,
    hypothesis?: boolean,
    dimensions?: boolean,
    parameters?: boolean,
    optional?: boolean
  ) {
    if (design) {this.design = design}
    if (hypothesis) {this.hypothesis = hypothesis}
    if (dimensions) {this.dimensions = dimensions}
    if (parameters) {this.parameters = parameters}
    if (optional) {this.optional = optional}
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
