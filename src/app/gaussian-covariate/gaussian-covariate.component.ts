import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GaussianCovariate} from '../shared/GaussianCovariate';
import {StudyService} from '../shared/study.service';
import {isNullOrUndefined} from 'util';
import {minMaxValidator} from '../shared/minmax.validator';

@Component({
  selector: 'app-gaussian-covariate',
  templateUrl: './gaussian-covariate.component.html',
  styleUrls: ['./gaussian-covariate.component.css']
})
export class GaussianCovariateComponent implements OnInit, DoCheck, OnDestroy {
  private _gaussianCovariateForm: FormGroup;
  private _gaussianCovariatesSubscription;
  private _gaussianCovariate: GaussianCovariate;

  constructor(private _fb: FormBuilder, private study_service: StudyService) {
    this.gaussianCovariatesSubscription = this.study_service.gaussianCovariate$.subscribe(gaussianCovariate => {
        this.gaussianCovariate = gaussianCovariate;
      }
    );
  }

  ngOnInit() {
    this.buildForm()
  }

  ngDoCheck() {
    this.updateStudyForm();
  }

  ngOnDestroy() {
    this.gaussianCovariatesSubscription.unsubscribe();
  }

  buildForm() {
    let variance = 0;
    if (this.hasGaussianCovariate()) {
      variance = this.gaussianCovariate.variance;
    }
    this.gaussianCovariateForm = this.fb.group({
      variance: [variance, minMaxValidator(0, 999999999999999999)]
    });
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
}
