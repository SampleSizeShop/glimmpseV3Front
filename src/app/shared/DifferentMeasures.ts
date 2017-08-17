import {Injectable} from '@angular/core';
import {CorrelationMatrix} from './CorrelationMatrix';
import {DiffMeasure} from './DiffMeasure';

@Injectable()
export class DifferentMeasures {
  private  _differentMeasures: DiffMeasure[] = [];
  private _correlationType = 'Default';
  private _correlationMatrix = null;
  private _variance = null;

  get differentMeasures(): DiffMeasure[] {
    return this._differentMeasures;
  }

  set differentMeasures(value: DiffMeasure[] ) {
    this._differentMeasures = value;
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
