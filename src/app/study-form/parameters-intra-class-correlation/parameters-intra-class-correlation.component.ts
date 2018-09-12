import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs';
import {ISUFactors} from '../../shared/ISUFactors';
import {Cluster} from '../../shared/Cluster';
import {FormBuilder, FormGroup} from '@angular/forms';
import {constants} from '../../shared/constants';

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

  constructor(private study_service: StudyService, private _fb: FormBuilder) {
      this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
        this.isuFactors = isuFactors;
      } );
  }

  ngOnInit() {
    this.cluster = this.isuFactors.cluster;
    this.buildForm();
  }

  ngDoCheck() {
    this._updateIntraCorrelation();
  }

  ngOnDestroy() {
    this.isuFactorsSubscription.unsubscribe();
  }

  buildForm() {
    this.intraClassCorrForm = this.fb.group(
      this._defineControls()
    );
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
          this.formErrors['vectorofcorrelation'] = messages[key];
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

  _updateIntraCorrelation() {
    this.isuFactors.cluster.levels.forEach( level => {
      level.intraClassCorellation = this.intraClassCorrForm.get(level.levelName).value;
    });
    this.study_service.updateIsuFactors(this.isuFactors);
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
    vectorofcorrelation: { required: string; };
  }
  {
    return this._validationMessages;
  }

  set validationMessages(value: {
    vectorofcorrelation: { required: string; };
  }) {
    this._validationMessages = value;
  }
}
