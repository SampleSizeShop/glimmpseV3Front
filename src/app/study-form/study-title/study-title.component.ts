import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import {StudyService} from '../study.service';
import {isNullOrUndefined} from 'util';
import {StudyDesign} from '../../shared/study-design';
import {NavigationService} from '../../shared/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-study-title',
  templateUrl: './study-title.component.html',
  styleUrls: ['./study-title.component.scss']
})
export class StudyTitleComponent implements OnInit, OnDestroy {
  private _studyTitle: string;
  private _studyTitleForm: FormGroup;
  private _studyTitleSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;

  @ViewChild('helpText') helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private fb: FormBuilder,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._studyTitleSubscription = this.study_service.studyTitle$.subscribe(title => {
      if (title !== this._studyTitle) {
        this._studyTitle = title;
      }
    });
    this._afterInit = false;
    this._showHelpTextSubscription = this.navigation_service.helpText$.subscribe( help => {
      if (this._afterInit) {
        this.showHelpText(this.helpTextModal);
      }
    });
  }

  ngOnInit() {
    this._afterInit = true;
    this.buildForm();
    if (isNullOrUndefined(this._studyTitle)) {
      this._studyTitle = 'New Study';
    }
  }

  ngOnDestroy() {
    this._studyTitleSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  buildForm(): void {
    this._studyTitleForm = this.fb.group({
      studyTitle: [this._studyTitle]
    });
    this.studyTitleForm.valueChanges.subscribe( data => {
      this.study_service.updateStudyTitle(data.studyTitle);
    })
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

  get studyTitleForm(): FormGroup {
    return this._studyTitleForm;
  }

  get studyTitle(): string {
    return this._studyTitle;
  }
}
