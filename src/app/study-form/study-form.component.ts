import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from './study.service';
import {Subscription} from 'rxjs/Subscription';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../shared/constants';
import {NavigationService} from '../shared/navigation.service';
import {StudyDesign} from '../shared/study-design';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-study-form',
  templateUrl: './study-form.component.html',
  styleUrls: ['./study-form.component.scss'],
  providers: [NGXLogger, NavigationService]
})
export class StudyFormComponent implements OnInit, OnDestroy, DoCheck {
  private _valid = false;
  private _hasNext: boolean;
  private _hasBack: boolean;
  private _guided: boolean;
  private _study: StudyDesign;

  private _modeSubscription: Subscription;
  private _targetEventSubscription: Subscription;
  private _solveForSubscription: Subscription;
  private _powerSubscription: Subscription;
  private _samplesizeSubscription: Subscription;
  private _ciwidthSubscription: Subscription;
  private _selectedTestsSubscription: Subscription;
  private _typeOneErrorRateSubscription: Subscription;
  private _withinIsuOutcomeSubscription: Subscription;
  private _withinIsuRepeatedMeasuresSubscription: Subscription;
  private _withinIsuClusterSubscription: Subscription;
  private _betweenIsuPredictorsSubscription: Subscription;
  private _isuFactorsSubscription: Subscription;
  private _gaussianCovariateSubscription: Subscription;
  private _hypothesisEffectSubscription: Subscription;
  private _scaleFactorSubscription: Subscription;
  private _varianceScaleFactorsSubscription: Subscription;
  private _powerCurveSubscription: Subscription;

  private _nextEnabledSubscription: Subscription;
  private _childNavigationModeSubscription: Subscription;
  private _validSubscription: Subscription;

  private _stages;
  private _noStages: number;
  private _childComponentNav: boolean;
  private parameters = [];

  constructor(
    private study_service: StudyService,
    private log: NGXLogger,
    private navigation_service: NavigationService,
    private router: Router
  ) {
    this.study = new StudyDesign();
    this.subscribeToStudyService();
    this.subscribeToNavigationService();
  }

  next(stage?: number): void {
    if (this.childComponentNav &&  this.valid) {
      this.navigation_service.updateNavigation('NEXT');
    } else {
      let current = this.getStage();
      if (stage) {
        current = stage;
      }
      if ( current <= this._noStages &&  this.valid ) {
        if (current === 9
          && (isNullOrUndefined(this.study.isuFactors)
          || this.study.isuFactors.predictors.length === 0)) {
          this.setStage(11)
        } else if (
          current === 18
          && !isNullOrUndefined(this.study.isuFactors.repeatedMeasures)
          && this.study.isuFactors.repeatedMeasures.length > 0) {
          this.setStage(19);
          this.parameters = [];
          this.parameters.push(this.study.isuFactors.firstOutcome.name);
          this.parameters.push(this.study.isuFactors.firstRepeatedMeasure.name);
        } else if (
            current === 19
            && !isNullOrUndefined(this.study.isuFactors.repeatedMeasures)
            && this.study.isuFactors.repeatedMeasures.length > 0) {

          const currentMeasureName = this.parameters.pop();
          const nextMeasure = this.study.isuFactors.getNextRepeatedMeasure(currentMeasureName);
          const currentOutcomeName = this.parameters.pop();
          const nextOutcome = this.study.isuFactors.getNextOutcome(currentOutcomeName);
          this.parameters = [];
          if (!isNullOrUndefined(nextMeasure)) {
            // next outcome/repeates measure standard deviation
            this.parameters.push(currentOutcomeName);
            this.parameters.push(nextMeasure.name);
            this.setStage(19);
          } else if (!isNullOrUndefined(nextOutcome)) {
            // next outcome/repeates measure standard deviation
            this.parameters.push(nextOutcome.name);
            this.parameters.push(this.study.isuFactors.firstRepeatedMeasure.name);
            this.setStage(19);
          } else {
            // first repeated measure correlation
            this.setStage(20);
            this.parameters.push(this.study.isuFactors.firstRepeatedMeasure.name);
          }
        } else if (current === 20) {
          const currentName = this.parameters.pop();
          const next = this.study.isuFactors.getNextRepeatedMeasure(currentName);
          if (!isNullOrUndefined(next)) {
            this.parameters.push(next.name);
            this.setStage(20);
          } else {
            this.parameters = [];
            this.setStage(21);
          }
        } else if (current === 26) {
          this.setStage(35);
        } else if (current === 29) {
          this.setStage(26);
        } else if (current === 34) {
          this.setStage(29);
        } else {
          this.setStage( current + 1 );
        }
        this.navigate(this.study_service.stage, 'NEXT');
        this.setNextBack();
      }
    }
  }

