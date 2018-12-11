import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GaussianCovariate} from '../../shared/GaussianCovariate';
import {StudyService} from '../study.service';
import {isNullOrUndefined} from 'util';
import {minMaxValidator} from '../../shared/minmax.validator';
import {constants} from '../../shared/constants';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs/Rx';
import {NavigationService} from '../../shared/navigation.service';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-gaussian-covariate',
  templateUrl: './gaussian-covariate.component.html',
  styleUrls: ['./gaussian-covariate.component.css']
})
export class GaussianCovariateComponent implements OnInit, DoCheck, OnDestroy {
  private _gaussianCovariateForm: FormGroup;
  private _gaussianCovariatesSubscription;
  private _gaussianCovariate: GaussianCovariate;
  private _formErrors = constants.GAUSSIAN_COVARIATE_ERRORS;
  private _validationMessages = constants.GAUSSIAN_COVARIATE_VALIDATION_MESSAGES;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: FormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.gaussianCovariatesSubscription = this.study_service.gaussianCovariate$.subscribe(gaussianCovariate => {
        this.gaussianCovariate = gaussianCovariate;
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
    this.buildForm()
  }

  ngDoCheck() {
    this.updateStudyForm();
  }

  ngOnDestroy() {
    this.gaussianCovariatesSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  buildForm() {
    let variance = 0;
    if (this.hasGaussianCovariate()) {
      variance = this.gaussianCovariate.variance;
    }
    this.gaussianCovariateForm = this.fb.group({
      variance: [variance, minMaxValidator(0, Number.MAX_VALUE)]
    });
    this.gaussianCovariateForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.gaussianCovariateForm) {
      return;
    }
    const form = this.gaussianCovariateForm;

    this.formErrors['gaussiancovariate'] = '';
    const messages = this.validationMessages['gaussiancovariate'];
    for (const field in form.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        for (const key in control.errors ) {
          this.formErrors['gaussiancovariate'] = messages[key];
        }
      }
    }
  }

  hasGaussianCovariate() {
    return !isNullOrUndefined(this.gaussianCovariate);
  }

  removeGaussianCovariate() {
    this.gaussianCovariate = null;
  }

  includeGaussianCovariate() {
    if (!this.hasGaussianCovariate()) {
      this.gaussianCovariate = new GaussianCovariate();
    }
  }

  private updateStudyForm() {
    if (this.gaussianCovariateForm.status === 'VALID') {
      if ( this.hasGaussianCovariate() ) {
        this.gaussianCovariate.variance = this.gaussianCovariateForm.value.variance;
      }
      this.study_service.updateGaussianCovariate(this.gaussianCovariate);
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

  get gaussianCovariateForm(): FormGroup {
    return this._gaussianCovariateForm;
  }

  set gaussianCovariateForm(value: FormGroup) {
    this._gaussianCovariateForm = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get gaussianCovariatesSubscription() {
    return this._gaussianCovariatesSubscription;
  }

  set gaussianCovariatesSubscription(value) {
    this._gaussianCovariatesSubscription = value;
  }

  get gaussianCovariate(): GaussianCovariate {
    return this._gaussianCovariate;
  }

  set gaussianCovariate(value: GaussianCovariate) {
    this._gaussianCovariate = value;
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
}
