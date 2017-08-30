import {Component, DoCheck, OnInit} from '@angular/core';
import {constants} from '../shared/constants';
import {StudyService} from '../shared/study.service';

@Component({
  selector: 'app-statistical-tests',
  templateUrl: './statistical-tests.component.html',
  styleUrls: ['./statistical-tests.component.scss']
})
export class StatisticalTestsComponent implements OnInit, DoCheck {
  private _statisticalTests;
  private _selectedTests: Set<string>;
  constructor(private study_service: StudyService) {
    this.statisticalTests = constants.STATISTICAL_TESTS;
    this.selectedTests = new Set<string>();
    this.selectedTests.add(this.statisticalTests.HOTELLING_LAWLEY);
  }

  ngOnInit() {}

  ngDoCheck() {
    this.study_service.updateSelectedTests(this.selectedTests);
  }

  selectTest(value: string) {
    if (this.selectedTests.has(value)) {
      this.selectedTests.delete(value);
    } else {
      this.selectedTests.add(value);
    }
  }

  isSelected(value: string): boolean {
    return this.selectedTests.has(value);
  }

  get statisticalTests() {
    return this._statisticalTests;
  }

  set statisticalTests(value) {
    this._statisticalTests = value;
  }


  get selectedTests(): Set<string> {
    return this._selectedTests;
  }

  set selectedTests(value: Set<string>) {
    this._selectedTests = value;
  }
}
