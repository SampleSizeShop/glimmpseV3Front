import {Component, OnDestroy, OnInit} from '@angular/core';
import {constants, getStageName} from '../../shared/constants';
import {Subscription} from 'rxjs';
import {StudyService} from '../study.service';
import {ISUFactors} from '../../shared/ISUFactors';
import {PartialMatrix} from '../../shared/PartialMatrix';
import {isNullOrUndefined} from 'util';
import * as math from 'mathjs';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';

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

  constructor(private study_service: StudyService, private router: Router, private log: NGXLogger) {
    this.showAdvancedOptions = false;

    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this._isuFactors = isuFactors;
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
  }

  ngOnDestroy() {
    this.withinHypothesisNatureSubscription.unsubscribe();
  }

  setNature(name: string, nature: string) {
    this.log.debug( name + ' set: ' + nature );
    this._isuFactors.repeatedMeasures.forEach( measure => {
        if (measure.name === name) {
          measure.isuFactorNature = nature;
          measure.populatePartialMatrix();
        }
      }
    );
  }

  isSelected(hypothesis: string): boolean {
    return this.withinHypothesisNature === hypothesis;
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

  get uMatrix() {
    let m = this._uOutcomes.kronecker(this._uRepeatedMeasures);
    m = math.kron(m, math.matrix([this._uCluster]));
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
