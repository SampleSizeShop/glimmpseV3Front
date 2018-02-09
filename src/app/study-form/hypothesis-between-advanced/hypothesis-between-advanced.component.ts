import { Component, OnInit } from '@angular/core';
import {constants} from "../../shared/constants";


@Component({
  selector: 'app-hypothesis-between-advanced',
  templateUrl: './hypothesis-between-advanced.component.html',
  styleUrls: ['./hypothesis-between-advanced.component.scss']
})
export class HypothesisBetweenAdvancedComponent implements OnInit {

  private _HYPOTHESIS_NATURE = constants.HYPOTHESIS_BETWEEN_NATURE;
  constructor() { }

  ngOnInit() {
  }

  selectHypothesisNature(name: string) {}
  isSelected(name: string) { return false;}

  get HYPOTHESIS_NATURE(): { GLOBAL_TRENDS: string; IDENTITY: string; POLYNOMIAL: string; USER_DEFINED: string } {
    return this._HYPOTHESIS_NATURE;
  }
}
