import {Injectable} from '@angular/core';

@Injectable()
export class RepeatedMeasure {
  private _name = null;
  private _noRepeats = null;
  private _spacing = null;
  private _correlationMatrix = null;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get noRepeats(): number {
    return this._noRepeats;
  }

  set noRepeats(value: number) {
    this._noRepeats = value;
  }

  get spacing(): number {
    return this._spacing;
  }

  set spacing(value: number) {
    this._spacing = value;
  }

  get correlationMatrix(): string {
    return this._correlationMatrix;
  }

  set correlationMatrix(value: string) {
    this._correlationMatrix = value;
  }
}
