export class StudyDesign {
  private _guided: boolean;
  private _name: string;

  constructor(name?: string,
              guided?: boolean
) {}

  get guided(): boolean {
    return this._guided;
  }

  set guided(value: boolean) {
    this._guided = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
