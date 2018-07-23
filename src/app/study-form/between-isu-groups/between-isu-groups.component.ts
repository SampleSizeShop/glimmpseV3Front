import {Component, DoCheck, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs/Subscription';
import {ISUFactors} from '../../shared/ISUFactors';
import {isNullOrUndefined} from 'util';
import {constants} from '../../shared/constants';
import {RelativeGroupSizeTable} from '../../shared/RelativeGroupSizeTable';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

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
  private _table$: Observable<RelativeGroupSizeTable>;
  private _table: RelativeGroupSizeTable;

  private _isuFactorsSubscription: Subscription;
  private _solveForSubscription: Subscription;

  constructor(private _fb: FormBuilder,
              private route: ActivatedRoute,
              private _study_service: StudyService) {
    this.table$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getTableFromIndex(params.get('index'))
    );
  }

  ngOnInit() {
    this.solveForSubscription = this.study_service.solveForSelected$.subscribe( solveFor => {
      this.solveFor = solveFor;
    })
    this.isuFactorsSubscription = this._study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.table$.subscribe(
      table => {
        this._table = table;
        this.buildForm();
      }
    );
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

  getRelativeGroupSizeTables() { return Observable.of(this.isuFactors.betweenIsuRelativeGroupSizes); }

  getTableFromIndex(index: string | any) {
    return this.getRelativeGroupSizeTables().map(
      tables => tables.find(
        table => this.isuFactors.betweenIsuRelativeGroupSizes.indexOf(table).toString() === index
      ));
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
    if ( !isNullOrUndefined(this.isuFactors) && !isNullOrUndefined(this.table)) {
      let r = 0;
      this.table.table.forEach( row => {
        let c = 0;
        row.forEach( group => {
          const name = r.toString() + '-' + c.toString();
          group.value = this.relativeGroupSizeForm.controls[name].value;
          c = c + 1;
        });
        r = r + 1;
      });
    }
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
      const controlDefs = this._table.controlDefs;
      this.relativeGroupSizeForm = this.fb.group(controlDefs);
      if (!isNullOrUndefined(this.table)) {
        let r = 0;
        this.table.table.forEach( row => {
          let c = 0;
          row.forEach( group => {
            const name = r.toString() + '-' + c.toString();
            this.relativeGroupSizeForm[name] = [group.value];
            c = c + 1;
          });
          r = r + 1;
        });
      }
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

  get table$(): Observable<RelativeGroupSizeTable> {
    return this._table$;
  }

  set table$(value: Observable<RelativeGroupSizeTable>) {
    this._table$ = value;
  }

  get table(): RelativeGroupSizeTable {
    return this._table;
  }

  set table(value: RelativeGroupSizeTable) {
    this._table = value;
  }

  get displayName() {
    let name = '';
    if (!isNullOrUndefined(this.table) && !isNullOrUndefined(this.table.tableId)) {
      name = this.table.tableId.name;
    }
    return name;
  }
}
