import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GaussianCovariate} from '../shared/GaussianCovariate';
import {NavigationService} from '../shared/navigation.service';
import {constants} from '../shared/constants';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from "../shared/study.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-gaussian-covariate',
  templateUrl: './gaussian-covariate.component.html',
  styleUrls: ['./gaussian-covariate.component.css']
})
export class GaussianCovariateComponent implements OnInit, DoCheck, OnDestroy {
  private _gaussianCovariateForm: FormGroup;
  private _editing: boolean;
  private _gaussianCovariates: GaussianCovariate[];
  private _stages;
  private _stage: number;

  private _directionCommand: string;
  private _navigationSubscription: Subscription;
  private _gaussianCovariatesSubscription;

  constructor(private _fb: FormBuilder, private navigation_service: NavigationService, private study_service: StudyService) {
    this.editing = false;
    this.stages = constants.GAUSSIAN_COVARIATE_STAGES;
    this.stage = -1;

    this.navigationSubscription = this.navigation_service.navigation$.subscribe(
      direction => {
        this.directionCommand = direction;
        this.internallyNavigate(this.directionCommand);
      }
    );

    this.gaussianCovariatesSubscription = this.study_service.gaussianCovariates$.subscribe(gaussianCovariates => {
        this.gaussianCovariates = gaussianCovariates;
      }
    );
  }

  ngOnInit() {
    this.buildForm()
  }

  ngDoCheck() {
    this.updateFormStatus();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }

  buildForm() {
    this.gaussianCovariateForm = this.fb.group({
      variance: [0]
    });
  }

  addGaussianCovariate() {
    const gaussianCovariate = new GaussianCovariate();
    gaussianCovariate.variance = this.gaussianCovariateForm.value.variance;
    if (isNullOrUndefined(this.gaussianCovariates)) {
      this.gaussianCovariates = [];
    }
    this.gaussianCovariates.push(gaussianCovariate);
    this.study_service.updateGaussianCovariates(this.gaussianCovariates);
  }

  removeGaussianCovariate(covatiate: GaussianCovariate) {
    const index = this.gaussianCovariates.indexOf(covatiate);
    if (index > -1) {
      this.gaussianCovariates.splice(index, 1);
    }
    if ( !this.hasGaussianCovariate() ) {
      this.gaussianCovariates = null;
      this.study_service.updateGaussianCovariates(this.gaussianCovariates);
    }
  }

  includeGaussianCovariate() {
    this.setStage(0);
    this.editing = true;
    this.navigation_service.updateNavigationMode(true);
    this.navigation_service.updateNextEnabled(true);
    this.setNextEnabled(this.gaussianCovariateForm.status);
  }

  hasGaussianCovariate() {
    if ( this.editing === true ) {return true;}
    if (isNullOrUndefined(this.gaussianCovariates)) {return false;}
    return true;
  }

  getStageStatus(stage: number): string {
    if (stage === 0) {
      return this.gaussianCovariateForm.status;
    }
    return 'INVALID';
  }

  setStage(next: number) {
    this.stage = next;
    this.setNextEnabled(this.getStageStatus(this.stage));
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
  }

  private updateFormStatus() {
    if (this.stage === 0) {
      if (this.gaussianCovariateForm.status !== 'INVALID') {
        this.setNextEnabled('VALID');
      } else {
        this.setNextEnabled('INVALID');
      }
    }
    // this.study_service.updateGaussianCovariates(this.gaussianCovariates);
  }

  resetForms() {
    this.buildForm();

    this.stage = -1;
    this.editing = false;
    this.navigation_service.updateNavigationMode(false);
  }

  internallyNavigate(direction: string): void {
    let next = this.stage;
    if ( direction === 'BACK' ) {
      next = this.stage - 1;
    }
    if ( direction === 'NEXT' ) {
      next = this.stage + 1;
    }
    if ( next < 0) {
      this.resetForms();
    }
    if ( next >= Object.keys(this.stages).length ) {
      this.addGaussianCovariate();
      this.resetForms();
    }
    if (this.stages[next]) {
      this.setStage(next);
    }
  }

  get gaussianCovariateForm(): FormGroup {
    return this._gaussianCovariateForm;
  }

  set gaussianCovariateForm(value: FormGroup) {
    this._gaussianCovariateForm = value;
  }

  get editing(): boolean {
    return this._editing;
  }

  set editing(value: boolean) {
    this._editing = value;
  }

  get fb(): FormBuilder {
    return this._fb;
  }

  set fb(value: FormBuilder) {
    this._fb = value;
  }

  get gaussianCovariates(): GaussianCovariate[] {
    return this._gaussianCovariates;
  }

  set gaussianCovariates(value: GaussianCovariate[]) {
    this._gaussianCovariates = value;
  }

  get stages() {
    return this._stages;
  }

  set stages(value) {
    this._stages = value;
  }

  get directionCommand(): string {
    return this._directionCommand;
  }

  set directionCommand(value: string) {
    this._directionCommand = value;
  }

  get navigationSubscription(): Subscription {
    return this._navigationSubscription;
  }

  set navigationSubscription(value: Subscription) {
    this._navigationSubscription = value;
  }

  get stage(): number {
    return this._stage;
  }

  set stage(value: number) {
    this._stage = value;
  }

  get gaussianCovariatesSubscription() {
    return this._gaussianCovariatesSubscription;
  }

  set gaussianCovariatesSubscription(value) {
    this._gaussianCovariatesSubscription = value;
  }
}
