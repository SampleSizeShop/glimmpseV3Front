import {Component, OnDestroy, OnInit} from '@angular/core';
import {constants} from '../../shared/constants';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../study.service';
import {ISUFactors} from '../../shared/ISUFactors';
import {PartialMatrix} from '../../shared/PartialMatrix';
import {isNullOrUndefined} from 'util';
import * as math from 'mathjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hypothesis-within',
  templateUrl: './hypothesis-within.component.html',
  styleUrls: ['./hypothesis-within.component.css']
})
export class HypothesisWithinComponent implements OnInit, OnDestroy {
  private _showAdvancedOptions: boolean;
  private _withinHypothesisNature: string;
  private _isuFactors: ISUFactors;
  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_BETWEEN_NATURE;
  private _withinHypothesisNatureSubscription: Subscription;
  private _isuFactorsSubscription: Subscription;

  private _uOutcomes: PartialMatrix;
  private _uRepeatedMeasures: PartialMatrix;
  private _uCluster: number

  constructor(private study_service: StudyService, private router: Router) {
    this.showAdvancedOptions = false;

    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.withinHypothesisNatureSubscription = this.study_service.withinHypothesisNature$.subscribe(
      withinHypothesisNature => {
        this.withinHypothesisNature = withinHypothesisNature;
      }
    );
  }

  ngOnInit() {
    if (this.withinHypothesisNature !== this.HYPOTHESIS_NATURE.GLOBAL_TRENDS) {
      this.showAdvancedOptions = true;
    }
    this.populateUOutcomes();
    this.populateUClusters();
    this.populateURepeatedMeasures();
  }

  ngOnDestroy() {
    this.withinHypothesisNatureSubscription.unsubscribe();
  }

  populateUOutcomes() {
    this._uOutcomes = new PartialMatrix(constants.C_MATRIX_TYPE.IDENTITY);
    this._uOutcomes.populateIdentityMatrix(this.isuFactors.outcomes.length);
  }

  populateUClusters() {
    this._uCluster = 1;
    if (!isNullOrUndefined(this.isuFactors.cluster)) {
      this.isuFactors.cluster.levels.forEach( level => {
        this._uCluster =
          this._uCluster * ( 1 + (level.noElements - 1) * level.intraClassCorellation ) * (1 / level.noElements);
      });
    }
  }

  populateURepeatedMeasures() {
    if (!isNullOrUndefined(this.isuFactors.repeatedMeasures) &&
    this.isuFactors.repeatedMeasures.length > 0) {
      this._uRepeatedMeasures = new PartialMatrix(constants.C_MATRIX_TYPE.MAIN_EFFECT);
      this._uRepeatedMeasures.populateIdentityMatrix(1);
      this.isuFactors.repeatedMeasures.forEach( measure => {
        this._uRepeatedMeasures.values = this._uRepeatedMeasures.kronecker(measure.partialUMatrix);
      });
    } else {
      this._uRepeatedMeasures = new PartialMatrix(constants.C_MATRIX_TYPE.IDENTITY);
      this._uRepeatedMeasures.populateIdentityMatrix(1);
    }
  }

  advancedOptions(name: string) {
    this.router.navigate(['design', constants.STAGES[14], name])
  }

  isSelected(hypothesis: string): boolean {
    return this.withinHypothesisNature === hypothesis;
  }

  selectHypothesisNature(type: string) {
    this.withinHypothesisNature = type;
    this.study_service.updateWithinHypothesisNature(this.withinHypothesisNature);
  }

  toggleAdvancedOptions() {
    this.showAdvancedOptions = !this.showAdvancedOptions;
  }

  get showAdvancedOptions(): boolean {
    return this._showAdvancedOptions;
  }

  set showAdvancedOptions(value: boolean) {
    this._showAdvancedOptions = value;
  }

  get withinHypothesisNature(): string {
    return this._withinHypothesisNature;
  }

  set withinHypothesisNature(value: string) {
    this._withinHypothesisNature = value;
  }

  get HYPOTHESIS_NATURE(): { GLOBAL_TRENDS; ALL_PAIRWISE; SUCCESSIVE_PAIRS; IDENTITY; POLYNOMIAL; USER_DEFINED } | any {
    return this._HYPOTHESIS_NATURE;
  }

  set HYPOTHESIS_NATURE(value: { GLOBAL_TRENDS; ALL_PAIRWISE; SUCCESSIVE_PAIRS; IDENTITY; POLYNOMIAL; USER_DEFINED } | any) {
    this._HYPOTHESIS_NATURE = value;
  }

  get withinHypothesisNatureSubscription(): Subscription {
    return this._withinHypothesisNatureSubscription;
  }

  set withinHypothesisNatureSubscription(value: Subscription) {
    this._withinHypothesisNatureSubscription = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get uOutcomes(): PartialMatrix {
    return this._uOutcomes;
  }

  get uRepeatedMeasures(): PartialMatrix {
    return this._uRepeatedMeasures;
  }

  get uCluster(): number {
    return this._uCluster;
  }

  get uMatrix() {
    let m = this.uOutcomes.kronecker(this.uRepeatedMeasures);
    m = math.kron(m, math.matrix([this.uCluster]));
    let texString = '$\\begin{bmatrix}';
    let row = 0;
    m.forEach(function (value, index, matrix) {
      if (index[0] > row) {
        row = index[0];
        texString = texString.slice(0, texString.length - 2) + '\\\\';
      }
      texString = texString + value + ' & '
    })
    texString = texString.slice(0, texString.length - 2) + '\\end{bmatrix}$';
    return texString;
  }
}
