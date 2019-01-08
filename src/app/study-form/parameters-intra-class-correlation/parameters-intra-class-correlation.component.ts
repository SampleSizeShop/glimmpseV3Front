import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs';
import {ISUFactors} from '../../shared/ISUFactors';
import {Cluster} from '../../shared/Cluster';
import {FormBuilder, FormGroup} from '@angular/forms';
import {constants} from '../../shared/constants';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/navigation.service';
import {NGXLogger} from 'ngx-logger';
import {minMaxValidator} from '../../shared/minmax.validator';

@Component({
  selector: 'app-parameters-intra-class-correlation',
  templateUrl: './parameters-intra-class-correlation.component.html',
  styleUrls: ['./parameters-intra-class-correlation.component.scss']
})
export class ParametersIntraClassCorrelationComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _cluster: Cluster;
  private _intraClassCorrForm: FormGroup;
  private _formErrors = constants.PARAMETERS_INTRA_CLASS_CORRELATION_ERRORS;
  private _validationMessages = constants.PARAMETERS_INTRA_CLASS_CORRELATION_VALIDATION_MESSAGES;
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
    this.cluster = this.isuFactors.cluster;
    this.buildForm();
  }

  ngDoCheck() {
    this._updateIntraCorrelation();
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  buildForm() {
    this.intraClassCorrForm = this.fb.group(
      this._defineControls()
    );
    this._defineControlsValidators();
    this.intraClassCorrForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.intraClassCorrForm) {
      return;
    }
    const form = this.intraClassCorrForm;

    this.formErrors['vectorofcorrelation'] = '';
    for (const field in this.intraClassCorrForm.value) {
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages['vectorofcorrelation'];
        for (const key in control.errors ) {
          if (!this.formErrors['vectorofcorrelation'].includes(messages[key])) {
            this.formErrors['vectorofcorrelation'] += '' + messages[key];
          }
        }
      }
    }
  }

  _defineControls() {
    const controlArray = {};
    this.isuFactors.cluster.levels.forEach(
      level => {
        controlArray[level.levelName] = [level.intraClassCorellation];
      }
    );
    return controlArray;
  }

  _defineControlsValidators() {
    this.isuFactors.cluster.levels.forEach( level => {
      this.intraClassCorrForm.controls[level.levelName].setValidators(minMaxValidator(-1 / (level.noElements - 1), 1));
    });
  }

  _updateIntraCorrelation() {
    this.isuFactors.cluster.levels.forEach( level => {
      level.intraClassCorellation = this.intraClassCorrForm.get(level.levelName).value;
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

  get cluster(): Cluster {
    return this._cluster;
  }

  set cluster(value: Cluster) {
    this._cluster = value;
  }

  get intraClassCorrForm(): FormGroup {
    return this._intraClassCorrForm;
  }

  set intraClassCorrForm(value: FormGroup) {
    this._intraClassCorrForm = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  get formErrors(): { vectorofcorrelation: string; } {
    return this._formErrors;
  }

  set formErrors(value: { vectorofcorrelation: string; }) {
    this._formErrors = value;
  }

  get validationMessages(): {
    vectorofcorrelation: { required: string; minval: string; maxval: string; };
  } {
    return this._validationMessages;
  }

  set validationMessages(value: {
    vectorofcorrelation: { required: string; minval: string; maxval: string;  };
  }) {
    this._validationMessages = value;
  }
}
