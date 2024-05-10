import {of as observableOf, Subscription, Observable} from 'rxjs';
import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {constants} from '../../shared/model/constants';
import {outcomeValidator} from './outcome.validator';
import {NavigationService} from '../../shared/services/navigation.service';
import {StudyService} from '../../shared/services/study.service';
import {Outcome} from '../../shared/model/Outcome';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-within-isu-outcomes',
  templateUrl: './within-isu-outcomes.component.html',
  styleUrls: ['./within-isu-outcomes.scss']
})
export class WithinIsuOutcomesComponent implements OnInit, DoCheck, OnDestroy {
  private _outcomesForm: UntypedFormGroup;
  private _outcomes: Outcome[];
  private _max: number;
  private _validationMessages;
  private _formErrors;
  private _outcomeSubscription: Subscription;
  private _directionCommand: string;
  private _showHelpTextSubscription: Subscription;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: UntypedFormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.validationMessages = constants.OUTCOME_FORM_VALIDATION_MESSAGES;
    this.formErrors = constants.OUTCOME_FORM_ERRORS;
    this._max = constants.MAX_OUTCOMES;

    this.outcomeSubscription = this.study_service.withinIsuOutcomes$.subscribe(
      outcomes => {
        this.outcomes = outcomes;
      }
    );
    this._isClickNextReference = {value: false};
    this._isClickNextSubscription = this.navigation_service.isClickNext$.subscribe(
      isClickNext => {
        this.isClickNext = isClickNext;
        this._isClickNextReference.value = this.isClickNext;
        if (this.outcomesForm !== null && this.outcomesForm !== undefined) {
          this.outcomesForm.get('outcomes').updateValueAndValidity();
        }
      }
    );
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  ngOnInit() {
    this.updateIsClickNext(false);
    this.buildForm();
    this._afterInit = true;
    this.updateIsClickNext(false);
  }

  ngOnDestroy() {
    this.outcomeSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
    this._isClickNextSubscription.unsubscribe();
    this.setNextEnabled('VALID');
  }

  buildForm() {
    this.emptyErrMsg();
    this.outcomesForm = this.fb.group({
      outcomes: ['', outcomeValidator(this.outcomes, this._isClickNextReference)]
    });

    this.outcomesForm.valueChanges.subscribe(data => this.emptyErrMsg());
  }

  updateIsClickNext(value: boolean) {
    this.navigation_service.updateIsClickNext(value);
  }

  emptyErrMsg() {
    this.formErrors = {};
  }

  checkValidator(data?: any) {
    if (!this.outcomesForm) {
      return;
    }
    const form = this.outcomesForm;

    for (const field of Object.keys(this.validationMessages)) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngDoCheck() {
    if (this.outcomesForm.get('outcomes').pristine &&  this.outcomes.length === 0) {
      this.checkValidator();
    }
    this.study_service.updateWthinIsuOutcomes(this.outcomes);
    this.checkValidBeforeNavigation();
  }

  addOutcome() {
    this.checkValidator();
    if (!this.isDuplicateErr() && this.outcomesForm.value.outcomes && this.outcomesForm.value.outcomes.trim() !== '' ) {
      const outcome = new Outcome(this.outcomesForm.value.outcomes.trim())
      this.outcomes.push(outcome);
      this.outcomesForm.reset();
      this.updateIsClickNext(false);
    }
  }

  isDuplicateErr() {
    return this.formErrors.outcomes.includes(this.validationMessages.outcomes.duplicate);
  }

  removeOutcome(value: Outcome) {
    const index = this.outcomes.indexOf(value);
    if (index > -1) {
      this.outcomes.splice(index, 1);
    }
    this.outcomesForm.reset();
    this.updateIsClickNext(false);
  }

  firstOutcome(): boolean {
    return this.outcomes.length === 0 ? true : false;
  }

  nextOutcome(): boolean {
    if (!this.firstOutcome() && this.outcomes.length < this.max ) {
      return true;
    }
    return false;
  }

  checkValidBeforeNavigation(): void {
    if (
      this.outcomes === null
      || this.outcomes === undefined
      || this.outcomes.length === 0
    ) {
      this.setNextEnabled('INVALID');
    } else if (this.outcomes && !this.formErrors.outcomes) {
      this.setNextEnabled('VALID');
    }
    if (this.isClickNext) {
      this.checkValidator();
    }
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
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

  get outcomes$(): Observable<Outcome[]> {
    return observableOf(this._outcomes);
  }

  get outcomes(): Outcome[] {
    return this._outcomes;
  }

  set outcomes(value: Outcome[]) {
    this._outcomes = value;
  }

  get outcomesForm(): UntypedFormGroup {
    return this._outcomesForm;
  }

  set outcomesForm(value: UntypedFormGroup) {
    this._outcomesForm = value;
  }

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  set fb(value: UntypedFormBuilder) {
    this._fb = value;
  }

  get max(): number {
    return this._max;
  }

  set max(value: number) {
    this._max = value;
  }

  get validationMessages() {
    return this._validationMessages;
  }

  set validationMessages(value) {
    this._validationMessages = value;
  }

  get formErrors() {
    return this._formErrors;
  }

  set formErrors(value) {
    this._formErrors = value;
  }

  get outcomeSubscription(): Subscription {
    return this._outcomeSubscription;
  }

  set outcomeSubscription(value: Subscription) {
    this._outcomeSubscription = value;
  }

  get directionCommand(): string {
    return this._directionCommand;
  }

  set directionCommand(value: string) {
    this._directionCommand = value;
  }

  get isClickNext(): boolean {
    return this._isClickNext;
  }

  set isClickNext(value: boolean) {
    this._isClickNext = value;
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }
}
