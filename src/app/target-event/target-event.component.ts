import { Component, OnInit } from '@angular/core';
import {StudyService} from '../shared/study.service';
import {constants} from '../shared/constants';

@Component({
  selector: 'app-target-event',
  templateUrl: './target-event.component.html',
  styleUrls: ['./target-event.component.scss']
})
export class TargetEventComponent implements OnInit {
  private _targetEvent: string;
  constructor(private study_service: StudyService) { }

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
    this.selectRejectionOnly();
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
}
