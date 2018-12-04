import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import {StudyService} from '../study.service';
import {isNullOrUndefined} from 'util';
import {StudyDesign} from '../../shared/study-design';

@Component({
  selector: 'app-study-title',
  templateUrl: './study-title.component.html',
  styleUrls: ['./study-title.component.scss']
})
export class StudyTitleComponent implements OnInit, OnDestroy {
  private _studyTitle: string;
  private _studyTitleForm: FormGroup;
  private _studyTitleSubscription: Subscription;

  constructor(private study_service: StudyService, private fb: FormBuilder) {
    this._studyTitleSubscription = this.study_service.studyTitle$.subscribe(title => {
      if (title !== this._studyTitle) {
        this._studyTitle = title;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    if (isNullOrUndefined(this._studyTitle)) {
      this._studyTitle = 'New Study';
    }
  }

  ngOnDestroy() {
    this._studyTitleSubscription.unsubscribe();
  }

  buildForm(): void {
    this._studyTitleForm = this.fb.group({
      studyTitle: [this._studyTitle]
    });
    this.studyTitleForm.valueChanges.subscribe( data => {
      this.study_service.updateStudyTitle(data.studyTitle);
    })
  }

  get studyTitleForm(): FormGroup {
    return this._studyTitleForm;
  }

  get studyTitle(): string {
    return this._studyTitle;
  }
}
