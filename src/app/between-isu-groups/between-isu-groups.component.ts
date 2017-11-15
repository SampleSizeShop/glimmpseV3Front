import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {ISUFactorCombinationTable} from '../shared/ISUFactorCombinationTable';
import {ISUFactors} from '../shared/ISUFactors';
import {isNullOrUndefined} from 'util';
import {constants} from '../shared/constants';

@Component({
  selector: 'app-between-isu-groups',
  templateUrl: './between-isu-groups.component.html',
  styleUrls: ['./between-isu-groups.component.css']
})
export class BetweenIsuGroupsComponent implements OnInit, DoCheck, OnDestroy {

  private _isuFactors: ISUFactors;
  private _groupSizeForm: FormGroup;
  private _relativeGroupSizeForm: FormGroup;
  private _solveFor: string;

  private _tables: Array<ISUFactorCombinationTable>;

  private _betweenIsuGroupsSubscription: Subscription;
  private _solveForSubscription: Subscription;

  constructor(private _fb: FormBuilder,
              private _study_service: StudyService) {

    this.solveForSubscription = this.study_service.solveForSelected$.subscribe( solveFor => {
      this.solveFor = solveFor;
    })}

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    if (this.solveFor === 'SAMPLESIZE') {
      this.updateCombinations();
    }
    if (this.solveFor === 'POWER') {
      this.updateSmallestGroupSize();
    }
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  ngOnDestroy() {
    this.solveForSubscription.unsubscribe();
  }

  buildForm() {
    this.groupSizeForm = this.fb.group( {
      smallestGroupSize: [1]
    } );
    this.relativeGroupSizeForm = this.fb.group( {} );
    if (this.solveFor === constants.SOLVE_FOR_SAMPLESIZE) {
      this.updateGroupsizeFormControls();
    }
  }

  resetForms() {
    this.relativeGroupSizeForm.reset();
    this.groupSizeForm.reset();
    this.buildForm();
  }

  updateSmallestGroupSize() {
    if ( this.isuFactors ) {
      this.isuFactors.smallestGroupSize = this.groupSizeForm.value.smallestGroupSize;
    }
  }

  updateCombinations() {
    if ( this.isuFactors ) {
      this.isuFactors.betweenIsuRelativeGroupSizes.forEach(combination => {
        const value = this.relativeGroupSizeForm.get(combination.name).value;
        combination.size = value;
      });
    }
  }

  updateGroupsizeFormControls() {
    if (isNullOrUndefined(this.isuFactors) || isNullOrUndefined(this.isuFactors.predictors)) {
      this.relativeGroupSizeForm = this.fb.group({});
    } else {
      this.study_service.updateIsuFactors(this.isuFactors);

      this.tables = this.isuFactors.groupCombinations(
        this.isuFactors.betweenIsuRelativeGroupSizes,
        this.isuFactors.predictors);
      const controlDefs = {};
      this.tables.forEach(table => {
        const names = table.table.keys();
        let done = false;
        let next = names.next();
        while (!done) {
          const key = next.value;
          const combination = table.table.get(key);
          controlDefs[combination.name] = [combination.size];
          next = names.next();
          done = next.done;
        }
      });
      this.relativeGroupSizeForm = this.fb.group(controlDefs);
    }
  }

  get groupSizeForm(): FormGroup {
    return this._groupSizeForm;
  }

  set groupSizeForm(value: FormGroup) {
    this._groupSizeForm = value;
  }

  get relativeGroupSizeForm(): FormGroup {
    return this._relativeGroupSizeForm;
  }

  set relativeGroupSizeForm(value: FormGroup) {
    this._relativeGroupSizeForm = value;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  @Input() set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get solveFor(): string {
    return this._solveFor;
  }

  set solveFor(value: string) {
    this._solveFor = value;
  }

  get tables(): ISUFactorCombinationTable[] {
    return this._tables;
  }

  set tables(value: ISUFactorCombinationTable[]) {
    this._tables = value;
  }

  get betweenIsuGroupsSubscription(): Subscription {
    return this._betweenIsuGroupsSubscription;
  }

  set betweenIsuGroupsSubscription(value: Subscription) {
    this._betweenIsuGroupsSubscription = value;
  }

  get solveForSubscription(): Subscription {
    return this._solveForSubscription;
  }

  set solveForSubscription(value: Subscription) {
    this._solveForSubscription = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get study_service(): StudyService {
    return this._study_service;
  }

  set study_service(value: StudyService) {
    this._study_service = value;
  }
}
