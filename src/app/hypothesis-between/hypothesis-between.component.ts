import {Component, OnDestroy, OnInit} from '@angular/core';
import {constants} from 'app/shared/constants';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {BetweenISUFactors} from "../shared/BetweenISUFactors";
import {isNullOrUndefined} from "util";
import {HypothesisEffect} from "../shared/HypothesisEffect";
import {CMatrix} from "../shared/CMatrix";

@Component({
  selector: 'app-hypothesis-between',
  templateUrl: './hypothesis-between.component.html',
  styleUrls: ['./hypothesis-between.component.css']
})
export class HypothesisBetweenComponent implements OnInit, OnDestroy {
  private _showAdvancedOptions: boolean;
  private _betweenHypothesisNature: string;
  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_NATURE;
  private _hypothesisEffect: HypothesisEffect;
  private _betweenISUFactors: BetweenISUFactors;

  private _betweenHypothesisNatureSubscription: Subscription;
  private _betweenISUFactorsSubscription: Subscription;
  private _hypothesisEffectSubscription: Subscription;

  constructor(private study_service: StudyService) {
    this.showAdvancedOptions = false;

    this.betweenHypothesisNatureSubscription = this.study_service.betweenHypothesisNature$.subscribe(
      betweenHypothesisNature => {
        this.betweenHypothesisNature = betweenHypothesisNature;
      }
    );
    this.hypothesisEffectSubscription = this.study_service.hypothesisEffect$.subscribe(
      hypothesisEffect => {
      this._hypothesisEffect = hypothesisEffect;
    })
    this.betweenISUFactorsSubscription = this.study_service.betweenIsuFactors$.subscribe(
      betweenISUFactors => {
        this._betweenISUFactors = betweenISUFactors;
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
    if (!isNullOrUndefined( this._betweenISUFactors ) && !isNullOrUndefined(this._hypothesisEffect)) {
      const marginalMatrices = [];
      if (this.betweenHypothesisNature === constants.HYPOTHESIS_NATURE.GLOBAL_TRENDS) {
        this._hypothesisEffect.variables.forEach( variable => {
          if (variable.type === 'BETWEEN') {
            this._betweenISUFactors.predictors.forEach( value => {
              if (value.name === variable.name) {
                const marginalMatrix = new CMatrix(constants.C_MATRIX_TYPE.MAIN_EFFECT);
                marginalMatrix.populateMainEffect(value.groups.length);
                marginalMatrices.push(marginalMatrix);
              }
            });
          }
        });
      }
      const cMatrix = new CMatrix(constants.C_MATRIX_TYPE.CMATRIX);
      const first = marginalMatrices.pop();
      cMatrix.values = first.values;
      marginalMatrices.forEach( matrix => {
        cMatrix.values = cMatrix.kronecker(matrix);
      });
    };
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

  get betweenISUFactorsSubscription(): Subscription {
    return this._betweenISUFactorsSubscription;
  }

  set betweenISUFactorsSubscription(value: Subscription) {
    this._betweenISUFactorsSubscription = value;
  }

  get hypothesisEffectSubscription(): Subscription {
    return this._hypothesisEffectSubscription;
  }

  set hypothesisEffectSubscription(value: Subscription) {
    this._hypothesisEffectSubscription = value;
  }
}
