import { Component, OnInit } from '@angular/core';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';
import {HypothesisEffect} from "../shared/HypothesisEffect";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-parameters-marginal-means',
  templateUrl: './parameters-marginal-means.component.html',
  styleUrls: ['./parameters-marginal-means.component.css']
})
export class ParametersMarginalMeansComponent implements OnInit {
  private _selected: HypothesisEffect;
  private _hypothesisEffectSubscription: Subscription;

  constructor(private _fb: FormBuilder, private _study_service: StudyService) {
    this.hypothesisEffectSubscription = this._study_service.hypothesisEffect$.subscribe( effect => {
      this._selected = effect;
    });
  }

  ngOnInit() {}

  get selected(): HypothesisEffect {
    return this._selected;
  }

  set selected(value: HypothesisEffect) {
    this._selected = value;
  }

  get hypothesisEffectSubscription(): Subscription {
    return this._hypothesisEffectSubscription;
  }

  set hypothesisEffectSubscription(value: Subscription) {
    this._hypothesisEffectSubscription = value;
  }
}
