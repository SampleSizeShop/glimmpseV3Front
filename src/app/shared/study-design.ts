export class StudyDesign {
  private _name: string;
  private _targetEvent: string;
  private _solveFor: string;

  constructor(name?: string,
              guided?: boolean,
              targetEvent?: string,
              solveFor?: string
) {}

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get targetEvent(): string {
    return this._targetEvent;
  }

  set targetEvent(value: string) {
    this._targetEvent = value;
  }

  get solveFor(): string {
    return this._solveFor;
  }

  set solveFor(value: string) {
    this._solveFor = value;
  }
}
