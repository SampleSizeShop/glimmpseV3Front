import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {constants} from '../shared/constants';
import {outcomeValidator} from './outcome.validator';
import {NavigationService} from '../shared/navigation.service';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {HypothesisEffectVariable} from '../shared/HypothesisEffectVariable';
import {HypothesisEffect} from '../shared/HypothesisEffect';

@Component({
  selector: 'app-within-isu-outcomes',
  templateUrl: './within-isu-outcomes.component.html',
  styleUrls: ['./within-isu-outcomes.scss']
})
export class WithinIsuOutcomesComponent implements OnInit, DoCheck {
  private _outcomesForm: FormGroup;
  private _outcomes: string[];
  private _max: number;
  private _validationMessages;
  private _formErrors;
  private _outcomeSubscription: Subscription;
  private _hypothesisEffectSubscription: Subscription;
  private _hypothesisEffect: HypothesisEffect;

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
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.outcomesForm = this.fb.group({
      outcomes: ['', outcomeValidator(this.outcomes)]
    });

    this.outcomesForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.outcomesForm) {
      return;
    }
    const form = this.outcomesForm;

    for (const field in this.validationMessages) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  ngDoCheck() {
    if (this.outcomes) {
      this.study_service.updateWthinIsuOutcomes(this.outcomes);
    }
    if (!this.outcomes || this.outcomes.length < 1) {
      this.navigation_service.updateValid(false);
    }
    if (this.outcomes && this.outcomes.length >= 1) {
      this.navigation_service.updateValid(true );
    }
  }

  addOutcome() {
    if (this.outcomesForm.status === 'VALID' && this.outcomesForm.value.outcomes && this.outcomesForm.value.outcomes.trim() !== '' ) {
      this.outcomes.push(this.outcomesForm.value.outcomes.trim());
      this.outcomesForm.reset();
    }
  }

  removeOutcome(value: string) {
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

  outcomesAsHypothesisEffectVariables() {
    const variables = [];
    this.outcomes.forEach( outcome => {
      const variable = new HypothesisEffectVariable(outcome, 'WITHIN', 'OUTCOME');
      variables.push(variable);
    });
    if (variables.length === 0) {
      return null;
    } else {
      return variables;
    };
  }

  get outcomes(): string[] {
    return this._outcomes;
  }

  set outcomes(value: string[]) {
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
}
