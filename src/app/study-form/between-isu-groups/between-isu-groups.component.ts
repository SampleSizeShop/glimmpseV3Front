import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs/Subscription';
import {ISUFactors} from '../../shared/ISUFactors';
import {isNullOrUndefined} from 'util';
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
  private _relativeGroupSizeForm: FormGroup;
  private _table$: Observable<RelativeGroupSizeTable>;
  private _table: RelativeGroupSizeTable;

  private _isuFactorsSubscription: Subscription;

  constructor(private _fb: FormBuilder,
              private route: ActivatedRoute,
              private _study_service: StudyService) {
    this.table$ = this.route.paramMap.switchMap(
      (params: ParamMap) => this.getTableFromIndex(params.get('index'))
    );
  }

  ngOnInit() {
    this.isuFactorsSubscription = this._study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.table$.subscribe(
      table => {
        this._table = table;
        this.buildForm();
      }
    );
  }

  ngDoCheck() {
    if (this.isIntercept) {
      this.updateCombinations();
      this.study_service.updateIsuFactors(this.isuFactors);
    }
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
  }

  getRelativeGroupSizeTables() { return Observable.of(this.isuFactors.betweenIsuRelativeGroupSizes); }

  getTableFromIndex(index: string | any) {
    return this.getRelativeGroupSizeTables().map(
      tables => tables.find(
        table => this.isuFactors.betweenIsuRelativeGroupSizes.indexOf(table).toString() === index
      ));
  }

  buildForm() {
    this.relativeGroupSizeForm = this.fb.group( {} );
    this.updateGroupsizeFormControls();
  }

  resetForms() {
    this.relativeGroupSizeForm.reset();
    this.buildForm();
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

  updateGroupsizeFormControls() {
    if (!this.isIntercept) {
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

  get isIntercept(): boolean {
    let isIntercept = false;
    if (!isNullOrUndefined(this.table) && this.table.tableId.name === 'InterceptIntercept') {
      isIntercept = true;
    }
    return isIntercept;
  }
}
