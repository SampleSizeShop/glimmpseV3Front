import {Component, DoCheck, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {constants} from '../../shared/model/constants';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {of as observableOf, Subscription, Observable} from 'rxjs';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';
import {NGXLogger} from 'ngx-logger';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-parameters-variance-scale-factors',
  templateUrl: './parameters-variance-scale-factors.component.html',
  styleUrls: ['./parameters-variance-scale-factors.component.scss']
})
export class ParametersVarianceScaleFactorsComponent implements OnInit, DoCheck, OnDestroy {
private _scaleFactorsForm: UntypedFormGroup;
private _scaleFactors: number[];
private _max: number;
private _validationMessages;
private _formErrors;
private _varianceScaleFactorsSubscription: Subscription;
private _showHelpTextSubscription: Subscription;

@ViewChild('helpText', {static: true}) helpTextModal;
private helpTextModalReference: any;
private _afterInit: boolean;

  constructor(private _fb: UntypedFormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.scaleFactors = [];
    this.validationMessages = constants.OUTCOME_FORM_VALIDATION_MESSAGES;
    this.formErrors = constants.OUTCOME_FORM_ERRORS;
    this._max = constants.MAX_OUTCOMES;

    this.varianceScaleFactorsSubscription = this.study_service.varianceScaleFactors$.subscribe(
      factors => {
        this.scaleFactors = factors;
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
    if (!isNullOrUndefined(this.scaleFactors) && this.scaleFactors.length === 0) {
      this.scaleFactors.push(1);
    }
    this.buildForm();
  }

  ngDoCheck() {
    if (this.scaleFactors) {
      this.study_service.updateVarianceScaleFactors(this.scaleFactors);
    }
  }

  ngOnDestroy() {
    if (this.scaleFactors.length === 0) {
      this.scaleFactors.push(1);
      this.study_service.updateVarianceScaleFactors(this.scaleFactors);
    }
    this.varianceScaleFactorsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  buildForm() {
    let scaleFactorDefault = 0.5;
    if (!isNullOrUndefined(this.scaleFactors) && this.scaleFactors.length > 0) {
      scaleFactorDefault = null;
    }
    this.scaleFactorsForm = this.fb.group({
      scaleFactors: [scaleFactorDefault, minMaxValidator( -1, 99999999999)]
    });

    this.scaleFactorsForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.scaleFactorsForm) {
      return;
    }
    const form = this.scaleFactorsForm;

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

  addScaleFactor() {
    const value = +this.scaleFactorsForm.value.scaleFactors
    if (
      this.scaleFactorsForm.status === 'VALID'
      && this.scaleFactors.indexOf(value) === -1) {
      this.scaleFactors.push(+this.scaleFactorsForm.value.scaleFactors);
      this.scaleFactorsForm.reset();
    }
  }

  removeScaleFactor(value: number) {
    const index = this.scaleFactors.indexOf(value);
    if (index > -1) {
      this.scaleFactors.splice(index, 1);
    }
    this.scaleFactorsForm.reset();
  }

  firstScaleFactor(): boolean {
    return this.scaleFactors.length === 0 ? true : false;
  }

  nextScaleFactor(): boolean {
    if (!this.firstScaleFactor() && this.scaleFactors.length < this.max ) {
      return true;
    }
    return false;
  }

  get scaleFactor$ () {
    return observableOf(this._scaleFactors)
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

  get scaleFactors(): number[] {
    return this._scaleFactors;
  }

  set scaleFactors(value: number[]) {
    this._scaleFactors = value;
  }

  get scaleFactorsForm(): UntypedFormGroup {
    return this._scaleFactorsForm;
  }

  set scaleFactorsForm(value: UntypedFormGroup) {
    this._scaleFactorsForm = value;
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

  get varianceScaleFactorsSubscription(): Subscription {
    return this._varianceScaleFactorsSubscription;
  }

  set varianceScaleFactorsSubscription(value: Subscription) {
    this._varianceScaleFactorsSubscription = value;
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }
}
