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
import {minMaxValidator} from '../../shared/minmax.validator';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../../shared/constants';

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
  private _formErrors = constants.BETWEEN_ISU_RELATIVE_GROUP_ERRORS;
  private _validationMessages = constants.BETWEEN_ISU_RELATIVE_GROUP_VALIDATION_MESSAGES;

  private _isuFactorsSubscription: Subscription;

  constructor(private _fb: FormBuilder,
              private route: ActivatedRoute,
              private _study_service: StudyService,
              private logger: NGXLogger) {
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
    if (!this.isIntercept) {
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
    this.relativeGroupSizeForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.relativeGroupSizeForm) {
      return;
    }
    const form = this.relativeGroupSizeForm;

    this.formErrors['relativegroupsizes'] = '';
    for (const field in this.relativeGroupSizeForm.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['relativegroupsizes'];
        for (const key in control.errors) {
          this.formErrors['relativegroupsizes'] = messages[key];
        }
      }
    }
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
    if (this.isIntercept) {
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
            this.relativeGroupSizeForm[name] = group.value;
            this.relativeGroupSizeForm.controls[name].setValidators(minMaxValidator(0, Number.MAX_VALUE, this.logger));
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

  get formErrors(): { relativegroupsizes: string; } {
    return this._formErrors;
  }

  set formErrors(value: { relativegroupsizes: string; }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    relativegroupsizes: { minval: string; };
  }
  {
    return this._validationMessages;
  }

  set validationMessages(value: {
    relativegroupsizes: { minval: string; };
  }) {
    this._validationMessages = value;
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
    if (!isNullOrUndefined(this.table) && !isNullOrUndefined(this.table.tableId) && this.table.tableId.name === 'InterceptIntercept') {
      isIntercept = true;
    }
    return isIntercept;
  }
}
