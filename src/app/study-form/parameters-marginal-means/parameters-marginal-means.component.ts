
import {of as observableOf, Subscription, Observable} from 'rxjs';

import {map, switchMap} from 'rxjs/operators';
import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {StudyService} from '../../shared/services/study.service';
import {isNullOrUndefined} from 'util';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {MarginalMeansTable} from '../../shared/model/MarginalMeansTable';
import { TooltipPosition } from '@angular/material/tooltip';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-parameters-marginal-means',
  templateUrl: './parameters-marginal-means.component.html',
  styleUrls: ['./parameters-marginal-means.component.css']
})
export class ParametersMarginalMeansComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _marginalMeansForm: UntypedFormGroup;
  private _untouchedValuesForm: UntypedFormGroup;
  private _table$: Observable<MarginalMeansTable>;
  private _table: MarginalMeansTable;

  private _isuFactorsSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};
  private _valid: boolean

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  left: TooltipPosition;
  below: TooltipPosition;

  constructor(private _fb: UntypedFormBuilder,
              private _route: ActivatedRoute,
              private _study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.table$ = this.route.paramMap.pipe(switchMap(
      (params: ParamMap) => this.getTableFromIndex(params.get('index'))
    ));
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });

    this._isClickNextReference = {value: false};
    this._isClickNext = false;
    this._isClickNextSubscription = this.navigation_service.isClickNext$.subscribe(
      isClickNext => {
        this.isClickNext = isClickNext;
        this._isClickNextReference.value = this.isClickNext;
        if (this._isClickNext && this.marginalMeansForm !== null && this.marginalMeansForm !== undefined) {
          Object.keys(this.marginalMeansForm.controls).forEach( control => {
            this.marginalMeansForm.controls[control].setValidators(Validators.required);
            this.marginalMeansForm.controls[control].updateValueAndValidity();
          });
        }
      }
    );

    this.left = 'left';
    this.below = 'below';
  }

  ngOnInit() {
    this.navigation_service.updateIsClickNext(false);
    this._afterInit = true;
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

  ngOnDestroy() {
    this._showHelpTextSubscription.unsubscribe();
    this._isClickNextSubscription.unsubscribe();
    this.setNextEnabled('VALID');
  }

  ngDoCheck() {
    this.checkValidBeforeNavigation();
    this.updateMarginalMeans();
    this._study_service.updateIsuFactors(this.isuFactors);
  }

  checkValidBeforeNavigation(): void {
    if (this._table !== null && this._table !== undefined && this._table.allValuesDefined) {
      this.setNextEnabled('VALID');
      this._valid = true;
    } else {
      this.setNextEnabled('INVALID');
      if (this._isClickNext) {
        this._valid = false;
      } else {
        this._valid = true;
      }
    }
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
  }

  getRelativeGroupSizeTables() { return observableOf(this.isuFactors.marginalMeans); }

  getTableFromIndex(index: string | any) {
    return this.getRelativeGroupSizeTables().pipe(map(
      tables => tables.find(
        table => this.isuFactors.marginalMeans.indexOf(table).toString() === index
      )));
  }

  buildForm() {
    this._marginalMeansForm = this.fb.group( {} );
    this._untouchedValuesForm = this.fb.group( {
      untouchedValues: [null]
    } );
    this.updateMarginalMeansFormControls();
  }

  setBlankValues() {
    if (this.untouchedValuesForm.controls['untouchedValues'] !== null
      && this.untouchedValuesForm.controls['untouchedValues'] !== undefined
      && this.untouchedValuesForm.controls['untouchedValues'].value !== null
      && this.untouchedValuesForm.controls['untouchedValues'].value !== undefined) {
      const val = this.untouchedValuesForm.controls['untouchedValues'].value;
      Object.keys(this.marginalMeansForm.controls).forEach( field => {
        if (this._marginalMeansForm.controls[field].value === null
          || this._marginalMeansForm.controls[field].value === undefined
          || this._marginalMeansForm.controls[field].value === '') {
          this._marginalMeansForm.controls[field].setValue(val);
        }
      });
    }
  }

  updateMarginalMeans() {
    if ( !isNullOrUndefined(this.isuFactors) && !isNullOrUndefined(this.table)) {
      let r = 0;
      this.table.table.forEach( row => {
        let c = 0;
        row.forEach( group => {
          const name = r.toString() + '-' + c.toString();
          group.value = this.marginalMeansForm.controls[name].value;
          c = c + 1;
        });
        r = r + 1;
      });
    }
  }

  updateMarginalMeansFormControls() {
    if (!this.hasTable) {
      this.marginalMeansForm = this.fb.group({});
    } else {
      const controlDefs = this._table.controlDefs;
      this.marginalMeansForm = this.fb.group(controlDefs);
      if ((this.table !== null && this.table !== undefined)) {
        let r = 0;
        this.table.table.forEach( row => {
          let c = 0;
          row.forEach( group => {
            const name = r.toString() + '-' + c.toString();
            this.marginalMeansForm[name] = [group.value];
            c = c + 1;
          });
          r = r + 1;
        });
      }
    }
  }

  dismissHelp() {
    this.helpTextModalReference.close();
  }

  showHelpText(content) {
    this.modalService.dismissAll();
    this.helpTextModalReference = this.modalService.open(content);
    this.helpTextModalReference.result.then(
      (closeResult) => {
        this.log.debug('modal closed : ' + closeResult);
      }, (dismissReason) => {
        if (dismissReason === ModalDismissReasons.ESC) {
          this.log.debug('modal dismissed when used pressed ESC button');
        } else if (dismissReason === ModalDismissReasons.BACKDROP_CLICK) {
          this.log.debug('modal dismissed when used pressed backdrop');
        } else {
          this.log.debug(dismissReason);
        }
      });
  }

  getRowStyle(i, hasCols) {
    if (i === 0 && hasCols) {
      return '2px solid #3c4043';
    } else {
      return '0px solid transparent';
    }
  }

  getColStyle(i) {
    if (i === 0) {
      return '2px solid #3c4043';
    } else {
      return '0px solid transparent';
    }
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get marginalMeansForm(): UntypedFormGroup {
    return this._marginalMeansForm;
  }

  set marginalMeansForm(value: UntypedFormGroup) {
    this._marginalMeansForm = value;
  }

  get untouchedValuesForm(): UntypedFormGroup {
    return this._untouchedValuesForm;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get table$(): Observable<MarginalMeansTable> {
    return this._table$;
  }

  set table$(value: Observable<MarginalMeansTable>) {
    this._table$ = value;
  }

  get table(): MarginalMeansTable {
    return this._table;
  }

  set table(value: MarginalMeansTable) {
    this._table = value;
  }

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  set fb(value: UntypedFormBuilder) {
    this._fb = value;
  }

  get route(): ActivatedRoute {
    return this._route;
  }

  set route(value: ActivatedRoute) {
    this._route = value;
  }

  get study_service(): StudyService {
    return this._study_service;
  }

  set study_service(value: StudyService) {
    this._study_service = value;
  }

  get hasTable(): boolean {
    let hasTable = true;
    if (isNullOrUndefined(this.table)) {
      hasTable = false;
    }
    return hasTable;
  }

  get grandMean(): boolean {
    let grandMean = false;
    if (!isNullOrUndefined(this._table)) {
      if (this._table.size === 1) {
        grandMean = true;
      }
    }
    return grandMean;
  }

  hasMultipleDimensions() {
    if (!isNullOrUndefined(this._isuFactors.repeatedMeasuresInHypothesis) &&
        this._isuFactors.repeatedMeasuresInHypothesis.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  get valid(): boolean {
    return this._valid;
  }

  get isClickNext(): boolean {
    return this._isClickNext;
  }

  set isClickNext(value: boolean) {
    this._isClickNext = value;
  }
}
