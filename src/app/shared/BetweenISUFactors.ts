import {Predictor} from './Predictor';
import {BetweenIsuCombination} from './BetweenIsuCombination';

export class BetweenISUFactors {
  predictors: Predictor[] = [];
  combinations: BetweenIsuCombination[] = [];
  smallestGroupSize: number[] = [];

  generateCombinations() {
    this.assignChildren();
    this.combinations = this.predictors[0].mapCombinations();
  }

  assignChildren() {
    const pList = [];
    let p = this.predictors.pop();
    while (this.predictors.length > 0) {
      const child = this.predictors.pop();
      p.child = child
      pList.push(p);
      p = child;
    }
    pList.push(p);
    this.predictors = pList;
  }
}
