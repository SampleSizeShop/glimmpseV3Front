import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {constants} from '../../shared/constants';
import {Subscription} from 'rxjs';
import {StudyService} from '../study.service';
import {NavigationService} from '../../shared/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {fadeTransition} from '../../animations';
import {NGXLogger} from 'ngx-logger';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-optional-specs-confidence-intervals',
  templateUrl: './optional-specs-confidence-intervals.component.html',
  animations: [fadeTransition],
  styleUrls: ['./optional-specs-confidence-intervals.component.scss']
})
export class OptionalSpecsConfidenceIntervalsComponent implements OnInit, OnDestroy {
  private _confidenceIntervalForm: FormGroup;
  private _validationMessages;
  private _formErrors;
  private _showHelpTextSubscription: Subscription;

  private _includeCi: boolean;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: FormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._includeCi = false;
    this._validationMessages = constants.REPEATED_MEASURE_FORM_VALIDATION_MESSAGES;
    this._formErrors = constants.REPEATED_MEASURE_FORM_ERRORS;

    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this._isClickNextReference = {value: false};
    this._isClickNextSubscription = this.navigation_service.isClickInternalNext$.subscribe(
      isClickNext => {
        this.isClickNext = isClickNext;
        this._isClickNextReference.value = this.isClickNext;
        if (!isNullOrUndefined(this._confidenceIntervalForm)) {
          this._confidenceIntervalForm.get('dimension').updateValueAndValidity();
        }
      }
    );
  }

  buildForm() {
    this._confidenceIntervalForm = this._fb.group({
      lowertail: [0],
      uppertail: [1],
      rankest: [1],
      samplesizeest: [10]
    });
  };

  onValueChanged(data?: any) {
    if (!this._confidenceIntervalForm) {
      return;
    }
    const form = this._confidenceIntervalForm;

    this._formErrors['space'] = '';
    const messages = this._validationMessages['space'];
    // for (const field in form.value) {
    //   const control = form.get(field);
    //   if (control && control.dirty && !control.valid) {
    //     for (const key in control.errors ) {
    //       if (!this._formErrors['space'].includes(messages[key])) {
    //         this._formErrors['space'] += messages[key];
    //       }
    //     }
    //   }
    // }
  }

  ngOnInit() {
    this._afterInit = true;
    this.buildForm();
  }

  ngOnDestroy() {
    this._showHelpTextSubscription.unsubscribe();
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
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

  resetClickNext() {
    this.isClickNext = false;
  }

  get formErrors() {
    return this._formErrors;
  }

  get isClickNext(): boolean {
    return this._isClickNext;
  }

  set isClickNext(value: boolean) {
    this._isClickNext = value;
  }

  get confidenceIntervalForm(): FormGroup {
    return this._confidenceIntervalForm;
  }

  hasConfidenceIntervals() {
    return this._includeCi;
  }

  removeConfidenceIntervals() {
    this._includeCi = false;
  }

  includeConfidenceIntervals() {
    this._includeCi = true;
  }
}
