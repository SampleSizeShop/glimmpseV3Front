import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../shared/constants';
import {NavigationService} from '../shared/navigation.service';

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
  private _targetEvent: string;
  private _solveFor: string;
  private _modeSubscription: Subscription;
  private _targetEventSubscription: Subscription;
  private _solveForSubscription: Subscription;

  private _nextEnabledSubscription: Subscription;
  private _backEnabledSubscription: Subscription;
  private _childNavigationModeSubscription: Subscription;
  private _validSubscription: Subscription;

  private _stages;
  private _noStages: number;
  private _childComponentNav: boolean;
  private _childDirectionCommand: string;

  constructor(
    private study_service: StudyService,
    private logger: NGXLogger,
    private navigation_service: NavigationService
  ) {
    this.modeSubscription = this.study_service.modeSelected$.subscribe(
      guided => {
        this.guided = guided;
        this.valid = guided;
      }
    );

    this.targetEventSubscription = this.study_service.targetEventSelected$.subscribe(
      targetEvent => {
        this.targetEvent = targetEvent;
        this.valid = true;
      }
    );

    this.solveForSubscription = this.study_service.solveForSelected$.subscribe(
      solveFor => {
        this.solveFor = solveFor;
        this.valid = true;
      }
    );

    this.childComponentNav = false;
    this.childNavigationModeSubscription = this.navigation_service.childNavigationMode$.subscribe(
      childNavMode => {
        this.childComponentNav = childNavMode;
      }
    );

    this.validSubscription = this.study_service.valid$.subscribe(
      valid => {
        this.valid = valid;
      }
    );

    this.nextEnabledSubscription = this.navigation_service.nextEnabled$.subscribe(
      enabled => {
        this.hasNext = enabled;
      }
    );
    this.backEnabledSubscription = this.navigation_service.backEnabled$.subscribe(
      enabled => {
        this.hasBack = enabled;
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
    this.childNavigationModeSubscription.unsubscribe();
    this.validSubscription.unsubscribe();
    this.nextEnabledSubscription.unsubscribe();
    this.backEnabledSubscription.unsubscribe();
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

  get targetEvent(): string {
    return this._targetEvent;
  }

  set targetEvent(value: string) {
    this._targetEvent = value;
  }


  get solveFor(): string {
    return this._solveFor;
  }

  set solveFor(value: string) {
    this._solveFor = value;
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

  get backEnabledSubscription(): Subscription {
    return this._backEnabledSubscription;
  }

  set backEnabledSubscription(value: Subscription) {
    this._backEnabledSubscription = value;
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

  get childDirectionCommand(): string {
    return this._childDirectionCommand;
  }

  set childDirectionCommand(value: string) {
    this._childDirectionCommand = value;
  }
}
