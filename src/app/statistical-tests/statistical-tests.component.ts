import {Component, DoCheck, OnInit} from '@angular/core';
import {constants} from '../shared/constants';
import {StudyService} from '../shared/study.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-statistical-tests',
  templateUrl: './statistical-tests.component.html',
  styleUrls: ['./statistical-tests.component.scss']
})
export class StatisticalTestsComponent implements OnInit, DoCheck {
  private _statisticalTests;
  private _selectedTests: string[];
  private _selectedTestsSubscription: Subscription;
  constructor(private study_service: StudyService) {
    this.statisticalTests = constants.STATISTICAL_TESTS;

    this.selectedTestsSubscription = this.study_service.selectdTests$.subscribe(
      selectedTests => {
        this.selectedTests = selectedTests;
      }
    );
  }

  ngOnInit() {}

  ngDoCheck() {
    this.study_service.updateSelectedTests(this.selectedTests);
  }

  selectTest(value: string) {
    const i = this.selectedTests.indexOf(value);
    if (i !== -1) {
      this.selectedTests.splice(i, 1)
    } else {
      this.selectedTests.push(value);
    }
  }

  isSelected(value: string): boolean {
    return this.selectedTests.includes(value);
  }

  get statisticalTests() {
    return this._statisticalTests;
  }

  set statisticalTests(value) {
    this._statisticalTests = value;
  }

  get selectedTests(): string[] {
    return this._selectedTests;
  }

  set selectedTests(value: string[]) {
    this._selectedTests = value;
  }

  get selectedTestsSubscription(): Subscription {
    return this._selectedTestsSubscription;
  }

  set selectedTestsSubscription(value: Subscription) {
    this._selectedTestsSubscription = value;
  }
}
