import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/index';
import {StudyService} from '../../shared/services/study.service';
import {StudyDesign} from '../../shared/model/study-design';
import {ISUFactor} from '../../shared/model/ISUFactor';
import {RepeatedMeasure} from '../../shared/model/RepeatedMeasure';
import {Cluster} from '../../shared/model/Cluster';
import {Predictor} from '../../shared/model/Predictor';
import {Outcome} from '../../shared/model/Outcome';
import {constants} from '../../shared/model/constants';
import {HypothesisEffect} from '../../shared/model/HypothesisEffect';
import {isNullOrUndefined} from 'util';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  private _studySubscription: Subscription;
  private _studyDesign: StudyDesign;

  constructor(private study_service: StudyService) {
    this._studySubscription = this.study_service.studyDesign$.subscribe( study => {
      this._studyDesign = study;
    });
  }

  ngOnInit() {
  }

  rowStyle(index: number) {
    if (index % 2 === 1) {
      return 'col col-md-auto table-active';
    } else {
      return 'col col-md-auto table-primary';
    }
  }

  get solveFor() {
    if (this.solveForPower) {
      return 'Power'
    } else {
      return 'Samplesize, target power ' + this.study.power;
    }
  }

  get solveForPower() {
    if (this.study.solveFor === constants.SOLVE_FOR_POWER) {
      return true;
    } else {
      return false;
    }
  }

  getFactorType(factor: ISUFactor) {
    let type = 'Outcome'
    if (factor instanceof RepeatedMeasure) {
      type = 'Repeated Measure';
    }
    if (factor instanceof Cluster) {
      type = 'Cluster';
    }
    if (factor instanceof Predictor) {
      type = 'Predictor';
    }
    return type;
  }

  getDetails(factor: ISUFactor) {
    if (factor instanceof Outcome) {
      return '';
    } else {
      return factor.valueNames;
    }
  }

  get hypothesisEffect() {
    const eff = new HypothesisEffect();
    eff.variables = this.study.isuFactors.hypothesis;
    return eff
  }

  get thetaNought() {
    if (this.study.isuFactors.theta0.every(row =>  row.every(col => col === 0))) {
      return 'zero';
    } else {
      return 'custom';
    }
  }

  get contrast() {
    if (this.study.isuFactors.isHypothesisWithin) {
      return this.study.isuFactors.uMatrix.type;
    } else {
      return this.study.isuFactors.cMatrix.type;
    }
  }

  get design() {
    if (isNullOrUndefined(this._studyDesign) || isNullOrUndefined(this._studyDesign.progress)) {
      return false;
    } else {
    return this._studyDesign.progress.design;
    }
  }

  get hypothesis() {
    if (isNullOrUndefined(this._studyDesign) || isNullOrUndefined(this._studyDesign.progress)) {
      return false;
    } else {
      return this._studyDesign.progress.hypothesis;
    }
  }

  get dimensions() {
    if (isNullOrUndefined(this._studyDesign) || isNullOrUndefined(this._studyDesign.progress)) {
      return false;
    } else {
    return this._studyDesign.progress.dimensions;
    }
  }

  get parameters() {
    if (isNullOrUndefined(this._studyDesign) || isNullOrUndefined(this._studyDesign.progress)) {
      return false;
    } else {
    return this._studyDesign.progress.parameters;
    }
  }

  get optional() {
    if (isNullOrUndefined(this._studyDesign) || isNullOrUndefined(this._studyDesign.progress)){
      return false;
    } else {
    return this._studyDesign.progress.optional;
    }
  }

  get study(): StudyDesign {
    return this._studyDesign;
  }
}