  private navigate(stage: number, direction: string) {
    let params = ['design', constants.STAGES[stage]];
    params = params.concat(this.parameters);
    this.log.debug(params);
    const success = this.router.navigate(params);
    success.then( loaded => {
      if ( !loaded) {
        if (direction === 'NEXT') {
          this.next( stage );
        } else if ( direction === 'BACK') {
          this.back( stage );
        }
      }
    });
  }

  back(stage?: number): void {
    if (this.childComponentNav) {
      this.navigation_service.updateNavigation('BACK');
    } else {
      let current = this.getStage();
      if (stage) {
        current = stage;
      }
      if (current > 1) {
        if (current === 11
          && (isNullOrUndefined(this.study.isuFactors)
          || this.study.isuFactors.predictors.length === 0)) {
          this.setStage(9)
        } else if (current === 19) {
          const currentMeasure = this.parameters.pop();
          const currentOutcome = this.parameters.pop();
          const previousMeasure = this.study.isuFactors.getPreviousRepeatedMeasure(currentMeasure);
          const previousOutcome = this.study.isuFactors.getPreviousOutcome(currentOutcome);
          this.parameters = [];
          if (!isNullOrUndefined(previousMeasure)) {
            this.parameters.push(currentOutcome);
            this.parameters.push(previousMeasure.name);
            this.setStage(19);
          } else if (!isNullOrUndefined(previousOutcome)) {
            this.parameters.push(previousOutcome.name);
            this.parameters.push(this.study.isuFactors.lastRepeatedMeasure.name);
            this.setStage(19);
          } else {
            this.setStage(18);
          }
        } else if (current === 20) {
          const currentName = this.parameters.pop();
          const previous = this.study.isuFactors.getPreviousRepeatedMeasure(currentName);
          this.parameters = [];
          if (!isNullOrUndefined(previous)) {
            this.parameters.push(previous.name);
            this.setStage(20);
          } else {
            const lastOutcome = this.study.isuFactors.lastOutcome;
            const lastMeasure = this.study.isuFactors.lastRepeatedMeasure;
            if (
              !isNullOrUndefined(lastOutcome) &&
              !isNullOrUndefined(lastMeasure)) {
              this.parameters.push(lastOutcome.name);
              this.parameters.push(lastMeasure.name);
            }
            this.setStage(19);
          }
        } else if (current === 21
          && !isNullOrUndefined(this.study.isuFactors.repeatedMeasures)
          && this.study.isuFactors.repeatedMeasures.length > 0 ) {
          this.setStage(20);
          this.parameters = [];
          this.parameters.push(this.study.isuFactors.lastRepeatedMeasure.name);
        } else if (current === 35) {
          this.setStage(26);
        } else {
          this.setStage(current - 1);
        }
      }
      this.navigate(this.study_service.stage, 'BACK');
      this.setNextBack();
      this.valid = true;
    }
  }

  setNextBack(): void {
   const current = this.getStage();
   if ( current < this._noStages ) {
     this.hasNext = true;
   } else {
     this.hasNext = false;
   }
   if ( current > 1 ) {
     this.hasBack = true;
   } else {
     this.hasBack = false;
   }
  }

