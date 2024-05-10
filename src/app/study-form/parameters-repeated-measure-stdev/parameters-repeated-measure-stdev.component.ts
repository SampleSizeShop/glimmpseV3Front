import {Component, DoCheck, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {Subscription, Observable, of} from 'rxjs';
import {StudyService} from '../../shared/services/study.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {RepeatedMeasure} from '../../shared/model/RepeatedMeasure';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {switchMap} from 'rxjs/operators';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';
import {NGXLogger} from 'ngx-logger';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-parameters-repeated-measure-outcome-stdev',
  templateUrl: './parameters-repeated-measure-stdev.component.html',
  styleUrls: ['./parameters-repeated-measure-stdev.component.scss']
})
export class ParametersRepeatedMeasureStdevComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _measure$: Observable<RepeatedMeasure>;
  private _stDevForm: UntypedFormGroup;

  private _measure: RepeatedMeasure;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};

  constructor(private study_service: StudyService,
              private route: ActivatedRoute,
              private fb: UntypedFormBuilder,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.measure$ = this.route.paramMap.pipe(switchMap(
      (params: ParamMap) => this.getMeasure(params.get('measure'))
      )
    );
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
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
        if (this._isClickNext && this._stDevForm !== null && this._stDevForm !== undefined) {
          Object.keys(this._stDevForm.controls).forEach(control => {
            this._stDevForm.controls[control].setValidators(Validators.required);
            this._stDevForm.controls[control].updateValueAndValidity();
          });
        }
      }
    );
  }

  ngOnInit() {
    this.navigation_service.updateIsClickNext(false);
    this._afterInit = true;
    this.measure$.subscribe( measure => {
      this.measure = measure;
      this.buildForm();
    });
  }

  ngDoCheck() {
    this.checkValidBeforeNavigation();
    this.updateStDevs();
  }

  ngOnDestroy() {
    this.setNextEnabled('VALID');
    this._showHelpTextSubscription.unsubscribe();
  }

  checkValidBeforeNavigation(): void {
    if (this._stDevForm !== null && this._stDevForm !== undefined && this.allControlsFilledIn) {
      this.setNextEnabled('VALID');
    } else {
      this.setNextEnabled('INVALID');
    }
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
  }

  buildForm() {
    this.stdevForm = this.fb.group(this.getStDevControls());
  };

  getStDevControls() {
    const controlDefs = {};
    if (!isNullOrUndefined(this.measure)) {
      this.measure.valueNames.forEach( (name: string, i: number) => {
        if (this.measure.standard_deviations[i] === null  || this.measure.standard_deviations[i] === undefined) {
          controlDefs[name] = null;
        } else {
          controlDefs[name] = this.measure.standard_deviations[i];
        }
      });
    }
    return controlDefs;
  }

  updateStDevs() {
    const stDevs = new Array<number>();
    this.measure.standard_deviations = stDevs;
    for (const name of this.measure.valueNames) {
      if (!isNullOrUndefined(this.stdevForm.controls[String(name)])) {
        stDevs.push(this.stdevForm.controls[String(name)].value);
      }
    }
    this.measure.standard_deviations = stDevs;
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  getMeasures() { return of(this.isuFactors.repeatedMeasures); }

  private getMeasure(name: string | any) {
    return this.getMeasures().pipe(
      map(measures => measures.find(
        measure => measure.name === name
        )
      )
    );
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

  get allControlsFilledIn() {
    let ret = true;
    Object.keys(this._stDevForm.controls).forEach(
      name => {
        if (this._stDevForm.controls[name].value === null) {
          ret =  false;
        }
      }
    );
    return ret;
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  set measure$(value: Observable<RepeatedMeasure>) {
    this._measure$ = value;
  }

  get measure$(): Observable<RepeatedMeasure> {
    return this._measure$;
  }

  get stdevForm(): UntypedFormGroup {
    return this._stDevForm;
  }

  set stdevForm(value: UntypedFormGroup) {
    this._stDevForm = value;
  }

  get measure(): RepeatedMeasure {
    return this._measure;
  }

  set measure(value: RepeatedMeasure) {
    this._measure = value;
    this.buildForm();
  }

  get stDevForm(): UntypedFormGroup {
    return this._stDevForm;
  }

  set stDevForm(value: UntypedFormGroup) {
    this._stDevForm = value;
  }

  get isClickNext(): boolean {
    return this._isClickNext;
  }

  set isClickNext(value: boolean) {
    this._isClickNext = value;
  }
}
