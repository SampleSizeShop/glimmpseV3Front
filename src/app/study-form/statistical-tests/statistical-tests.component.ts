import {Component, DoCheck, OnInit, OnDestroy} from '@angular/core';
import {constants} from '../../shared/constants';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {statisticalTestsValidator} from '../statistical-tests/statistical-tests.validator';
import {Observable, of as observableOf} from 'rxjs/index';
import {Outcome} from '../../shared/Outcome';
import {NavigationService} from '../../shared/navigation.service';

@Component({
  selector: 'app-statistical-tests',
  templateUrl: './statistical-tests.component.html',
  styleUrls: ['./statistical-tests.component.scss']
})
export class StatisticalTestsComponent implements OnInit, DoCheck, OnDestroy {
  private _statisticalTests;
  private _statisticalTestsForm: FormGroup;
  private _selectedTests: string[];
  private _selectedTestsSubscription: Subscription;
  private _navigationSubscription: Subscription;
  private _validationMessages;
  private _formErrors;
  private _items;
  private _statisticalTestsOption;

  constructor(private _fb: FormBuilder, private study_service: StudyService, private navigation_service: NavigationService) {
    this.validationMessages = constants.STATISTICAL_TESTS_VALIDATION_MESSAGES;
    this.formErrors = constants.STATISTICAL_TESTS_ERRORS;
    this.statisticalTests = constants.STATISTICAL_TESTS;
    this.statisticalTestsOption = [
      {id: 'hlt', name: this.statisticalTests.HOTELLING_LAWLEY},
      {id: 'pb', name: this.statisticalTests.PILLAI_BARTLET},
      {id: 'wl', name: this.statisticalTests.WILKS_LIKLIEHOOD},
      {id: 'bc', name: this.statisticalTests.BOX_CORRECTION},
      {id: 'gg', name: this.statisticalTests.GEISSER_GREENHOUSE},
      {id: 'hf', name: this.statisticalTests.HUYNH_FELDT},
      {id: 'uc', name: this.statisticalTests.UNCORRECTED},
      {id: 'urp', name: this.statisticalTests.UNIREP},
      {id: 'mrp', name: this.statisticalTests.MULTIREP},
    ];

    this.selectedTestsSubscription = this.study_service.selectdTests$.subscribe(
      selectedTests => {
        this.selectedTests = selectedTests;
      }
    );
    this.navigationSubscription = this.study_service.navigationDirection$.subscribe(
      direction => {
        this.checkValidBeforeNavigation(direction);
      }
    );
  }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    this.study_service.updateSelectedTests(this.selectedTests);
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  buildForm() {
    const controls = this.statisticalTestsOption.map(c => new FormControl(false));

    this.statisticalTestsForm = this.fb.group({
      statisticaltestsoptions: new FormArray(controls, statisticalTestsValidator(this.selectedTests))
    });
    this.statisticalTestsForm.valueChanges.subscribe(data => this.emptyErrorMessage());

    this.setNextEnabled('INVALID');
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
  }

  selectTest(value: string) {
    const i = this.selectedTests.indexOf(value);
    if (i !== -1) {
      this.selectedTests.splice(i, 1)
    } else {
      this.selectedTests.push(value);
    }
  }

  isSelected(value: string): boolean {
    return this.selectedTests.includes(value);
  }

  emptyErrorMessage() {
    this.formErrors = {};
  }

  checkValidBeforeNavigation(direction: string): void {
    if ( direction === 'NEXT' ) {
      this.checkValidator();
      if (!this.formErrors.statisticaltestsoptions) {
        this.setNextEnabled('VALID');
      } else {
        this.setNextEnabled('INVALID');
      }
    }
  }

  checkValidator(data?: any) {
    if (!this.statisticalTestsForm) {
      return;
    }
    const form = this.statisticalTestsForm;

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

  get statisticalTests() {
    return this._statisticalTests;
  }

  set statisticalTests(value) {
    this._statisticalTests = value;
  }

  get selectedTests(): string[] {
    return this._selectedTests;
  }

  set selectedTests(value: string[]) {
    this._selectedTests = value;
  }

  get selectedTestsSubscription(): Subscription {
    return this._selectedTestsSubscription;
  }

  set selectedTestsSubscription(value: Subscription) {
    this._selectedTestsSubscription = value;
  }

  get navigationSubscription(): Subscription {
    return this._navigationSubscription;
  }

  set navigationSubscription(value: Subscription) {
    this._navigationSubscription = value;
  }

  get statisticalTestsForm(): FormGroup {
    return this._statisticalTestsForm;
  }

  set statisticalTestsForm(value: FormGroup) {
    this._statisticalTestsForm = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
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
  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
  }
  get statisticalTestsOption() {
    return this._statisticalTestsOption;
  }

  set statisticalTestsOption(value) {
    this._statisticalTestsOption = value;
  }
}
