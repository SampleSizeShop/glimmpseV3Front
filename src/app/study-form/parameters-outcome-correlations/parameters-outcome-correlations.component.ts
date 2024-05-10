import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {CorrelationMatrixService} from '../../shared/services/correlationMatrix.service';
import {isNull, isNullOrUndefined} from 'util';
import {Subscription} from 'rxjs';
import {StudyService} from '../../shared/services/study.service';
import {UntypedFormBuilder} from '@angular/forms';
import {CorrelationMatrix} from '../../shared/model/CorrelationMatrix';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-parameters-outcome-correlations',
  templateUrl: './parameters-outcome-correlations.component.html',
  styleUrls: ['./parameters-outcome-correlations.component.scss'],
  providers: [CorrelationMatrixService]
})
export class ParametersOutcomeCorrelationsComponent implements OnInit, DoCheck, OnDestroy {
  private _isuFactors: ISUFactors;
  private _isuFactorsSubscription: Subscription;
  private _correlationMatrixSubscription: Subscription;
  private _correlationMatrix: CorrelationMatrix;
  size: number;
  title = 'outcome';
  names = [];
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private _fb: UntypedFormBuilder,
              private matrix_service: CorrelationMatrixService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.correlationMatrixSubscription = this.matrix_service.correlationMatrix$.subscribe( matrix => {
      this.correlationMatrix = matrix;
    });
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  get values() {
    if (
      !isNullOrUndefined(this.correlationMatrix) &&
      !isNullOrUndefined(this.correlationMatrix.values)) {
      return this.correlationMatrix.values;
    } else {
      return 'no values'
    };
  }

  ngOnInit() {
    this._afterInit = true;
    if (!isNullOrUndefined(this.isuFactors.outcomeCorrelationMatrix)) {
      this.matrix_service.updateCorrelationMatrix(this.isuFactors.outcomeCorrelationMatrix);
    }
    this.setSize();
    this.setNames();
  }

  ngDoCheck() {
    if (!isNullOrUndefined(this.correlationMatrix)) {
      this.isuFactors.outcomeCorrelationMatrix = this.correlationMatrix;
    }
    this.study_service.updateIsuFactors(this.isuFactors);
  }

  ngOnDestroy() {
    this._isuFactorsSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  setNames() {
    if (!isNullOrUndefined(this.isuFactors.outcomes
      && this.isuFactors.outcomes.length > 0)) {
      this.isuFactors.outcomes.forEach( outcome => {
        this.names.push(outcome.name)
      });
    } else {
      this.names = ['']
    }
  }

  setSize() {
    if (!isNullOrUndefined(this.isuFactors.outcomes)
      && this.isuFactors.outcomes.length > 0) {
      this.size = this.isuFactors.outcomes.length;
    } else {
      this.size = 1;
    }
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

  get isuFactors() {
    return this._isuFactors;
  }

  set isuFactors(value: ISUFactors) {
    this._isuFactors = value;
  }

  set isuFactorsSubscription(value: Subscription) {
    this._isuFactorsSubscription = value;
  }

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  get correlationMatrixSubscription(): Subscription {
    return this._correlationMatrixSubscription;
  }

  set correlationMatrixSubscription(value: Subscription) {
    this._correlationMatrixSubscription = value;
  }

  get correlationMatrix(): CorrelationMatrix {
    return this._correlationMatrix;
  }

  set correlationMatrix(value: CorrelationMatrix) {
    this._correlationMatrix = value;
  }
}
