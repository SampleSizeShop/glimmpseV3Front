import {Component, Input, OnInit} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../study.service';

@Component({
  selector: 'app-parameters-standard-deviation',
  templateUrl: './parameters-standard-deviation.component.html',
  styleUrls: ['./parameters-standard-deviation.component.css']
})
export class ParametersStandardDeviationComponent implements OnInit {
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
