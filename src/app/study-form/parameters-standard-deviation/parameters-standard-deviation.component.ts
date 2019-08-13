import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {Subscription} from 'rxjs';
import {StudyService} from '../study.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {constants} from '../../shared/model/constants';
import {minMaxValidator} from '../../shared/validators/minmax.validator';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-parameters-standard-deviation',
  templateUrl: './parameters-standard-deviation.component.html',
  styleUrls: ['./parameters-standard-deviation.component.css']
})
export class ParametersStandardDeviationComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _stDevForm: FormGroup;
  private _formErrors = constants.PARAMETERS_STANDARD_DEVIATION_ERRORS;
  private _validationMessages = constants.PARAMETERS_STANDARD_DEVIATION_VALIDATION_MESSAGES;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private _fb: FormBuilder,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );

    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  ngOnInit() {
    this._afterInit = true;
    this.buildForm();
  }

  ngDoCheck() {
    this._updateStandardDeviations();
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  buildForm() {
    this.stDevForm = this.fb.group(
      this._defineControls()
    );
    this.stDevForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  _defineControls() {
    const controlArray = {};
    this.isuFactors.outcomes.forEach(
      outcome => {
        controlArray[outcome.name] = [outcome.standardDeviation];
      }
    );
    return controlArray;
  }

  onValueChanged(data?: any) {
    if (!this.stDevForm) {
      return;
    }
    const form = this.stDevForm;

    this.formErrors['vectorofstandarddeviations'] = '';
    for (const field in this.stDevForm.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['vectorofstandarddeviations'];
        for (const key in control.errors) {
          this.formErrors['vectorofstandarddeviations'] = messages[key];
        }
      }
    }
  }

  _updateStandardDeviations() {
    this.isuFactors.outcomes.forEach( outcome => {
      outcome.standardDeviation = this.stDevForm.controls[outcome.name].value;
    });
    this.study_service.updateIsuFactors(this.isuFactors);
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

  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
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

  get formErrors(): { vectorofstandarddeviations: string; } {
    return this._formErrors;
  }

  set formErrors(value: { vectorofstandarddeviations: string; }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    vectorofstandarddeviations: { required: string; };
  } {
    return this._validationMessages;
  }

  set validationMessages(value: {
    vectorofstandarddeviations: { required: string; };
  }) {
    this._validationMessages = value;
  }

  get stDevForm(): FormGroup {
    return this._stDevForm;
  }

  set stDevForm(value: FormGroup) {
    this._stDevForm = value;
  }
}
