import {Component, DoCheck, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import {StudyService} from '../../shared/services/study.service';
import {isNullOrUndefined} from 'util';
import {StudyDesign} from '../../shared/model/study-design';
import {NavigationService} from '../../shared/services/navigation.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-study-title',
  templateUrl: './study-title.component.html',
  styleUrls: ['./study-title.component.scss']
})
export class StudyTitleComponent implements OnInit, DoCheck, OnDestroy {
  private _studyTitle: string;
  private _studyTitleForm: UntypedFormGroup;
  private _studyTitleSubscription: Subscription;
  private _showHelpTextSubscription: Subscription;

  private _isClickNextSubscription: Subscription;
  private _isClickNext: boolean;
  private _isClickNextReference: {value: boolean};

  @ViewChild('helpText', {static: true}) helpTextModal;
  private helpTextModalReference: any;
  private _afterInit: boolean;

  constructor(private study_service: StudyService,
              private fb: UntypedFormBuilder,
              private navigation_service: NavigationService,
              private modalService: NgbModal,
              private log: NGXLogger) {
    this._studyTitleSubscription = this.study_service.studyTitle$.subscribe(title => {
      if (title !== this._studyTitle) {
        this._studyTitle = title;
        this.buildForm();
      }
    });
    this._isClickNextReference = {value: false};
    this._isClickNextSubscription = this.navigation_service.isClickNext$.subscribe(
      isClickNext => {
        this._isClickNext = isClickNext;
        this._isClickNextReference.value = this._isClickNext;
        if (this._studyTitleForm !== null && this._studyTitleForm !== undefined) {
          this._studyTitleForm.get('studyTitle').updateValueAndValidity();
        }
      }
    );
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
    this.updateIsClickNext(false);
    this.checkValidBeforeNavigation()
  }

  ngDoCheck() {
    this.checkValidBeforeNavigation()
  }

  ngOnDestroy() {
    if (this.validTitle) {
      this._studyTitle = this.studyTitleForm.controls['studyTitle'].value
    }
    this.study_service.updateStudyTitle(this._studyTitle);
    this._studyTitleSubscription.unsubscribe();
    this._showHelpTextSubscription.unsubscribe();
  }

  get validTitle(): boolean {
    const titleControl = this.studyTitleForm.controls['studyTitle'];
    if (
      titleControl !== null
      && titleControl !== undefined
      && titleControl.value !== null
      && titleControl.value !== undefined
      && titleControl.value.trim().length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  updateIsClickNext(value: boolean) {
    this.navigation_service.updateIsClickNext(value);
  }

  checkValidBeforeNavigation(): void {
    if (this.validTitle) {
      this.setNextEnabled('VALID');
    } else {
      this.setNextEnabled('INVALID');
    }
  }

  setNextEnabled(status: string) {
    const valid = status === 'VALID' ? true : false;
    this.navigation_service.updateValid(valid);
  }

  buildForm(): void {
    this._studyTitleForm = this.fb.group({
      studyTitle: [this._studyTitle]
    });
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

  get studyTitleForm(): UntypedFormGroup {
    return this._studyTitleForm;
  }

  get studyTitle(): string {
    return this._studyTitle;
  }

  get isClickNext(): boolean {
    return this._isClickNext;
  }
}
