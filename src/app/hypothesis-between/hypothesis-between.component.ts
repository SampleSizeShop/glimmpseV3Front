import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {constants} from 'app/shared/constants';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {ISUFactors} from '../shared/ISUFactors';
import {isNullOrUndefined} from 'util';
import * as math from 'mathjs';
import {CMatrix} from '../shared/CMatrix';

@Component({
  selector: 'app-hypothesis-between',
  templateUrl: './hypothesis-between.component.html',
  styleUrls: ['./hypothesis-between.component.css']
})
export class HypothesisBetweenComponent implements OnInit, OnDestroy {
  private _showAdvancedOptions: boolean;
  private _betweenHypothesisNature: string;
  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_BETWEEN_NATURE;
  private _isuFactors: ISUFactors;
  private _marginalsIn: Array<CMatrix>;
  private _marginalsOut: Array<CMatrix>;

  private _betweenHypothesisNatureSubscription: Subscription;
  texString = '';

  constructor(private study_service: StudyService) {
    this.marginalsIn = [];
    this.marginalsOut = [];
    this.showAdvancedOptions = false;

    this.betweenHypothesisNatureSubscription = this.study_service.betweenHypothesisNature$.subscribe(
      betweenHypothesisNature => {
        this.betweenHypothesisNature = betweenHypothesisNature;
      }
    );
  }

  ngOnInit() {
    if (this.betweenHypothesisNature !== this.HYPOTHESIS_NATURE.GLOBAL_TRENDS) {
      this.showAdvancedOptions = true;
    };
    this.calculateCMatrix();
  }

  ngOnDestroy() {
    this.betweenHypothesisNatureSubscription.unsubscribe();
  }

  isSelected(hypothesis: string): boolean {
    return this.betweenHypothesisNature === hypothesis;
  }

  selectHypothesisNature(type: string) {
    this.betweenHypothesisNature = type;
    this.study_service.updateBetweenHypothesisNature(this.betweenHypothesisNature);
    this.calculateCMatrix();
  }

  toggleAdvancedOptions() {
    this.showAdvancedOptions = !this.showAdvancedOptions;
  }

  calculateCMatrix() {
    if (!isNullOrUndefined( this._isuFactors ) &&
        this._isuFactors.hypothesis.length > 0 ) {
      this.marginalsIn = [];
      this.marginalsOut = [];
      // work out which between factors are in the hypothesis
      const marginalMatrices = [];
      const betweenFactorsInHypothesis = [];
      const betweenFactorsNotInHypothesis = [];
      this.determineBetweenFactorsinHypothesis(betweenFactorsInHypothesis, betweenFactorsNotInHypothesis);
      this.populateMarginalMatrices(betweenFactorsInHypothesis, marginalMatrices);
      this.populateAverageMatrices(betweenFactorsNotInHypothesis, marginalMatrices);

      const cMatrix = new CMatrix(constants.C_MATRIX_TYPE.CMATRIX);
      let first = marginalMatrices.pop();
      if (isNullOrUndefined(first) || isNullOrUndefined(first.values)) {
        first = new CMatrix(constants.C_MATRIX_TYPE.AVERAGE);
        first.values = math.matrix([[1]]);
      }
      cMatrix.values = first.values;
      if (!isNullOrUndefined(marginalMatrices) && marginalMatrices.length > 0) {
        marginalMatrices.forEach( matrix => {
          cMatrix.values = cMatrix.kronecker(matrix);
        });
      }
      this.texString = cMatrix.toTeX();
    };
  }

  private populateAverageMatrices(betweenFactorsNotInHypothesis: Array<string>, marginalMatrices: Array<CMatrix>) {
    betweenFactorsNotInHypothesis.forEach(name => {
      this._isuFactors.predictors.forEach(value => {
        if (value.name === name) {
          const marginalMatrix = new CMatrix(constants.C_MATRIX_TYPE.AVERAGE);
          marginalMatrix.poopulateAverageMatrix(value.valueNames.length);
          marginalMatrices.push(marginalMatrix);
          marginalMatrix.name = name;
          this.marginalsOut.push(marginalMatrix);
        }
      });
    });
  }

  private populateMarginalMatrices(betweenFactorsInHypothesis: Array<string>, marginalMatrices: Array<CMatrix>) {
    betweenFactorsInHypothesis.forEach(name => {
      this._isuFactors.predictors.forEach(value => {
        if (value.name === name) {
          const marginalMatrix = this.getMarginalCMatrix(value.valueNames.length);
          marginalMatrices.push(marginalMatrix);
          marginalMatrix.name = name;
          this.marginalsIn.push(marginalMatrix);
        }
      });
    });
  }

  private determineBetweenFactorsinHypothesis( inHypothesis: Array<string>, outOfHypothesis: Array<string> ) {
    this._isuFactors.predictors.forEach(predictor => {
      let inEffect = false;
      this._isuFactors.hypothesis.forEach(variable => {
        if ( predictor.compare(variable) ) {
          inHypothesis.push(predictor.name);
          inEffect = true;
        }
      });
      if (inEffect === false) {
        outOfHypothesis.push(predictor.name);
      }
    });
  }

  getMarginalCMatrix (noGroups: number): CMatrix {
    const marginalMatrix = new CMatrix()
      if (this.betweenHypothesisNature === constants.HYPOTHESIS_BETWEEN_NATURE.GLOBAL_TRENDS) {
        marginalMatrix.type = constants.C_MATRIX_TYPE.MAIN_EFFECT;
        marginalMatrix.populateMainEffect(noGroups);
      } else if (this.betweenHypothesisNature === constants.HYPOTHESIS_BETWEEN_NATURE.POLYNOMIAL) {
        marginalMatrix.type = constants.C_MATRIX_TYPE.POLYNOMIAL;
        marginalMatrix.populatePolynomialEvenSpacing(noGroups);
      } else if (this.betweenHypothesisNature === constants.HYPOTHESIS_BETWEEN_NATURE.IDENTITY) {
        marginalMatrix.type = constants.C_MATRIX_TYPE.IDENTITY;
        marginalMatrix.populateIdentityMatrix(noGroups);
      }
    return marginalMatrix;
  }

  get showAdvancedOptions(): boolean {
    return this._showAdvancedOptions;
  }

  set showAdvancedOptions(value: boolean) {
    this._showAdvancedOptions = value;
  }

  get betweenHypothesisNature(): string {
    return this._betweenHypothesisNature;
  }

  set betweenHypothesisNature(value: string) {
    this._betweenHypothesisNature = value;
  }

  get HYPOTHESIS_NATURE() {
    return this._HYPOTHESIS_NATURE;
  }

  set HYPOTHESIS_NATURE(value) {
    this._HYPOTHESIS_NATURE = value;
  }

  get betweenHypothesisNatureSubscription(): Subscription {
    return this._betweenHypothesisNatureSubscription;
  }

  set betweenHypothesisNatureSubscription(value: Subscription) {
    this._betweenHypothesisNatureSubscription = value;
  }

  get marginalsIn(): Array<CMatrix> {
    return this._marginalsIn;
  }

  set marginalsIn(value: Array<CMatrix>) {
    this._marginalsIn = value;
  }

  get marginalsOut(): Array<CMatrix> {
    return this._marginalsOut;
  }

  set marginalsOut(value: Array<CMatrix>) {
    this._marginalsOut = value;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  @Input() set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }
}
