import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../shared/constants';
import {NavigationService} from '../shared/navigation.service';
import {StudyDesign} from '../shared/study-design';

@Component({
  selector: 'app-study-form',
  templateUrl: './study-form.component.html',
  styleUrls: ['./study-form.component.scss'],
  providers: [StudyService, NGXLogger, NavigationService]
})
export class StudyFormComponent implements OnInit, OnDestroy {
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

  private _nextEnabledSubscription: Subscription;
  private _childNavigationModeSubscription: Subscription;
  private _validSubscription: Subscription;

  private _stages;
  private _noStages: number;
  private _childComponentNav: boolean;

  constructor(
    private study_service: StudyService,
    private logger: NGXLogger,
    private navigation_service: NavigationService
  ) {
    this.study = new StudyDesign();

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
        this.study.withinIsuFactors.outcomes = outcomes;
      }
    );

    this.withinIsuRepeatedMeasuresSubscription = this.study_service.withinIsuRepeatedMeasures$.subscribe(
      measures => {
        this.study.withinIsuFactors.repeatedMeasures = measures;
      }
    );

    this.withinIsuClusterSubscription = this.study_service.withinIsuCluster$.subscribe(
      cluster => {
        this.study.withinIsuFactors.cluster = cluster;
      }
    );

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
  }

  next(): void {
    if (this.childComponentNav &&  this.valid) {
      this.navigation_service.updateNavigation('NEXT');
    } else {
      const current = this.getStage();
      if ( current < this._noStages &&  this.valid ) {
        this.setStage( current + 1 );
        this.setNextBack();
      }
    }
  }

  back(): void {
    if (this.childComponentNav) {
      this.navigation_service.updateNavigation('BACK');
    } else {
      const current = this.getStage();
      if (current > 1 && this.guided) {
        this.setStage(current - 1);
      }
      this.setNextBack();
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

  ngOnDestroy() {
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

    this.nextEnabledSubscription.unsubscribe();
    this.childNavigationModeSubscription.unsubscribe();
    this.validSubscription.unsubscribe();
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
}
