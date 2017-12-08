import {Component, Input, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../study.service';

@Component({
  selector: 'app-parameters-gaussian-covariate-correlation',
  templateUrl: './parameters-gaussian-covariate-correlation.component.html',
  styleUrls: ['./parameters-gaussian-covariate-correlation.component.scss']
})
export class ParametersGaussianCovariateCorrelationComponent implements OnInit {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;

  constructor(private study_service: StudyService) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
  }

  ngOnInit() {
    // TODO: thisnk about dependency checks
  }


  get isuFactors(): ISUFactors {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }
}
