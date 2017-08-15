import {Injectable} from '@angular/core';
import {CorrelationMatrix} from './CorrelationMatrix';

@Injectable()
export class RepeatedMeasure {
  private _name = null;
  private _noRepeats = null;
  private _spacing = null;
  private _correlationType = 'Default';
  private _correlationMatrix = null;
  private _variance = null;

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

  get correlationMatrix(): CorrelationMatrix {
    return this._correlationMatrix;
  }

  set correlationMatrix(value: CorrelationMatrix) {
    this._correlationMatrix = value;
  }

  get correlationType(): string {
    return this._correlationType;
  }

  set correlationType(value: string) {
    this._correlationType = value;
  }

  get variance(): number {
    return this._variance;
  }

  set variance(value: number) {
    this._variance = value;
  }
}