  ngOnInit() {
    this._stages = constants.STAGES;
    this._noStages = Object.keys(this._stages).length;
    this.hasNext = true;
    this.hasBack = false;
  }

  ngDoCheck() {
    const name = this.router.url.replace('/design/', '');
    if (name !== this.getStageName()) {
      if (isNullOrUndefined(name) || name === '/design') {
        this.setStage(1);
      } else {
        const stage = this.study_service.getStageFromName(name);
        if (stage !== -1 && stage !== this.study_service.stage) {
          this.setStage(stage);
        }
      }
      this.childComponentNav = false;
    }
    this.setNextBack();
    this.study_service.updateStudyDesign(this.study);
  }

  ngOnDestroy() {
    this.unsubscribeFromStudyService();
    this.unsubscribeFromNavigationService();
  }

  get valid(): boolean {
    return this._valid;
  }

  set valid(value: boolean) {
    this._valid = value;
  }

  get guided(): boolean {
    return this._guided;
  }

  set guided(value: boolean) {
    this._guided = value;
  }

  getStageName(): string {
    return this._stages[this.study_service.stage];
  }

  getStage(): number {
    return this.study_service.stage;
  }
  setStage(stage: number): void {
    this.study_service.stage = stage;
  }

  get noStages(): number {
    return this._noStages;
  }

  set noStages(value: number) {
    this._noStages = value;
  }

  get stages() {
    return this._stages;
  }

  set stages(value) {
    this._stages = value;
  }

  get hasNext(): boolean {
    return this._hasNext;
  }

  set hasNext(value: boolean) {
    this._hasNext = value;
  }

  get hasBack(): boolean {
    return this._hasBack;
  }

  set hasBack(value: boolean) {
    this._hasBack = value;
  }

  get modeSubscription(): Subscription {
    return this._modeSubscription;
  }

  set modeSubscription(value: Subscription) {
    this._modeSubscription = value;
  }

  get targetEventSubscription(): Subscription {
    return this._targetEventSubscription;
  }

  set targetEventSubscription(value: Subscription) {
    this._targetEventSubscription = value;
  }

  get solveForSubscription(): Subscription {
    return this._solveForSubscription;
  }

  set solveForSubscription(value: Subscription) {
    this._solveForSubscription = value;
  }

  get childComponentNav(): boolean {
    return this._childComponentNav;
  }

  set childComponentNav(value: boolean) {
    this._childComponentNav = value;
  }

  get nextEnabledSubscription(): Subscription {
    return this._nextEnabledSubscription;
  }

  set nextEnabledSubscription(value: Subscription) {
    this._nextEnabledSubscription = value;
  }

  get childNavigationModeSubscription(): Subscription {
    return this._childNavigationModeSubscription;
  }

  set childNavigationModeSubscription(value: Subscription) {
    this._childNavigationModeSubscription = value;
  }

  get validSubscription(): Subscription {
    return this._validSubscription;
  }

  set validSubscription(value: Subscription) {
    this._validSubscription = value;
  }

  get study(): StudyDesign {
    return this._study;
  }

  set study(value: StudyDesign) {
    this._study = value;
  }

  get powerSubscription(): Subscription {
    return this._powerSubscription;
  }

  set powerSubscription(value: Subscription) {
    this._powerSubscription = value;
  }

  get samplesizeSubscription(): Subscription {
    return this._samplesizeSubscription;
  }

  set samplesizeSubscription(value: Subscription) {
    this._samplesizeSubscription = value;
  }

  get ciwidthSubscription(): Subscription {
    return this._ciwidthSubscription;
  }

  set ciwidthSubscription(value: Subscription) {
    this._ciwidthSubscription = value;
  }

  get selectedTestsSubscription(): Subscription {
    return this._selectedTestsSubscription;
  }

