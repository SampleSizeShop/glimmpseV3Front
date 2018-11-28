import {Component, OnInit, ViewChild} from '@angular/core';
import {StudyService} from '../study.service';
import {Subscription} from 'rxjs/index';
import {NavigationService} from '../../shared/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-mode',
  templateUrl: './user-mode.component.html',
  styleUrls: ['./user-mode.component.scss']
})
export class UserModeComponent implements OnInit {
  guided: boolean;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService, private _navigation_service: NavigationService, private modalService: NgbModal) {
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

  dismissHelp() {
    this.helpTextModalReference.close();
  }

  showHelpText(content) {
    this.modalService.dismissAll();
    this.helpTextModalReference = this.modalService.open(content);
    this.helpTextModalReference.result.then(
      (closeResult) => {
        console.log('modal closed : ', closeResult);
      }, (dismissReason) => {
        if (dismissReason === ModalDismissReasons.ESC) {
          console.log('modal dismissed when used pressed ESC button');
        } else if (dismissReason === ModalDismissReasons.BACKDROP_CLICK) {
          console.log('modal dismissed when used pressed backdrop');
        } else {
          console.log(dismissReason);
        }
      });
  }

}
