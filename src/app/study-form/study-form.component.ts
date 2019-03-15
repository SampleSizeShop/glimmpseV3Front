import {ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from './study.service';
import {Subscription} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {constants, getStageName} from '../shared/constants';
import {NavigationService} from '../shared/navigation.service';
import {StudyDesign} from '../shared/study-design';
import {isNullOrUndefined} from 'util';
import {NavigationEnd, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {routeSlideAnimation} from '../animations';
import {Observable} from 'rxjs/Observable';
import {map, pairwise, share, startWith} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/index';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-study-form',
  templateUrl: './study-form.component.html',
  styleUrls: ['./study-form.component.scss'],
  providers: [NGXLogger, NavigationService],
  animations: [
    routeSlideAnimation,
    trigger('validInvalid',
      [
        state('valid', style({ color: 'yellowgreen', fontSize: '112px', opacity: 0.8, verticalAlign: 'middle'})),
        state('invalid', style({color: 'darkgrey', fontSize: '92px', opacity: 0.5, verticalAlign: 'middle'})),
        transition('invalid => valid', [animate('0.4s')]),
        transition('valid => invalid', [animate('0.4s')])
      ]
    )
  ]
})
export class StudyFormComponent implements OnInit, OnDestroy, DoCheck {
  private _valid = false;
  private _nextValid = false;
  private _hasNext: boolean;
  private _hasBack: boolean;
  private _guided: boolean;
  private _study: StudyDesign;

  private __studyTitleSubscription: Subscription;
  private _modeSubscription: Subscription;
  private _targetEventSubscription: Subscription;
  private _solveForSubscription: Subscription;
  private _powerSubscription: Subscription;
  private _ciwidthSubscription: Subscription;
  private _selectedTestsSubscription: Subscription;
  private _typeOneErrorRateSubscription: Subscription;
  private _quantilesSubscription: Subscription;
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
  private _navDirectionSubsctiption: Subscription;
  private _defineFullBetaSubscription: Subscription;
  private _direction: string;

  private _validSubscription: Subscription;
  private _isInternalSubscription: Subscription;

  private next$: Observable<number>;
  private prev$: Observable<number>;
  private _navDirection$: Observable<any>;

  private _stages;
  private _noStages: number;
  private parameters = [];

  private _stageSource = new BehaviorSubject<number>(0);
  private _stage$ = this._stageSource.asObservable();

  private _isInternal: boolean;


  afuConfig3 = {
    theme: 'dragNDrop',
    hideProgressBar: true,
    hideResetBtn: true,
    maxSize: '1',
    uploadAPI: {
      url: 'https://localhost/files.upload'
    },
    formatsAllowed: '.json',
    multiple: false
  };
  resetUpload3: boolean;

