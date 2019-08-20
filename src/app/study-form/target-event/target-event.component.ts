import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {StudyService} from '../../shared/services/study.service';
import {constants} from '../../shared/model/constants';
import {Subscription} from 'rxjs';
import {NavigationService} from '../../shared/services/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-target-event',
  templateUrl: './target-event.component.html',
  styleUrls: ['./target-event.component.scss']
})
export class TargetEventComponent implements OnInit , OnDestroy {
  private _targetEvent: string;
  private _targetEventSubscription: Subscription;

  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private _navigation_service: NavigationService,
              private modalService: NgbModal) {
    this.targetEventSubscription = this.study_service.targetEventSelected$.subscribe(
      event => {
        this.targetEvent = event;
      }
    );
    this._afterInit = false;
    this._showHelpTextSubscription = this._navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  selectRejectionOnly() {
    this.targetEvent = constants.REJECTION_EVENT;
    this.study_service.selectTargetEvent(this.targetEvent)
  }

  selectCIWidth() {
    this.targetEvent = constants.CIWIDTH_EVENT;
    this.study_service.selectTargetEvent(this.targetEvent)
  }

  selectWAVR() {
    this.targetEvent = constants.WAVR_EVENT;
    this.study_service.selectTargetEvent(this.targetEvent)
  }

  ngOnInit() {
    this._afterInit = true;
  }

  ngOnDestroy() {
    this._showHelpTextSubscription.unsubscribe();
  }

  isRejection(): boolean {
    return this.targetEvent === constants.REJECTION_EVENT;
  }

  isCIWidth(): boolean {
    return this.targetEvent === constants.CIWIDTH_EVENT;
  }

  isWAVR(): boolean {
    return this.targetEvent === constants.WAVR_EVENT;
  }

  get targetEvent(): string {
    return this._targetEvent;
  }

  set targetEvent(value: string) {
    this._targetEvent = value;
  }

  get targetEventSubscription(): Subscription {
    return this._targetEventSubscription;
  }

  set targetEventSubscription(value: Subscription) {
    this._targetEventSubscription = value;
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
