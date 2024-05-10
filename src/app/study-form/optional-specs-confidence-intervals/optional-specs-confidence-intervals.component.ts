import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {constants} from '../../shared/model/constants';
import {Subscription} from 'rxjs';
import {StudyService} from '../../shared/services/study.service';
import {NavigationService} from '../../shared/services/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {fadeTransition} from '../../animations/animations';
import {NGXLogger} from 'ngx-logger';
import {isNullOrUndefined} from 'util';
import {minMaxValidator} from "../../shared/validators/minmax.validator";
import {ConfidenceInterval} from "../../shared/model/ConfidenceInterval";

@Component({
  selector: 'app-optional-specs-confidence-intervals',
  templateUrl: './optional-specs-confidence-intervals.component.html',
  animations: [fadeTransition],
  styleUrls: ['./optional-specs-confidence-intervals.component.scss']
})
export class OptionalSpecsConfidenceIntervalsComponent implements OnInit, OnDestroy {
  private _confidenceIntervalForm: UntypedFormGroup;
  private _validationMessages;
  private _formErrors;
  private _showHelpTextSubscription: Subscription;

  private _includeCi: boolean;
  private _betaKnown: boolean;
  private _confidenceInterval: ConfidenceInterval;

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
    this._includeCi = false;
    this._betaKnown = true;
    this._validationMessages = constants.REPEATED_MEASURE_FORM_VALIDATION_MESSAGES;
    this._formErrors = constants.REPEATED_MEASURE_FORM_ERRORS;
    this.study_service.confidenceInterval$.subscribe( ci => {
      this._confidenceInterval = ci;
    });
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
      }
    );
  }

  buildForm() {
    this._confidenceIntervalForm = this._fb.group({
      lowertail: [0.05, [Validators.required, minMaxValidator(0, 1)]],
      uppertail: [0, [Validators.required, minMaxValidator(0, 1)]],
      rankest: [1, [Validators.required, minMaxValidator(0, 99999999999999999)]],
      samplesizeest: [10, [Validators.required, minMaxValidator(0, 99999999999999999)]]
    });
    if (!isNullOrUndefined(this._confidenceInterval)) {
      this._betaKnown = this._confidenceInterval.beta_known;
      this._confidenceIntervalForm = this._fb.group({
        lowertail: [this._confidenceInterval.lower_tail, [Validators.required, minMaxValidator(0, 1)]],
        uppertail: [this._confidenceInterval.upper_tail, [Validators.required, minMaxValidator(0, 1)]],
        rankest: [this._confidenceInterval.rank_est, [Validators.required, minMaxValidator(0, 99999999999999999)]],
        samplesizeest: [this._confidenceInterval.n_est, [Validators.required, minMaxValidator(0, 99999999999999999)]]
      });
      this._includeCi = true;
    }
    this._confidenceIntervalForm.valueChanges.subscribe(data => this.onValueChanged(data));
  };

  onValueChanged(data?: any) {
    if (!this._confidenceIntervalForm) {
      return;
    }
    const form = this._confidenceIntervalForm;

    this._formErrors['space'] = '';
    const messages = this._validationMessages['space'];
    // if (!form.valid && this._isClickNextReference) {
    //   for (const key of Object.keys(form.errors)) {
    //     this.formErrors.covariatepower = this._validationMessages.covariatepower[key];
    //   }
    // }

    this.checkValidBeforeNavigation()
  }

  ngOnInit() {
    this._afterInit = true;
    this.buildForm();
  }

  ngOnDestroy() {
    this.updateCI();
    this.navigation_service.updateValid(true);
    this._showHelpTextSubscription.unsubscribe();
  }

  private updateCI() {
    if (isNullOrUndefined(this._confidenceInterval)) {
      this._confidenceInterval = new ConfidenceInterval()
    }
    if (this._confidenceIntervalForm.valid) {
      this._confidenceInterval.beta_known = this._betaKnown;
      this._confidenceInterval.lower_tail = this._confidenceIntervalForm.value.lowertail;
      this._confidenceInterval.upper_tail = this._confidenceIntervalForm.value.uppertail;
      this._confidenceInterval.rank_est = this._confidenceIntervalForm.value.rankest;
      this._confidenceInterval.n_est = this._confidenceIntervalForm.value.samplesizeest
    }
    if (this._confidenceIntervalForm.valid && this._includeCi) {
      this.study_service.updateConfidenceInterval(this._confidenceInterval);
    }
    if (!this._includeCi) {
      this.study_service.updateConfidenceInterval(null);
    }
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

  checkValidBeforeNavigation() {
    if (!this._includeCi) {
      this.navigation_service.updateValid(true);
    } else if (this._confidenceIntervalForm.status === 'VALID') {
      this.navigation_service.updateValid(true);
    } else {
      this.navigation_service.updateValid(false);
    }
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

  get formErrors() {
    return this._formErrors;
  }

  get isClickNext(): boolean {
    return this._isClickNext;
  }

  set isClickNext(value: boolean) {
    this._isClickNext = value;
  }

  get confidenceIntervalForm(): UntypedFormGroup {
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

  isBetaKnown() {
    return this._betaKnown;
  }

  betaKnown() {
    this._betaKnown = true;
  }

  betaEstimated() {
    this._betaKnown = false;
  }
}