  constructor(
    private study_service: StudyService,
    private log: NGXLogger,
    private navigation_service: NavigationService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {
    this._isInternal = false;
    this.study = new StudyDesign();
    this.subscribeToStudyService();
    this.subscribeToNavigationService();
    this.setupRouting();
  }

  private setupRouting() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this._stageSource.next(this.getStage());
        this.setNextBack();
      }
    });
    this.prev$ = this._stage$
      .pipe(
        map(index => index === 0 ? index : +index - 1),
        share()
      );
    this.next$ = this._stage$
      .pipe(
        map(index =>  +index + 1),
        share()
      );
    this.navDirection$ = this._stage$
      .pipe(
        startWith(0),
        pairwise(),
        map(([prev, curr]) => ({
          value: +curr,
          params: {
            offsetEnter: prev > curr ? 100 : -100,
            offsetLeave: prev > curr ? -100 : 100
          }
        }))
      );
  }

  toggleHelpText() {
    this.navigation_service.toggleHelpText();
  }

  next(stage?: number): void {
    this.navigation_service.updateIsClickNext(true);
    let current = this.getStage();
    let next = this.getStage();
    if (stage) {
      current = stage;
    }
    if ( current <= this._noStages &&  this.valid ) {
      if (current === this.stages.BETWEEN_ISU_SMALLEST_GROUP
        && (isNullOrUndefined(this.study.isuFactors)
        || this.study.isuFactors.betweenIsuRelativeGroupSizes.length > 0)) {
        this.parameters = [];
        this.parameters.push(this.study.isuFactors.betweenIsuRelativeGroupSizes.indexOf(
          this.study.isuFactors.firstRelativeGroupSizeTable
        ));
        next = this.stages.BETWEEN_ISU_GROUPS;
      } else if (current === this.stages.BETWEEN_ISU_GROUPS
        && (isNullOrUndefined(this.study.isuFactors)
          || this.study.isuFactors.betweenIsuRelativeGroupSizes.length > 0)) {
        const currentIndex = this.parameters.pop();
        const nextTable = this.study.isuFactors.getNextRelativeGroupSizeTable(currentIndex);
        if (!isNullOrUndefined(nextTable)) {
          this.parameters.push(currentIndex + 1);
          next = this.stages.BETWEEN_ISU_GROUPS;
        } else {
          next = this.stages.GAUSSIAN_COVARIATE;
        }
      } else if (
      current === this.stages.HYPOTHESIS_THETA_0
      && !isNullOrUndefined(this.study.isuFactors.outcomes)
      && this.study.isuFactors.outcomes.length > 0) {
        next = this.stages.PARAMETERS_MARGINAL_MEANS;
        this.parameters = [];
        this.parameters.push(0);
      } else if (
        current === this.stages.PARAMETERS_MARGINAL_MEANS
        && !isNullOrUndefined(this.study.isuFactors.outcomes)
        && this.study.isuFactors.outcomes.length > 0) {
        const currentIndex = this.parameters.pop();
        const nextTable = this.study.isuFactors.getNextMarginalMeansTable(currentIndex);
        if (!isNullOrUndefined(nextTable)) {
          this.parameters.push(currentIndex + 1);
          next = this.stages.PARAMETERS_MARGINAL_MEANS;
        } else {
          next = this.stages.PARAMETERS_SCALE_FACTOR;
        }
      } else if (
        current === this.stages.PARAMETERS_REPEATED_MEASURE_ST_DEV - 1
        && !isNullOrUndefined(this.study.isuFactors.repeatedMeasures)
        && this.study.isuFactors.repeatedMeasures.length > 0) {
        next = this.stages.PARAMETERS_REPEATED_MEASURE_ST_DEV;
        this.parameters = [];
        this.parameters.push(this.study.isuFactors.firstRepeatedMeasure.name);
      } else if (
          current === this.stages.PARAMETERS_REPEATED_MEASURE_ST_DEV
          && !isNullOrUndefined(this.study.isuFactors.repeatedMeasures)
          && this.study.isuFactors.repeatedMeasures.length > 0) {

        const currentMeasureName = this.parameters.pop();
        const nextMeasure = this.study.isuFactors.getNextRepeatedMeasure(currentMeasureName);
        this.parameters = [];
        if (!isNullOrUndefined(nextMeasure)) {
          this.parameters.push(nextMeasure.name);
          next = this.stages.PARAMETERS_REPEATED_MEASURE_ST_DEV;
        } else {
          // first repeated measure correlation
          next = this.stages.PARAMETERS_REPEATED_MEASURE_ST_DEV + 1;
          this.parameters.push(this.study.isuFactors.firstRepeatedMeasure.name);
        }
      } else if (current === this.stages.PARAMETERS_REPEATED_MEASURE_CORRELATION) {
        const currentName = this.parameters.pop();
        const nextMeasure = this.study.isuFactors.getNextRepeatedMeasure(currentName);
        if (!isNullOrUndefined(nextMeasure)) {
          this.parameters.push(nextMeasure.name);
          next = this.stages.PARAMETERS_REPEATED_MEASURE_CORRELATION;
        } else {
          this.parameters = [];
          next = this.stages.PARAMETERS_INTRA_CLASS_CORRELATION;
        }
      } else {
        next = current + 1;
      }
      this.navigate(next, 'NEXT');
      this.setNextBack();
    }
  }

  private navigate(stage: number, direction: string) {
    let params = ['design', getStageName(stage)];
    params = params.concat(this.parameters);
    this.log.debug(params);
    const success = this.router.navigate(params);
    success.then( loaded => {
      if ( !loaded && this._direction !== 'CANCEL') {
        if (direction === 'NEXT') {
          this.next( stage );
        } else if ( direction === 'BACK') {
          this.back( stage );
        }
      }
    });
  }

  back(stage?: number): void {
    this.navigation_service.updateIsClickNext(false);
    let current = this.getStage();
    let previous = this.getStage();
    this.study_service.updateDirection('BACK');
    if (stage) {
      current = stage;
    }
    if (current > 0) {
      if (current === this.stages.BETWEEN_ISU_GROUPS
        && (isNullOrUndefined(this.study.isuFactors)
          || this.study.isuFactors.betweenIsuRelativeGroupSizes.length > 0)) {
        const currentIndex = this.parameters.pop();
        const previousIndex = currentIndex - 1;
        if (!isNullOrUndefined(previousIndex) && previousIndex >= 0) {
          this.parameters.push(previousIndex);
          previous = this.stages.BETWEEN_ISU_GROUPS;
        } else {
          this.parameters = []
          previous = this.stages.BETWEEN_ISU_SMALLEST_GROUP;
        }
      } else if (current === this.stages.GAUSSIAN_COVARIATE
        && (isNullOrUndefined(this.study.isuFactors)
        || this.study.isuFactors.betweenIsuRelativeGroupSizes.length === 0)) {
        previous = this.stages.BETWEEN_ISU_SMALLEST_GROUP;
      } else if  (current === this.stages.GAUSSIAN_COVARIATE
        && (isNullOrUndefined(this.study.isuFactors)
        || this.study.isuFactors.betweenIsuRelativeGroupSizes.length > 0)) {
        const currentIndex = this.study.isuFactors.betweenIsuRelativeGroupSizes.length - 1;
        this.parameters = [];
        this.parameters .push(currentIndex);
        previous = this.stages.BETWEEN_ISU_GROUPS;
      } else if (
        current === this.stages.PARAMETERS_MARGINAL_MEANS
        && !isNullOrUndefined(this.study.isuFactors.outcomes)
        && this.study.isuFactors.outcomes.length > 0) {
        const currentIndex = this.parameters.pop();
        const previousIndex = currentIndex - 1;
        this.parameters = [];
        if (!isNullOrUndefined(previousIndex) && previousIndex >= 0) {
          // next outcome marginal means
          this.parameters.push(previousIndex);
          previous = this.stages.PARAMETERS_MARGINAL_MEANS;
        } else {
          previous = this.stages.HYPOTHESIS_THETA_0;
        }
      } else if (current === this.stages.PARAMETERS_SCALE_FACTOR
        && !isNullOrUndefined(this.study.isuFactors.outcomes)
        && this.study.isuFactors.marginalMeans.length > 0) {
        previous = this.stages.PARAMETERS_MARGINAL_MEANS;
        this.parameters = [];
        this.parameters.push(this.study.isuFactors.marginalMeans.length - 1);
      } else if (current === this.stages.PARAMETERS_REPEATED_MEASURE_ST_DEV) {
        const currentMeasure = this.parameters.pop();
        const previousMeasure = this.study.isuFactors.getPreviousRepeatedMeasure(currentMeasure);
        this.parameters = [];
        if (!isNullOrUndefined(previousMeasure)) {
          this.parameters.push(previousMeasure.name);
          previous = this.stages.PARAMETERS_REPEATED_MEASURE_ST_DEV;
        } else {
          previous = this.stages.PARAMETERS_OUTCOME_CORRELATION;
        }
      } else if (current === this.stages.PARAMETERS_REPEATED_MEASURE_CORRELATION) {
        const currentName = this.parameters.pop();
        const previousMeasure = this.study.isuFactors.getPreviousRepeatedMeasure(currentName);
        this.parameters = [];
        if (!isNullOrUndefined(previousMeasure)) {
          this.parameters.push(previousMeasure.name);
          previous = this.stages.PARAMETERS_REPEATED_MEASURE_CORRELATION;
        } else {
          const lastMeasure = this.study.isuFactors.lastRepeatedMeasure;
          if (
            !isNullOrUndefined(lastMeasure)) {
            this.parameters.push(lastMeasure.name);
          }
          previous = this.stages.PARAMETERS_REPEATED_MEASURE_ST_DEV;
        }
      } else if (current === this.stages.PARAMETERS_INTRA_CLASS_CORRELATION
        && !isNullOrUndefined(this.study.isuFactors.repeatedMeasures)
        && this.study.isuFactors.repeatedMeasures.length > 0 ) {
        previous = this.stages.PARAMETERS_REPEATED_MEASURE_CORRELATION;
        this.parameters = [];
        this.parameters.push(this.study.isuFactors.lastRepeatedMeasure.name);
      } else {
        previous = current - 1;
      }
    }
    this.navigate(previous, 'BACK');
    this.setNextBack();
    // this.valid = true;
  }

  setNextBack(): void {
   const current = this.getStage();
   if ( current < this._noStages ) {
     this.hasNext = true;
   } else {
     this.hasNext = false;
   }
   if ( current > 0 ) {
     this.hasBack = true;
   } else {
     this.hasBack = false;
   }
  }

  ngOnInit() {
    this._stages = constants.STAGES;
    this._noStages = Object.keys(this._stages).length - 1;
    this.study_service.selectTargetEvent(constants.REJECTION_EVENT);

    this.hasNext = true;
    this.hasBack = false;
  }

  ngDoCheck() {
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

  getCurrentStageName(): string {
    const url = this.router.url.split('/');
    if (url.length > 2) {
      return this.getUserFriendlyComponentName(url[2]);
    } else {
      return this.getUserFriendlyComponentName(url[0]);
    }
  }

  getStage(): number {
    const name = this.router.url.replace('/design/', '');
    const comp = name.split('/')[0];
    return Object.keys(constants.STAGES).indexOf(comp);
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

  get studyTitleSubscription(): Subscription {
    return this.__studyTitleSubscription;
  }

  set studyTitleSubscription(value: Subscription) {
    this.__studyTitleSubscription = value;
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

  get quantilesSubscription(): Subscription {
    return this._quantilesSubscription;
  }

  set quantilesSubscription(value: Subscription) {
    this._quantilesSubscription = value;
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
    this.studyTitleSubscription = this.study_service.studyTitle$.subscribe(
      title => {
        this.study.name = title;
      }
    );

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

    this.quantilesSubscription = this.study_service.quantiles$.subscribe(
      quantiles => {
        if (!isNullOrUndefined(quantiles)) {
          this.study.quantiles = Array.from(quantiles.values());
        }
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

    this._navDirectionSubsctiption = this.study_service.navigationDirection$.subscribe(
      direction => {
        this._direction = direction;
      }
    );

    this._defineFullBetaSubscription = this.study_service.defineFullBeta$.subscribe(
      fullbeta => {
        this.study.define_full_beta = fullbeta;
      }
    );
  }

  updateISUFactors() {
    this.study_service.updateIsuFactors(this.study.isuFactors);
  }

  unsubscribeFromStudyService() {
    this.modeSubscription.unsubscribe();
    this.targetEventSubscription.unsubscribe();
    this.solveForSubscription.unsubscribe();
    this.powerSubscription.unsubscribe();
    this.ciwidthSubscription.unsubscribe();
    this.selectedTestsSubscription.unsubscribe();
    this.typeOneErrorRateSubscription.unsubscribe();
    this.quantilesSubscription.unsubscribe();
    this.withinIsuOutcomeSubscription.unsubscribe();
    this.withinIsuRepeatedMeasuresSubscription.unsubscribe();
    this.withinIsuClusterSubscription.unsubscribe();
    this.betweenIsuPredictorsSubscription.unsubscribe();
    this.isuFactorsSubscription.unsubscribe();
    this.gaussianCovariateSubscription.unsubscribe();
    this.hypothesisEffectSubscription.unsubscribe();
    this.scaleFactorSubscription.unsubscribe();
    this.varianceScaleFactorsSubscription.unsubscribe();
    this.powerCurveSubscription.unsubscribe();
  };

  subscribeToNavigationService() {

    this.validSubscription = this.navigation_service.valid$.subscribe(
      valid => {
        this.valid = valid;
        this.nextValid = valid;
      }
    );
    this._isInternalSubscription = this.navigation_service.internalForm$.subscribe( isInternal => {
      this._isInternal = isInternal;
    });
  };

  get isInternal(): boolean {
    return this._isInternal;
  }

  unsubscribeFromNavigationService() {
    this.validSubscription.unsubscribe();
  };

  mouseEnterNext(val) {
    if (this.valid) {
      this.nextValid = true;
    }
  }

  mouseLeaveNext(val) {
    if (this.valid) {
      this.nextValid = false;
    }
  }

  mouseEnterBack(val) {
  }

  mouseLeaveBack(val) {
  }

  get nextValid(): boolean {
    return this._nextValid;
  }

  set nextValid(value: boolean) {
    this._nextValid = value;
  }

  get navDirection$(): Observable<any> {
    return this._navDirection$;
  }

  set navDirection$(value: Observable<any>) {
    this._navDirection$ = value;
  }

  get stageNames() {
    const list = [];
    for (const name of Object.keys(this.stages)) {
      list.push(this.getUserFriendlyComponentName(name));
    }
    return list;
  }

  getUserFriendlyComponentName(name: string) {
    if (name === 'STUDY_TITLE') {
      return 'Study Title'
    } else if (name === 'TARGET_EVENT') {
      return 'Choose Target Event';
    } else if (name === 'SOLVE_FOR') {
      return 'Solve For';
    } else if (name === 'STATISTICAL_TESTS') {
      return 'Statistical Tests';
    } else if (name === 'TYPE_ONE_ERROR') {
      return 'Type I Error Rates';
    } else if (name === 'WITHIN_ISU_OUTCOMES') {
      return 'Outcomes';
    } else if (name === 'WITHIN_ISU_REPEATED_MEASURES') {
      return 'Repeated Measures';
    } else if (name === 'WITHIN_ISU_CLUSTERS') {
      return 'Are your outcomes measured in a cluster?';
    } else if (name === 'BETWEEN_ISU_PREDICTORS') {
      return 'Predictors';
    } else if (name === 'BETWEEN_ISU_SMALLEST_GROUP') {
      return 'What size is your smallest group?';
    } else if (name === 'BETWEEN_ISU_GROUPS') {
      return 'Specify the relative sizes of the groups';
    } else if (name === 'GAUSSIAN_COVARIATE') {
      return 'Variability Due to the Gaussian Covariate';
    } else if (name === 'HYPOTHESIS_EFFECT_CHOICE') {
      return 'Hypothesis Choice';
    } else if (name === 'HYPOTHESIS_BETWEEN') {
      return 'Between Hypothesis';
    } else if (name === 'HYPOTHESIS_WITHIN') {
      return 'Within Hypothesis';
    } else if (name === 'HYPOTHESIS_THETA_0') {
      return 'Theta 0';
    } else if (name === 'PARAMETERS_MARGINAL_MEANS') {
      return 'Marginal Means';
    } else if (name === 'PARAMETERS_SCALE_FACTOR') {
      return 'Please specify the scale factor for the marginal means';
    } else if (name === 'PARAMETERS_STANDARD_DEVIATION') {
      return 'Variability across Outcomes';
    } else if (name === 'PARAMETERS_OUTCOME_CORRELATION') {
      return 'Outcome Correlation';
    } else if (name === 'PARAMETERS_REPEATED_MEASURE_ST_DEV') {
      return 'Repeated Measure Standard Deviation';
    } else if (name === 'PARAMETERS_REPEATED_MEASURE_CORRELATION') {
      return 'Repeated Measure Correlation';
    } else if (name === 'PARAMETERS_INTRA_CLASS_CORRELATION') {
      return 'Intra Class Correlation';
    } else if (name === 'PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE') {
      return 'Gaussian Covariate Standard Deviation';
    } else if (name === 'PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION') {
      return 'Gaussian Covariate Correlation';
    } else if (name === 'PARAMETERS_SCALE_FACTOR_VARIANCE') {
      return 'Scale Factor Variance';
    } else if (name === 'CALCULATE') {
      return 'Calculate';
    }
  }

  download() {
    this.ref.detectChanges();
    document.getElementById('downloadStudy').click();
  }

  get downloadStudy() {
    return this.sanitizer.bypassSecurityTrustUrl('data:text/csv;charset=utf-8,' + encodeURI(JSON.stringify(this.study)));
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        const str = atob(reader.result.split(',')[1]);
        const a = JSON.parse(str, StudyDesign.reviver);
        this.study_service.updateAll(a);
      }
    };
  }
}
