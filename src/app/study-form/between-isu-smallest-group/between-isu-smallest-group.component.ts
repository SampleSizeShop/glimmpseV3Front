import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISUFactors} from '../../shared/ISUFactors';
import {StudyService} from '../study.service';
import {of as observableOf, Subscription, Observable} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {minMaxValidator} from '../../shared/minmax.validator';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../../shared/constants';
import {NavigationService} from '../../shared/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-between-isu-smallest-group',
  templateUrl: './between-isu-smallest-group.component.html',
  styleUrls: ['./between-isu-smallest-group.component.scss']
})
export class BetweenIsuSmallestGroupComponent implements OnInit, OnDestroy {

  private _isuFactors: ISUFactors;
  private _groupSizeForm: FormGroup;
  private _isuFactorsSubscription: Subscription;
  private _formErrors = constants.BETWEEN_ISU_ERRORS;
  private _validationMessages = constants.BETWEEN_ISU_VALIDATION_MESSAGES;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: FormBuilder,
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
  }

  ngOnInit() {
    this._afterInit = true;
    this.isuFactorsSubscription = this._study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.buildForm();
  }

  ngOnDestroy() {
    this.study_service.updateIsuFactors(this.isuFactors);
    this.isuFactorsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  buildForm() {
    this.groupSizeForm = this.fb.group( this.updateSmallestGroupSizeControls() );
    this.groupSizeForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.checkValid();
  }

  onValueChanged(data?: any) {
    if (!this.groupSizeForm) {
      return;
    }
    const form = this.groupSizeForm;

    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors) ) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

    this.checkValid()
  }

  checkValid() {
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
    return { smallestGroupSize: [
      this.isuFactors.smallestGroupSize,
        [minMaxValidator(0, Number.MAX_VALUE, this.log),
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
    this._isuFactors.smallestGroupSize.push(this.groupSizeForm.value.smallestGroupSize)
    this.groupSizeForm.reset();
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

  get groupSizeForm(): FormGroup {
    return this._groupSizeForm;
  }

  set groupSizeForm(value: FormGroup) {
    this._groupSizeForm = value;
  }

  get formErrors(): { smallestGroupSize: string; } {
    return this._formErrors;
  }

  set formErrors(value: { smallestGroupSize: string; }) {
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

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }
}
