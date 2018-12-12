import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {constants} from '../../shared/constants';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StudyService} from '../study.service';
import {NGXLogger} from 'ngx-logger';
import {minMaxValidator} from '../../shared/minmax.validator';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/navigation.service';

@Component({
  selector: 'app-parameters-scale-factor',
  templateUrl: './parameters-scale-factor.component.html',
  styleUrls: ['./parameters-scale-factor.component.css']
})
export class ParametersScaleFactorComponent implements OnInit, DoCheck, OnDestroy {

  private _scaleFactor: number;
  private _scaleFactorForm: FormGroup;
  private _formErrors = constants.PARAMETERS_SCALE_FACTOR_ERRORS;
  private _validationMessages = constants.PARAMETERS_SCALE_FACTOR_VALIDATION_MESSAGES;

  private _scaleFactorSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private fb: FormBuilder,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.scaleFactorSubscription = this.study_service.scaleFactor$.subscribe(
      scaleFactor => {
        this.scaleFactor = scaleFactor
      }
    );
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this.buildForm();
  }

  buildForm(): void {
    this.scaleFactorForm = this.fb.group({
      scalefactor: [this.scaleFactor, minMaxValidator(0, 1, this.log)]
    });

    this.scaleFactorForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.scaleFactorForm) {
      return;
    }
    const form = this.scaleFactorForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = messages[key];
        }
      }
    }
  }

  ngOnInit() {
    this._afterInit = true;
  }

  ngOnDestroy() {
    this._showHelpTextSubscription.unsubscribe();
  }

  ngDoCheck() {
    this.study_service.updateScaleFactor(this.scaleFactorForm.get('scalefactor').value);
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

  get scaleFactor(): number {
    return this._scaleFactor;
  }

  set scaleFactor(value: number) {
    this._scaleFactor = value;
  }

  get scaleFactorForm(): FormGroup {
    return this._scaleFactorForm;
  }

  set scaleFactorForm(value: FormGroup) {
    this._scaleFactorForm = value;
  }

  get formErrors(): { typeoneerror } | any {
    return this._formErrors;
  }

  set formErrors(value: { typeoneerror } | any) {
    this._formErrors = value;
  }

  get validationMessages(): { typeoneerror } | any {
    return this._validationMessages;
  }

  set validationMessages(value: { typeoneerror } | any) {
    this._validationMessages = value;
  }

  get scaleFactorSubscription(): Subscription {
    return this._scaleFactorSubscription;
  }

  set scaleFactorSubscription(value: Subscription) {
    this._scaleFactorSubscription = value;
  }
}
