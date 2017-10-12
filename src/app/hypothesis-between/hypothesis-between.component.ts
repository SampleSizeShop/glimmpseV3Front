import {Component, OnDestroy, OnInit} from '@angular/core';
import {constants} from 'app/shared/constants';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-hypothesis-between',
  templateUrl: './hypothesis-between.component.html',
  styleUrls: ['./hypothesis-between.component.css']
})
export class HypothesisBetweenComponent implements OnInit, OnDestroy {
  private _showAdvancedOptions: boolean;
  private _betweenHypothesisNature: string;
  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_NATURE;

  private _betweenHypothesisNatureSubscription: Subscription;

  constructor(private study_service: StudyService) {
    this.showAdvancedOptions = false;

    this.betweenHypothesisNatureSubscription = this.study_service.betweenHypothesisNature$.subscribe(
      betweenHypothesisNature => {
        this.betweenHypothesisNature = betweenHypothesisNature;
      }
    );
  }

  ngOnInit() {
    if (this.betweenHypothesisNature !== this.HYPOTHESIS_NATURE.GLOBAL_TRENDS) {
      this.showAdvancedOptions = true;
    }
  }

  ngOnDestroy() {
    this.betweenHypothesisNatureSubscription.unsubscribe();
  }

  isSelected(hypothesis: string): boolean {
    return this.betweenHypothesisNature === hypothesis;
  }

  selectHypothesisNature(type: string) {
    this.betweenHypothesisNature = type;
    this.study_service.updateBetweenHypothesisNature(this.betweenHypothesisNature);
  }

  toggleAdvancedOptions() {
    this.showAdvancedOptions = !this.showAdvancedOptions;
  }

  get showAdvancedOptions(): boolean {
    return this._showAdvancedOptions;
  }

  set showAdvancedOptions(value: boolean) {
    this._showAdvancedOptions = value;
  }

  get betweenHypothesisNature(): string {
    return this._betweenHypothesisNature;
  }

  set betweenHypothesisNature(value: string) {
    this._betweenHypothesisNature = value;
  }

  get HYPOTHESIS_NATURE() {
    return this._HYPOTHESIS_NATURE;
  }

  set HYPOTHESIS_NATURE(value) {
    this._HYPOTHESIS_NATURE = value;
  }

  get betweenHypothesisNatureSubscription(): Subscription {
    return this._betweenHypothesisNatureSubscription;
  }

  set betweenHypothesisNatureSubscription(value: Subscription) {
    this._betweenHypothesisNatureSubscription = value;
  }
}
