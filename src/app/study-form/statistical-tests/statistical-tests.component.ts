import {Component, DoCheck, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {constants} from '../../shared/model/constants';
import {StudyService} from '../../shared/services/study.service';
import {Subscription} from 'rxjs';
import {UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, UntypedFormControl} from '@angular/forms';
import {statisticalTestsValidator} from '../../shared/validators/statistical-tests.validator';
import {NavigationService} from '../../shared/services/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-statistical-tests',
  templateUrl: './statistical-tests.component.html',
  styleUrls: ['./statistical-tests.component.scss']
})
export class StatisticalTestsComponent implements OnInit, DoCheck, OnDestroy {
  private _statisticalTests;
  private _statisticalTestsForm: UntypedFormGroup;
  private _selectedTests: string[];
  private _selectedTestsSubscription: Subscription;
  private _navigationSubscription: Subscription;
  private _validationMessages;
  private _formErrors;
  private _items;
  private _statisticalTestsOption;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};

  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: UntypedFormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.validationMessages = constants.STATISTICAL_TESTS_VALIDATION_MESSAGES;
    this.formErrors = constants.STATISTICAL_TESTS_ERRORS;
    this.statisticalTests = constants.STATISTICAL_TESTS;
    this.statisticalTestsOption = [
      {id: '0', name: this.statisticalTests.HOTELLING_LAWLEY},
      {id: '1', name: this.statisticalTests.PILLAI_BARTLET},
      {id: '2', name: this.statisticalTests.WILKS_LIKLIEHOOD},
      {id: '3', name: this.statisticalTests.BOX_CORRECTION},
      {id: '4', name: this.statisticalTests.GEISSER_GREENHOUSE},
      {id: '5', name: this.statisticalTests.HUYNH_FELDT},
      {id: '6', name: this.statisticalTests.UNCORRECTED}
    ];


    this._isClickNextReference = {value: false};
    this._isClickNextSubscription = this.navigation_service.isClickNext$.subscribe(
      isClickNext => {
        this._isClickNext = isClickNext;
        this._isClickNextReference.value = isClickNext;
        if (this.statisticalTestsForm !== null && this.statisticalTestsForm !== undefined) {
          Object.keys(this.statisticalTestsForm.controls).forEach( control => {
            this.statisticalTestsForm.get(control).updateValueAndValidity();
          });
        }
      }
    );

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
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  ngOnInit() {
    this._afterInit = true;
    this.updateIsClickNext(false);
    if (this.selectedTests.length === 0) {
      this.setNextEnabled('INVALID');
    }
    this.buildForm();
  }

  ngDoCheck() {
    this.checkValidator();
  }

  ngOnDestroy() {
    this.selectedTests = this.statisticalTestsForm.value.statisticaltestsoptions
      .map((v, i) => v ? this.statisticalTestsOption[i].name : null)
      .filter(v => v !== null);
    this.study_service.updateSelectedTests(this.selectedTests);
    this.setNextEnabled('VALID');
    this.navigationSubscription.unsubscribe();
    this.selectedTestsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
    this._isClickNextSubscription.unsubscribe();
  }

  updateIsClickNext(value: boolean) {
    this.navigation_service.updateIsClickNext(value);
  }

  buildForm() {
    const controls = this.statisticalTestsOption.map(c => new UntypedFormControl(this.isSelected(c.name)));

    this.statisticalTestsForm = this.fb.group({
      statisticaltestsoptions: new UntypedFormArray(controls, statisticalTestsValidator(1, this._isClickNextReference))
    });
    this.statisticalTestsForm.valueChanges.subscribe(data => this.emptyErrorMessage());

    this.statisticalTestsForm.statusChanges.subscribe(
      result => {
        if (!this.formErrors.outcomes) {
          this.setNextEnabled(result)
        }
      }
    );
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
    if (this.selectedTests.length < 1) {
      this.setNextEnabled('INVALID');
    }
  }

  isSelected(value: string): boolean {
    return this.selectedTests.includes(value);
  }

  emptyErrorMessage() {
    this.formErrors = {};
  }

  checkValidBeforeNavigation(direction: string): void {
    if (this._isClickNext) {
      this.checkValidator();
    }
    if ( direction === 'NEXT' ) {
      if (!this.formErrors.statisticaltestsoptions) {
        this.setNextEnabled('VALID');
      } else {
        this.setNextEnabled('INVALID');
      }
    }
  }

  checkValidator(data?: any) {
    if (!this.statisticalTestsForm || !this._isClickNext) {
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

  get statisticalTestsForm(): UntypedFormGroup {
    return this._statisticalTestsForm;
  }

  set statisticalTestsForm(value: UntypedFormGroup) {
    this._statisticalTestsForm = value;
  }

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  set fb(value: UntypedFormBuilder) {
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

  get isClickNext(): boolean {
    return this._isClickNext;
  }
}
