import {Subscription} from 'rxjs';
import {Component, OnDestroy, ViewChild} from '@angular/core';
import {StudyService} from '../../shared/services/study.service';
import {NGXLogger} from 'ngx-logger';
import {constants} from '../../shared/model/constants';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';

@Component({
  selector: 'app-solve-for',
  templateUrl: './solve-for.component.html',
  styleUrls: ['./solve-for.component.scss'],
  providers: [NGXLogger]
})
export class SolveForComponent implements OnDestroy {
  private _solveFor: string;
  private _solveForSubscription: Subscription;
  private _navigationSubscription: Subscription;
  private _directionCommand: string;

  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private log: NGXLogger,
              private _navigation_service: NavigationService,
              private modalService: NgbModal) {
    this.solveForSubscription = this.study_service.solveForSelected$.subscribe(
      solveFor => {
        this.solveFor = solveFor;
      }
    );
    this._navigationSubscription = this.study_service.navigationDirection$.subscribe(
      direction => {
        this._directionCommand = direction;
      }
    );
    this._afterInit = false;
    this._showHelpTextSubscription = this._navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
    this._navigation_service.updateValid(true);
  }

  ngOnDestroy() {
    this.solveForSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  selectPower() {
    this.solveFor = constants.SOLVE_FOR_POWER;
    this.study_service.updateSolveFor(this.solveFor);
  }

  selectSampleSize() {
    this.solveFor = constants.SOLVE_FOR_SAMPLESIZE;
    this.study_service.updateSolveFor(this.solveFor);
  }

  isPower(): boolean {
    return this.solveFor === constants.SOLVE_FOR_POWER;
  }

  isSampleSize(): boolean {
    return this.solveFor === constants.SOLVE_FOR_SAMPLESIZE;
  }

  get solveFor(): string {
    return this._solveFor;
  }

  set solveFor(value: string) {
    this._solveFor = value;
  }

  get solveForSubscription(): Subscription {
    return this._solveForSubscription;
  }

  set solveForSubscription(value: Subscription) {
    this._solveForSubscription = value;
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
}
