import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs/Subscription';
import {ISUFactorCombinationTable} from '../../shared/ISUFactorCombinationTable';
import {ISUFactors} from '../../shared/ISUFactors';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/constants';
import {CombinationId} from "../../shared/CombinationId";
import {RelativeGroupSizeTable} from "../../shared/RelativeGroupSizeTable";

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

  private _table: RelativeGroupSizeTable;

  private _isuFactorsSubscription: Subscription;
  private _solveForSubscription: Subscription;

  constructor(private _fb: FormBuilder,
              private _study_service: StudyService) {

    this.solveForSubscription = this.study_service.solveForSelected$.subscribe( solveFor => {
      this.solveFor = solveFor;
    })
    this.isuFactorsSubscription = this._study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
      this.table = this.isuFactors.betweenIsuRelativeGroupSizes[0];
    } );
  }

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
    this.groupSizeForm = this.fb.group( this.updateSmallestGroupSizeControls()  );
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
    //TODO: re instate save mechanism for group sizes
    /** if ( this.isuFactors ) {
      this.isuFactors.betweenIsuRelativeGroupSizes.forEach(combination => {
        const value = this.relativeGroupSizeForm.get(combination.name).value;
        combination.size = value;
      });
    } **/
  }

  updateSmallestGroupSizeControls() {
    if (this.solveFor === constants.SOLVE_FOR_POWER) {
      return { smallestGroupSize: [ this._isuFactors.smallestGroupSize ] }
    } else {
      return { smallestGroupSize: [1] }
    };
  }

  updateGroupsizeFormControls() {
    if (isNullOrUndefined(this.isuFactors) || isNullOrUndefined(this.isuFactors.betweenIsuRelativeGroupSizes)) {
      this.relativeGroupSizeForm = this.fb.group({});
    } else {
      const controlDefs = this.table.controlDefs;
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

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get solveFor(): string {
    return this._solveFor;
  }

  set solveFor(value: string) {
    this._solveFor = value;
  }

  get table(): RelativeGroupSizeTable {
    return this._table;
  }

  set table(value: RelativeGroupSizeTable) {
    this._table = value;
  }

  get solveForSubscription(): Subscription {
    return this._solveForSubscription;
  }

  set solveForSubscription(value: Subscription) {
    this._solveForSubscription = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
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
