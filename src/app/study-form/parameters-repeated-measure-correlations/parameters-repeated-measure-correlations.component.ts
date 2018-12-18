
import {of as observableOf, Observable, Subscription} from 'rxjs';

import {map, switchMap} from 'rxjs/operators';
import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {ISUFactors} from '../../shared/ISUFactors';
import {CorrelationMatrixService} from '../correlation-matrix/correlationMatrix.service';
import {StudyService} from '../study.service';
import {RepeatedMeasure} from '../../shared/RepeatedMeasure';
import {isNullOrUndefined} from 'util';
import {CorrelationMatrix} from '../../shared/CorrelationMatrix';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/navigation.service';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-parameters-repeated-measure-correlations',
  templateUrl: './parameters-repeated-measure-correlations.component.html',
  styleUrls: ['./parameters-repeated-measure-correlations.component.scss'],
  providers: [CorrelationMatrixService]
})
export class ParametersRepeatedMeasureCorrelationsComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _correlationMatrixSubscription: Subscription;
  private _repeatedMeasure$: Observable<RepeatedMeasure>;
  private _correlationMatrix: CorrelationMatrix;
  private _measure: RepeatedMeasure;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private route: ActivatedRoute,
              private matrix_service: CorrelationMatrixService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.repeatedMeasure$ = this.route.paramMap.pipe(switchMap(
      (params: ParamMap) => this.getRepeatedMeasure(params.get('measure'))
    ));
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  ngOnInit() {
    this._afterInit = true;
    this.repeatedMeasure$.subscribe( measure => {
      this._measure = measure;
      this.correlationMatrix = measure.correlationMatrix;
      if (!isNullOrUndefined(this.correlationMatrix
          && !isNullOrUndefined(this.correlationMatrix.values))) {
        this.matrix_service.updateCorrelationMatrix(this._measure.correlationMatrix);
      }
    } );
    this.correlationMatrixSubscription = this.matrix_service.correlationMatrix$.subscribe(matrix => {
      if (!isNullOrUndefined(matrix)) {
        this.correlationMatrix = matrix;
      }
    });
  }

  ngDoCheck() {
    this.isuFactors.repeatedMeasures.forEach(measure => {
      if (measure.name === this._measure.name) {
        measure.correlationMatrix = this.correlationMatrix;
      }
    });
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  ngOnDestroy() {
    this._isuFactorsSubscription.unsubscribe();
    if (!isNullOrUndefined(this.correlationMatrixSubscription)) {
      this.correlationMatrixSubscription.unsubscribe();
    }
    this._showHelpTextSubscription.unsubscribe();
  }

  getRepeatedMeasures() { return observableOf(this.isuFactors.repeatedMeasures); }

  private getRepeatedMeasure(name: string | any) {
    return this.getRepeatedMeasures().pipe(map(
      measures => measures.find(
        measure => measure.name === name
      )));
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

  set repeatedMeasure$(value: Observable<RepeatedMeasure>) {
    this._repeatedMeasure$ = value;
  }

  get repeatedMeasure$(): Observable<RepeatedMeasure> {
    return this._repeatedMeasure$;
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

  get correlationMatrix(): CorrelationMatrix {
    return this._correlationMatrix;
  }

  set correlationMatrix(value: CorrelationMatrix) {
    this._correlationMatrix = value;
  }

  get correlationMatrixSubscription(): Subscription {
    return this._correlationMatrixSubscription;
  }

  set correlationMatrixSubscription(value: Subscription) {
    this._correlationMatrixSubscription = value;
  }
}
