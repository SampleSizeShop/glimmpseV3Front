import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/index';
import {StudyService} from '../../shared/services/study.service';
import {StudyDesign} from '../../shared/model/study-design';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  private _progressSubscription: Subscription;
  private _studyDesign: StudyDesign;

  constructor(private study_service: StudyService) {
    this._progressSubscription = this.study_service.studyDesign$.subscribe( study => {
      this._studyDesign = study;
    });
  }

  ngOnInit() {
  }

  get design() {
    return this._studyDesign.progress.design;
  }

  get hypothesis() {
    return this._studyDesign.progress.hypothesis;
  }

  get dimensions() {
    return this._studyDesign.progress.dimensions;
  }

  get parameters() {
    return this._studyDesign.progress.parameters;
  }

  get optional() {
    return this._studyDesign.progress.optional;
  }
}
