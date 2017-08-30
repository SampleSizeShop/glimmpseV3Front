import {Component, DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {minMaxValidator} from '../shared/minmax.validator';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../shared/constants';
import {StudyService} from '../shared/study.service';

@Component({
  selector: 'app-type-one-error',
  templateUrl: './type-one-error.component.html',
  styleUrls: ['./type-one-error.component.scss'],
  providers:[NGXLogger]
})
export class TypeOneErrorComponent implements DoCheck {
  private _typeOneErrorRateForm: FormGroup;
  private _formErrors = constants.TYPE_ONE_ERROR_ERRORS;
  private _validationMessages = constants.TYPE_ONE_ERROR_VALIDATION_MESSAGES;

  constructor(private study_service: StudyService, private fb: FormBuilder, private logger: NGXLogger) {
    this.buildForm();
  }

  buildForm(): void {
    this.typeOneErrorRateForm = this.fb.group({
      typeoneerror: ['0.05', minMaxValidator(0, 1, this.logger)]
    });

    this.typeOneErrorRateForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.typeOneErrorRateForm) {
      return;
    }
    const form = this.typeOneErrorRateForm;

    for (const field in this.formErrors) {
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

  ngDoCheck() {
    this.study_service.updateTypeOneErrorRate(this.typeOneErrorRateForm.get('typeoneerror').value);
  }

  get typeOneErrorRateForm(): FormGroup {
    return this._typeOneErrorRateForm;
  }

  set typeOneErrorRateForm(value: FormGroup) {
    this._typeOneErrorRateForm = value;
  }

  get formErrors(): { power; samplesize; ciwidth } | any {
    return this._formErrors;
  }

  set formErrors(value: { power; samplesize; ciwidth } | any) {
    this._formErrors = value;
  }

  get validationMessages(): { power; samplesize; ciwidth } | any {
    return this._validationMessages;
  }

  set validationMessages(value: { power; samplesize; ciwidth } | any) {
    this._validationMessages = value;
  }

}
