import { Component, OnInit } from '@angular/core';
import {StudyDesign} from '../shared/study-design';

@Component({
  selector: 'app-user-mode',
  templateUrl: './user-mode.component.html',
  styleUrls: ['./user-mode.component.scss']
})
export class UserModeComponent implements OnInit {
  model: StudyDesign = new StudyDesign();
  selected: string;

  constructor() { }

  selectGuided() {
    this.model.mode = 'GUIDED';
    this.selected = this.model.mode;
  }
  selectFlex() {
    this.model.mode = 'FLEXIBLE';
    this.selected = this.model.mode;
  }

  isGuided() { if ( this.model.mode === 'GUIDED' ) {
                  return true;
    }
    return false;
  }
  ngOnInit() {
    this.selectGuided();
  }

}
