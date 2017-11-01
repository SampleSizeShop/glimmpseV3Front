import {Component, OnDestroy, OnInit} from '@angular/core';
import {constants} from '../shared/constants';
import {Subscription} from 'rxjs/Subscription';
import {StudyService} from '../shared/study.service';

@Component({
  selector: 'app-hypothesis-within',
  templateUrl: './hypothesis-within.component.html',
  styleUrls: ['./hypothesis-within.component.css']
})
export class HypothesisWithinComponent implements OnInit, OnDestroy {
  private _showAdvancedOptions: boolean;
  private _withinHypothesisNature: string;
  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_BETWEEN_NATURE;
  private _withinHypothesisNatureSubscription: Subscription;

  constructor(private study_service: StudyService) {
    this.showAdvancedOptions = false;

    this.withinHypothesisNatureSubscription = this.study_service.withinHypothesisNature$.subscribe(
      withinHypothesisNature => {
        this.withinHypothesisNature = withinHypothesisNature;
      }
    );
  }

  ngOnInit() {
    if (this.withinHypothesisNature !== this.HYPOTHESIS_NATURE.GLOBAL_TRENDS) {
      this.showAdvancedOptions = true;
    }
  }

  ngOnDestroy() {
    this.withinHypothesisNatureSubscription.unsubscribe();
  }

  isSelected(hypothesis: string): boolean {
    return this.withinHypothesisNature === hypothesis;
  }

  selectHypothesisNature(type: string) {
    this.withinHypothesisNature = type;
    this.study_service.updateWithinHypothesisNature(this.withinHypothesisNature);
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

  get withinHypothesisNature(): string {
    return this._withinHypothesisNature;
  }

  set withinHypothesisNature(value: string) {
    this._withinHypothesisNature = value;
  }

  get HYPOTHESIS_NATURE(): { GLOBAL_TRENDS; ALL_PAIRWISE; SUCCESSIVE_PAIRS; IDENTITY; POLYNOMIAL; USER_DEFINED } | any {
    return this._HYPOTHESIS_NATURE;
  }

  set HYPOTHESIS_NATURE(value: { GLOBAL_TRENDS; ALL_PAIRWISE; SUCCESSIVE_PAIRS; IDENTITY; POLYNOMIAL; USER_DEFINED } | any) {
    this._HYPOTHESIS_NATURE = value;
  }

  get withinHypothesisNatureSubscription(): Subscription {
    return this._withinHypothesisNatureSubscription;
  }

  set withinHypothesisNatureSubscription(value: Subscription) {
    this._withinHypothesisNatureSubscription = value;
  }
}
