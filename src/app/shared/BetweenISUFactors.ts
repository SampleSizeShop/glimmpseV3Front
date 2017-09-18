import {Predictor} from './Predictor';
import {BetweenIsuCombination} from './BetweenIsuCombination';

export class BetweenISUFactors {
  predictors: Predictor[] = [];
  combinations: string[] = [];
  smallestGroupSize: number[] = [];

  generateCombinations() {
    let combinations = [];
    for (const values of this.allPredictorValues ) {
      combinations = this.getListPairCombinations( values, combinations );
    }
    console.log(combinations);
    this.combinations = combinations;
  }

  getListPairCombinations (a, b): string[] {
    if (a.length === 0 && b.length > 0) { return b; }
    if (b.length === 0 && a.length > 0) { return a; }

    const l = [];
    a.map( x => {
      b.map( y => {
        const z = x + ' - ' + y;
        l.push(z);
      } );
    } );
    return l;
  }

  get allPredictorValues() {
    const predictorValues = [];
    for (const predictor of this.predictors) {
      predictorValues.push(predictor.groups);
    }
    return predictorValues;
  }
}
