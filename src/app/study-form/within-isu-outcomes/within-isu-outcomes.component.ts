import {of as observableOf, Subscription, Observable} from 'rxjs';
import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {constants} from '../../shared/constants';
import {outcomeValidator} from './outcome.validator';
import {NavigationService} from '../../shared/navigation.service';
import {StudyService} from '../study.service';
import {HypothesisEffect} from '../../shared/HypothesisEffect';
import {Outcome} from '../../shared/Outcome';

@Component({
  selector: 'app-within-isu-outcomes',
  templateUrl: './within-isu-outcomes.component.html',
  styleUrls: ['./within-isu-outcomes.scss']
})
export class WithinIsuOutcomesComponent implements OnInit, DoCheck, OnDestroy {
  private _outcomesForm: FormGroup;
  private _outcomes: Outcome[];
  private _max: number;
  private _validationMessages;
  private _formErrors;
  private _outcomeSubscription: Subscription;
  private _hypothesisEffectSubscription: Subscription;
  private _hypothesisEffect: HypothesisEffect;
  private _directionCommand: string;
  private _navigationSubscription: Subscription;

  constructor(private _fb: FormBuilder, private study_service: StudyService, private navigation_service: NavigationService) {
    this.validationMessages = constants.OUTCOME_FORM_VALIDATION_MESSAGES;
    this.formErrors = constants.OUTCOME_FORM_ERRORS;
    this._max = constants.MAX_OUTCOMES;

    this.outcomeSubscription = this.study_service.withinIsuOutcomes$.subscribe(
      outcomes => {
        this.outcomes = outcomes;
      }
    );

    this.hypothesisEffectSubscription = this.study_service.hypothesisEffect$.subscribe(
      effect => {
        this._hypothesisEffect = effect;
      }
    );
    this.navigationSubscription = this.study_service.navigationDirection$.subscribe(
      direction => {
        this.directionCommand = direction;
        this.checkValidBeforeNavigation(this.directionCommand);
      }
    );
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  buildForm() {
    this.emptyErrMsg();
    this.outcomesForm = this.fb.group({
      outcomes: ['', outcomeValidator(this.outcomes)]
    });

    this.outcomesForm.valueChanges.subscribe(data => this.emptyErrMsg());
    this.setNextEnabled('INVALID');
  }

  emptyErrMsg() {
    this.formErrors = {};
  }

  checkValidator(data?: any) {
    if (!this.outcomesForm) {
      return;
    }
    const form = this.outcomesForm;

    for (const field in this.validationMessages) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngDoCheck() {
    this.study_service.updateWthinIsuOutcomes(this.outcomes);
  }

  addOutcome() {
    this.checkValidator();
    if (!this.isDuplicateErr() && this.outcomesForm.value.outcomes && this.outcomesForm.value.outcomes.trim() !== '' ) {
      const outcome = new Outcome(this.outcomesForm.value.outcomes.trim())
      this.outcomes.push(outcome);
      this.outcomesForm.reset();
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

  checkValidBeforeNavigation(direction: string): void {
    if ( direction === 'NEXT' ) {
      this.checkValidator();
      if (this.outcomes && !this.formErrors.outcomes) {
        this.setNextEnabled('VALID');
      }
    }
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
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

  get outcomesForm(): FormGroup {
    return this._outcomesForm;
  }

  set outcomesForm(value: FormGroup) {
    this._outcomesForm = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
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

  get hypothesisEffectSubscription(): Subscription {
    return this._hypothesisEffectSubscription;
  }

  set hypothesisEffectSubscription(value: Subscription) {
    this._hypothesisEffectSubscription = value;
  }

  get navigationSubscription(): Subscription {
    return this._navigationSubscription;
  }

  set navigationSubscription(value: Subscription) {
    this._navigationSubscription = value;
  }

  get directionCommand(): string {
    return this._directionCommand;
  }

  set directionCommand(value: string) {
    this._directionCommand = value;
  }
}
