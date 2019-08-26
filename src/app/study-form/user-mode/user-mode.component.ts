import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {StudyService} from '../../shared/services/study.service';
import {Subscription} from 'rxjs/index';
import {NavigationService} from '../../shared/services/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-user-mode',
  templateUrl: './user-mode.component.html',
  styleUrls: ['./user-mode.component.scss']
})
export class UserModeComponent implements OnInit, OnDestroy {
  guided: boolean;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText', {static: false}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private _navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._afterInit = false;
    this._showHelpTextSubscription = this._navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  selectGuided() {
    this.guided = true;
    this.study_service.selectMode(this.guided);
  }

  selectFlex() {
    this.guided = false;
    this.study_service.selectMode(this.guided);
  }

  ngOnInit() {
    this._afterInit = true;
    this.selectGuided();
  }

  ngOnDestroy() {
    this._showHelpTextSubscription.unsubscribe();
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
