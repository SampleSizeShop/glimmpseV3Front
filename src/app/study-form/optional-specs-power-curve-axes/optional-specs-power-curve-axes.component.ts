import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {StudyService} from "../study.service";
import {constants} from "../../shared/constants";

@Component({
  selector: 'app-optional-specs-power-axes',
  templateUrl: './optional-specs-power-curve-axes.component.html',
  styleUrls: ['./optional-specs-power-curve-axes.component.scss']
})
export class OptionalSpecsPowerCurveAxesComponent implements OnInit {

  private _targetEvent: string;
  private _targetEventSubscription: Subscription;
  constructor() {
  }

  selectRejectionOnly() {
    this.targetEvent = constants.REJECTION_EVENT;
  }

  selectCIWidth() {
    this.targetEvent = constants.CIWIDTH_EVENT;
  }

  selectWAVR() {
    this.targetEvent = constants.WAVR_EVENT;
  }

  ngOnInit() {
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
}
