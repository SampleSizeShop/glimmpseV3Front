import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {StudyService} from '../../shared/services/study.service';
import {of as observableOf, Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../../shared/model/constants';
import {NavigationService} from '../../shared/services/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {smallestGroupSizeValidator} from '../../shared/validators/between-isu-smallest-group.validator';

@Component({
  selector: 'app-between-isu-smallest-group',
  templateUrl: './between-isu-smallest-group.component.html',
  styleUrls: ['./between-isu-smallest-group.component.scss']
})
export class BetweenIsuSmallestGroupComponent implements OnInit, OnDestroy {

  private _isuFactors: ISUFactors;
  private _groupSizeForm: UntypedFormGroup;
  private _isuFactorsSubscription: Subscription;
  private _formErrors = constants.BETWEEN_ISU_ERRORS;
  private _validationMessages = constants.BETWEEN_ISU_VALIDATION_MESSAGES;
  private _showHelpTextSubscription: Subscription;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: UntypedFormBuilder,
              private _study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this.isuFactorsSubscription = this._study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this._isClickNextReference = {value: false};
    this._isClickNextSubscription = this.navigation_service.isClickNext$.subscribe(
      isClickNext => {
        this._isClickNext = isClickNext;
        this._isClickNextReference.value = this._isClickNext;
        if (!isNullOrUndefined(this._groupSizeForm)) {
          this._groupSizeForm.get('smallestGroupSize').updateValueAndValidity();
        }
      }
    );
  }

  ngOnInit() {
    this.buildForm();
    this.updateIsClickNext(false);
    this.checkValidBeforeNavigation();
  }

  ngOnDestroy() {
    this.study_service.updateIsuFactors(this.isuFactors);
    this.navigation_service.updateValid(true);
    this.isuFactorsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
    this._isClickNextSubscription.unsubscribe();
  }

  updateIsClickNext(value: boolean) {
    this.navigation_service.updateIsClickNext(value);
  }

  buildForm() {
    this.groupSizeForm = this.fb.group( this.updateSmallestGroupSizeControls() );
    this.groupSizeForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.checkValidBeforeNavigation();
  }

  onValueChanged(data?: any) {
    if (!this.groupSizeForm) {
      return;
    }
    const form = this.groupSizeForm;

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors) ) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

    this.checkValidBeforeNavigation()
  }

  checkValidBeforeNavigation() {
    if (isNullOrUndefined(this._isuFactors) ||
      isNullOrUndefined(this._isuFactors.smallestGroupSize) ||
      this._isuFactors.smallestGroupSize.length < 1 ) {
      this.navigation_service.updateValid(false);
    } else if (this.groupSizeForm.status === 'VALID') {
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateValid(false);
    }
  }

  updateSmallestGroupSizeControls() {
    return { smallestGroupSize: [null,
        [minMaxValidator(0, Number.MAX_VALUE, this.log),
          smallestGroupSizeValidator(this.isuFactors.smallestGroupSize, this._isClickNextReference),
          // positive integer regex
          Validators.pattern('^\\d+$')]
      ]
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

  addGroupSize() {
    const value = this.groupSizeForm.value.smallestGroupSize;
    if (!isNullOrUndefined(value)
        && value !== ''
        && this._isuFactors.smallestGroupSize.indexOf(value) === -1
        && value >= 1 ) {
      this._isuFactors.smallestGroupSize.push(value);
      this.groupSizeForm.reset();
    }
  }

  removeGroupSize(value) {
    const index = this._isuFactors.smallestGroupSize.indexOf(value);
    if (index > -1) {
      this._isuFactors.smallestGroupSize.splice(index, 1);
    }
    this.groupSizeForm.reset();
  }

  firstGroupSize() {
    let ret = true;
    if (isNullOrUndefined(this._isuFactors) || isNullOrUndefined(this._isuFactors.smallestGroupSize.length)) {
      ret = true;
    } else {
      ret = this._isuFactors.smallestGroupSize.length === 0 ? true : false;
    }
    return ret;
  }

  get groupSize$() {
    return observableOf(this._isuFactors.smallestGroupSize);
  }

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  get groupSizeForm(): UntypedFormGroup {
    return this._groupSizeForm;
  }

  set groupSizeForm(value: UntypedFormGroup) {
    this._groupSizeForm = value;
  }

  get formErrors(): { smallestGroupSize: string; required: string } {
    return this._formErrors;
  }

  set formErrors(value: { smallestGroupSize: string; required: string }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    smallestGroupSize: { minval: string; 'required': string; 'pattern': string};
  } {
    return this._validationMessages;
  }

  set validationMessages(value: {
    smallestGroupSize: { minval: string; 'required': string; 'pattern': string };
  }) {
    this._validationMessages = value;
  }

  get isuFactorsSubscription(): Subscription {
    return this._isuFactorsSubscription;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  set fb(value: UntypedFormBuilder) {
    this._fb = value;
  }

  get study_service(): StudyService {
    return this._study_service;
  }

  set study_service(value: StudyService) {
    this._study_service = value;
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }
}
