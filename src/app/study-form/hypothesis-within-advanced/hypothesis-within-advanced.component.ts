import { Component, OnInit } from '@angular/core';
import {constants} from "../../shared/constants";

@Component({
  selector: 'app-hypothesis-within-advanced',
  templateUrl: './hypothesis-within-advanced.component.html',
  styleUrls: ['./hypothesis-within-advanced.component.scss']
})
export class HypothesisWithinAdvancedComponent implements OnInit {
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