  set selectedTestsSubscription(value: Subscription) {
    this._selectedTestsSubscription = value;
  }

  get typeOneErrorRateSubscription(): Subscription {
    return this._typeOneErrorRateSubscription;
  }

  set typeOneErrorRateSubscription(value: Subscription) {
    this._typeOneErrorRateSubscription = value;
  }

  get withinIsuOutcomeSubscription(): Subscription {
    return this._withinIsuOutcomeSubscription;
  }

  set withinIsuOutcomeSubscription(value: Subscription) {
    this._withinIsuOutcomeSubscription = value;
  }

  get withinIsuRepeatedMeasuresSubscription(): Subscription {
    return this._withinIsuRepeatedMeasuresSubscription;
  }

  set withinIsuRepeatedMeasuresSubscription(value: Subscription) {
    this._withinIsuRepeatedMeasuresSubscription = value;
  }

  get withinIsuClusterSubscription(): Subscription {
    return this._withinIsuClusterSubscription;
  }

  set withinIsuClusterSubscription(value: Subscription) {
    this._withinIsuClusterSubscription = value;
  }

  get betweenIsuPredictorsSubscription(): Subscription {
    return this._betweenIsuPredictorsSubscription;
  }

  set betweenIsuPredictorsSubscription(value: Subscription) {
    this._betweenIsuPredictorsSubscription = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get gaussianCovariateSubscription(): Subscription {
    return this._gaussianCovariateSubscription;
  }

  set gaussianCovariateSubscription(value: Subscription) {
    this._gaussianCovariateSubscription = value;
  }

  get hypothesisEffectSubscription(): Subscription {
    return this._hypothesisEffectSubscription;
  }

  set hypothesisEffectSubscription(value: Subscription) {
    this._hypothesisEffectSubscription = value;
  }

  get scaleFactorSubscription(): Subscription {
    return this._scaleFactorSubscription;
  }

  set scaleFactorSubscription(value: Subscription) {
    this._scaleFactorSubscription = value;
  }

  get varianceScaleFactorsSubscription(): Subscription {
    return this._varianceScaleFactorsSubscription;
  }

  set varianceScaleFactorsSubscription(value: Subscription) {
    this._varianceScaleFactorsSubscription = value;
  }

  get powerCurveSubscription(): Subscription {
    return this._powerCurveSubscription;
  }

  set powerCurveSubscription(value: Subscription) {
    this._powerCurveSubscription = value;
  }

  subscribeToStudyService() {
    this.modeSubscription = this.study_service.modeSelected$.subscribe(
      guided => {
        this.guided = guided;
        this.valid = guided;
      }
    );

    this.targetEventSubscription = this.study_service.targetEventSelected$.subscribe(
      targetEvent => {
        this.study.targetEvent = targetEvent;
        this.valid = true;
      }
    );

    this.solveForSubscription = this.study_service.solveForSelected$.subscribe(
      solveFor => {
        this.study.solveFor = solveFor;
        this.valid = true;
      }
    );

    this.samplesizeSubscription = this.study_service.samplesize$.subscribe(
      samplesize => {
        this.study.samplesize = samplesize;
      }
    );

    this.ciwidthSubscription = this.study_service.ciwidth$.subscribe(
      ciwidth => {
        this.study.ciwidth = ciwidth;
      }
    );

    this.powerSubscription = this.study_service.power$.subscribe(
      power => {
        this.study.power = power;
      }
    );

    this.selectedTestsSubscription = this.study_service.selectdTests$.subscribe(
      tests => {
        this.study.selectedTests = tests;
      }
    );

    this.typeOneErrorRateSubscription = this.study_service.typeOneErrorRate$.subscribe(
      rate => {
        this.study.typeOneErrorRate = rate;
      }
    );

    this.withinIsuOutcomeSubscription = this.study_service.withinIsuOutcomes$.subscribe(
      outcomes => {
        this.study.isuFactors.updateOutcomes(outcomes);
        this.study.checkDependencies();
        this.updateISUFactors();
      }
    );

    this.withinIsuRepeatedMeasuresSubscription = this.study_service.withinIsuRepeatedMeasures$.subscribe(
      measures => {
        this.study.isuFactors.updateRepeatedMeasures(measures);
        this.study.checkDependencies();
        this.updateISUFactors();
      }
    );

    this.withinIsuClusterSubscription = this.study_service.withinIsuCluster$.subscribe(
      cluster => {
        this.study.isuFactors.updateCluster(cluster);
      }
    );

    this.betweenIsuPredictorsSubscription = this.study_service.betweenIsuPredictors$.subscribe(
      predictors => {
        this.study.isuFactors.updatePredictors(predictors);
        this.study.checkDependencies();
        this.updateISUFactors();
      }
    );

    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe(
      factors => {
        this.study.isuFactors = factors;
        this.study.checkDependencies();
      }
    );

    this.gaussianCovariateSubscription = this.study_service.gaussianCovariate$.subscribe(
      gaussianCovariate => {
        this.study.gaussianCovariate = gaussianCovariate;
      }
    );

    this.hypothesisEffectSubscription = this.study_service.hypothesisEffect$.subscribe(
      hypothesisEffect => {
        this.study.isuFactors.updateHypothesis(hypothesisEffect);
        this.study.checkDependencies();
        this.updateISUFactors();
      }
    );

    this.scaleFactorSubscription = this.study_service.scaleFactor$.subscribe(
      scaleFactor => {
        this.study.scaleFactor = scaleFactor;
      }
    );

    this.varianceScaleFactorsSubscription = this.study_service.varianceScaleFactors$.subscribe(
      scaleFactors => {
        this.study.varianceScaleFactors = scaleFactors;
      }
    );

    this.powerCurveSubscription = this.study_service.powerCurve$.subscribe(
      powerCurve => {
        this.study.checkDependencies();
        this.study.powerCurve = powerCurve;
      }
    );
  };

  updateISUFactors() {
    this.study_service.updateIsuFactors(this.study.isuFactors);
  }

  unsubscribeFromStudyService() {
    this.modeSubscription.unsubscribe();
    this.targetEventSubscription.unsubscribe();
    this.solveForSubscription.unsubscribe();
    this.powerSubscription.unsubscribe();
    this.samplesizeSubscription.unsubscribe();
    this.ciwidthSubscription.unsubscribe();
    this.selectedTestsSubscription.unsubscribe();
    this.typeOneErrorRateSubscription.unsubscribe();
    this.withinIsuOutcomeSubscription.unsubscribe();
    this.withinIsuRepeatedMeasuresSubscription.unsubscribe();
    this.withinIsuClusterSubscription.unsubscribe();
    this.betweenIsuPredictorsSubscription.unsubscribe();
    this.isuFactorsSubscription.unsubscribe();
    this.gaussianCovariateSubscription.unsubscribe();
    this.hypothesisEffectSubscription.unsubscribe();
    this.scaleFactorSubscription.unsubscribe();
    this.varianceScaleFactorsSubscription.unsubscribe();
  };

  subscribeToNavigationService() {
    this.childComponentNav = false;
    this.childNavigationModeSubscription = this.navigation_service.childNavigationMode$.subscribe(
      childNavMode => {
        this.childComponentNav = childNavMode;
      }
    );

    this.validSubscription = this.navigation_service.valid$.subscribe(
      valid => {
        this.valid = valid;
      }
    );

    this.nextEnabledSubscription = this.navigation_service.nextEnabled$.subscribe(
      enabled => {
        this.hasNext = enabled;
      }
    );
  };

  unsubscribeFromNavigationService() {
    this.nextEnabledSubscription.unsubscribe();
    this.childNavigationModeSubscription.unsubscribe();
    this.validSubscription.unsubscribe();
  };
}
