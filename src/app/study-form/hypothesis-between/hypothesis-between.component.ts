import {Component, OnDestroy, OnInit} from '@angular/core';
import {constants} from 'app/shared/constants';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs/Subscription';
import {ISUFactors} from '../../shared/ISUFactors';
import {isNullOrUndefined} from 'util';
import * as math from 'mathjs';
import {PartialMatrix} from '../../shared/PartialMatrix';
import {Router} from '@angular/router';
import {Predictor} from '../../shared/Predictor';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-hypothesis-between',
  templateUrl: './hypothesis-between.component.html',
  styleUrls: ['./hypothesis-between.component.css']
})
export class HypothesisBetweenComponent implements OnInit, OnDestroy {
  private _showAdvancedOptions: boolean;
  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_BETWEEN_NATURE;
  private _isuFactors: ISUFactors;
  private _marginalsIn: Array<PartialMatrix>;
  private _marginalsOut: Array<PartialMatrix>;


  private _isuFactorsSubscription: Subscription;
  texString = '';

  constructor(private study_service: StudyService,
              private router: Router,
              private log: NGXLogger) {
    this.marginalsIn = [];
    this.marginalsOut = [];
    this.showAdvancedOptions = false;

    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    this.calculateCMatrix();
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
  }

  selectHypothesisNature(type: string) {
    this.calculateCMatrix();
  }

  toggleAdvancedOptions() {
    this.showAdvancedOptions = !this.showAdvancedOptions;
  }

  calculateCMatrix() {
    if (!isNullOrUndefined( this._isuFactors )) {
      this.marginalsIn = [];
      this.marginalsOut = [];
      // work out which between factors are in the hypothesis
      const marginalMatrices = [];
      const betweenFactorsInHypothesis = [];
      const betweenFactorsNotInHypothesis = [];
      this.determineBetweenFactorsinHypothesis(betweenFactorsInHypothesis, betweenFactorsNotInHypothesis);
      this.populateMarginalMatrices(betweenFactorsInHypothesis, marginalMatrices);
      this.populateAverageMatrices(betweenFactorsNotInHypothesis, marginalMatrices);

      const cMatrix = new PartialMatrix(constants.C_MATRIX_TYPE.CMATRIX);
      let first = marginalMatrices.pop();
      if (isNullOrUndefined(first) || isNullOrUndefined(first.values)) {
        first = new PartialMatrix(constants.C_MATRIX_TYPE.AVERAGE);
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

  private populateAverageMatrices(betweenFactorsNotInHypothesis: Array<string>, marginalMatrices: Array<PartialMatrix>) {
    betweenFactorsNotInHypothesis.forEach(name => {
      this._isuFactors.predictors.forEach(value => {
        if (value.name === name) {
          const marginalMatrix = new PartialMatrix(constants.C_MATRIX_TYPE.AVERAGE);
          marginalMatrix.poopulateAverageMatrix(value.valueNames.length);
          marginalMatrices.push(marginalMatrix);
          marginalMatrix.name = name;
          this.marginalsOut.push(marginalMatrix);
        }
      });
    });
  }

  private populateMarginalMatrices(betweenFactorsInHypothesis: Array<string>, marginalMatrices: Array<PartialMatrix>) {
    betweenFactorsInHypothesis.forEach(name => {
      this._isuFactors.predictors.forEach(value => {
        if (value.name === name) {
          const marginalMatrix = this.getMarginalCMatrix(value);
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

  setNature(name: string, nature: string) {
    this.log.debug( name + ' set: ' + nature );
    this.isuFactors.predictors.forEach( predictor => {
        if (predictor.name === name) {
          predictor.isuFactorNature = nature;
        }
      }
    );
    this.calculateCMatrix();
  }

  advancedOptions(name: string) {
    this.router.navigate(['design', constants.getStageName(constants.STAGES.HYPOTHESIS_BETWEEN), name])
  }

  getMarginalCMatrix (predictor: Predictor): PartialMatrix {
    const noGroups = predictor.valueNames.length;
    const marginalMatrix = new PartialMatrix();
    if (isNullOrUndefined(predictor.isuFactorNature)) {
      predictor.isuFactorNature = constants.HYPOTHESIS_BETWEEN_NATURE.GLOBAL_TRENDS;
    }
    if (predictor.isuFactorNature === constants.HYPOTHESIS_BETWEEN_NATURE.GLOBAL_TRENDS) {
        marginalMatrix.type = constants.HYPOTHESIS_BETWEEN_NATURE.GLOBAL_TRENDS;
        marginalMatrix.populateCMainEffect(noGroups);
      } else if (predictor.isuFactorNature === constants.HYPOTHESIS_BETWEEN_NATURE.POLYNOMIAL) {
        marginalMatrix.type = constants.C_MATRIX_TYPE.POLYNOMIAL;
        marginalMatrix.populatePolynomialEvenSpacing(noGroups);
      } else if (predictor.isuFactorNature === constants.HYPOTHESIS_BETWEEN_NATURE.IDENTITY) {
        marginalMatrix.type = constants.C_MATRIX_TYPE.IDENTITY;
        marginalMatrix.populateIdentityMatrix(noGroups);
      }
      marginalMatrix.name = predictor.name;
    return marginalMatrix;
  }

  get showAdvancedOptions(): boolean {
    return this._showAdvancedOptions;
  }

  set showAdvancedOptions(value: boolean) {
    this._showAdvancedOptions = value;
  }

  get HYPOTHESIS_NATURE() {
    return this._HYPOTHESIS_NATURE;
  }

  set HYPOTHESIS_NATURE(value) {
    this._HYPOTHESIS_NATURE = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  get marginalsIn(): Array<PartialMatrix> {
    return this._marginalsIn;
  }

  set marginalsIn(value: Array<PartialMatrix>) {
    this._marginalsIn = value;
  }

  get marginalsOut(): Array<PartialMatrix> {
    return this._marginalsOut;
  }

  set marginalsOut(value: Array<PartialMatrix>) {
    this._marginalsOut = value;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }
}
