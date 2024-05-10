import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {StudyService} from '../../shared/services/study.service';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {isNullOrUndefined} from 'util';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationService} from '../../shared/services/navigation.service';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-hypothesis-theta-0',
  templateUrl: './hypothesis-theta-0.component.html',
  styleUrls: ['./hypothesis-theta-0.component.scss']
})
export class HypothesisTheta0Component implements OnInit, OnDestroy {

  private _isuFactors: ISUFactors;
  private _theta0Form: UntypedFormGroup;
  private _isuFactorsSubscription: Subscription;
  private _visible: boolean;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private _fb: UntypedFormBuilder,
              private study_service: StudyService,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  ngOnInit() {
    this._afterInit = true;
    this.visible = false;
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.buildForm();
  }

  ngOnDestroy() {
    this.updateTheta0();
    this.study_service.updateIsuFactors(this.isuFactors);
    this._showHelpTextSubscription.unsubscribe();
  }

  buildForm() {
    this.theta0Form = this.fb.group( this.controlDefs );
  }

  updateTheta0() {
    if ( !isNullOrUndefined(this.isuFactors) ) {
      const thetaArray = [];
      this.isuFactors.theta0.forEach( (row, r) => {
        thetaArray.push([]);
        row.forEach( (element, c) => {
          const name = r.toString() + '-' + c.toString();
          thetaArray[r].push(this.theta0Form.controls[name].value);
        });
      });
      this.isuFactors.theta0 = thetaArray;
    }
  }

  get controlDefs() {
    const controlDefs = {};
    this.isuFactors.theta0.forEach((row, r) => {
      row.forEach( (col, c) => {
        const name = r.toString() + '-' + c.toString();
        controlDefs[name] = [col];
      });
    });
    return controlDefs;
  }

  toggleVisible() {
    this.visible = !this.visible;
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

  get theta0Form(): UntypedFormGroup {
    return this._theta0Form;
  }

  set theta0Form(value: UntypedFormGroup) {
    this._theta0Form = value;
  }

  get fb(): UntypedFormBuilder {
    return this._fb;
  }

  set fb(value: UntypedFormBuilder) {
    this._fb = value;
  }

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
  }
}
