import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {isNullOrUndefined} from 'util';
import {StudyService} from '../study.service';
import {constants} from '../../shared/constants';

@Component({
  selector: 'app-optional-specs-power-data-series',
  templateUrl: './optional-specs-power-curve-data-series.component.html',
  styleUrls: ['./optional-specs-power-curve-data-series.component.scss']
})
export class OptionalSpecsPowerCurveDataSeriesComponent implements OnInit, OnDestroy {
  private _solveForSubscription: Subscription;
  private _powerSubscription: Subscription;
  private _typeOneErrorRateSubscription: Subscription;
  private _meanScaleFactorSubscription: Subscription;
  private _varianceScaleFactorsSubscription: Subscription;

  private _solveFor: string;
  private _power: number;
  private _typeOneErrorRate: number;
  private _meanScaleFactor: number;
  private _varianceScaleFactors: number[];

  private hasPower: boolean;
  private hasMeanScaleFactors: boolean;
  private hasVarianceScaleFactors: boolean;

  constructor(private study_service: StudyService) {
    this.solveForSubscription = this.study_service.solveForSelected$.subscribe(
      solveFor => {
        this.solveFor = solveFor;
        if (this.solveFor === constants.SOLVE_FOR_SAMPLESIZE) {
          this.hasPower = true;
        } else {
          this.hasPower = false;
        }
      }
    );
    this.powerSubscription = this.study_service.power$.subscribe(
      power => {
        this.power = power;
      }
    );
    this.typeOneErrorRateSubscription = this.study_service.typeOneErrorRate$.subscribe(
      typeOneErrorRate => {
        this.typeOneErrorRate = typeOneErrorRate
      });
    this.meanScaleFactorSubscription = this.study_service.scaleFactor$.subscribe(
      scaleFactor => {
        this.meanScaleFactor = scaleFactor
        if (!isNullOrUndefined(this.meanScaleFactor)) {
          this.hasMeanScaleFactors = true;
        } else {
          this.hasMeanScaleFactors = false;
        }
      }
    );
    this.varianceScaleFactorsSubscription = this.study_service.varianceScaleFactors$.subscribe(
      factors => {
        this.varianceScaleFactors = factors;
        if (!isNullOrUndefined(this.varianceScaleFactors) && this.varianceScaleFactors.length > 0) {
          this.hasVarianceScaleFactors = true;
        } else {
          this.hasVarianceScaleFactors = false;
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.solveForSubscription.unsubscribe();
    this.powerSubscription.unsubscribe();
    this.typeOneErrorRateSubscription.unsubscribe();
    this.meanScaleFactorSubscription.unsubscribe();
    this.varianceScaleFactorsSubscription.unsubscribe();
  }

  get solveForSubscription(): Subscription {
    return this._solveForSubscription;
  }

  set solveForSubscription(value: Subscription) {
    this._solveForSubscription = value;
  }

  get powerSubscription(): Subscription {
    return this._powerSubscription;
  }

  set powerSubscription(value: Subscription) {
    this._powerSubscription = value;
  }

  get typeOneErrorRateSubscription(): Subscription {
    return this._typeOneErrorRateSubscription;
  }

  set typeOneErrorRateSubscription(value: Subscription) {
    this._typeOneErrorRateSubscription = value;
  }

  get varianceScaleFactorsSubscription(): Subscription {
    return this._varianceScaleFactorsSubscription;
  }

  set varianceScaleFactorsSubscription(value: Subscription) {
    this._varianceScaleFactorsSubscription = value;
  }

  get meanScaleFactorSubscription(): Subscription {
    return this._meanScaleFactorSubscription;
  }

  set meanScaleFactorSubscription(value: Subscription) {
    this._meanScaleFactorSubscription = value;
  }

  get solveFor(): string {
    return this._solveFor;
  }

  set solveFor(value: string) {
    this._solveFor = value;
  }

  get power(): number {
    return this._power;
  }

  set power(value: number) {
    this._power = value;
  }

  get typeOneErrorRate(): number {
    return this._typeOneErrorRate;
  }

  set typeOneErrorRate(value: number) {
    this._typeOneErrorRate = value;
  }

  get meanScaleFactor(): number {
    return this._meanScaleFactor;
  }

  set meanScaleFactor(value: number) {
    this._meanScaleFactor = value;
  }

  get varianceScaleFactors(): number[] {
    return this._varianceScaleFactors;
  }

  set varianceScaleFactors(value: number[]) {
    this._varianceScaleFactors = value;
  }
}
