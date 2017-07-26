import { Component, OnInit } from '@angular/core';
import {StudyService} from '../shared/study.service';

@Component({
  selector: 'app-target-event',
  templateUrl: './target-event.component.html',
  styleUrls: ['./target-event.component.scss']
})
export class TargetEventComponent implements OnInit {
  private _targetEvent: string;
  constructor(private study_service: StudyService) { }

  selectRejectionOnly() {
    this.targetEvent = 'REJECTION';
    this.study_service.selectTargetEvent(this.targetEvent)
  }

  selectCIWidth() {
    this.targetEvent = 'CIWIDTH';
    this.study_service.selectTargetEvent(this.targetEvent)
  }

  selectWAVR() {
    this.targetEvent = 'WAVR';
    this.study_service.selectTargetEvent(this.targetEvent)
  }

  ngOnInit() {
    this.selectRejectionOnly();
  }

  isRejection(): boolean {
    return this.targetEvent === 'REJECTION' ? true : false;
  }

  isCIWidth(): boolean {
    return this.targetEvent === 'CIWIDTH' ? true : false;
  }

  isWAVR(): boolean {
    return this.targetEvent === 'WAVR' ? true : false;
  }

  get targetEvent(): string {
    return this._targetEvent;
  }

  set targetEvent(value: string) {
    this._targetEvent = value;
  }
}
