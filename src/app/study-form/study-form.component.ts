import { Component, OnInit } from '@angular/core';
import {StudyDesign} from '../shared/study-design';

@Component({
  selector: 'app-study-form',
  templateUrl: './study-form.component.html',
  styleUrls: ['./study-form.component.scss']
})
export class StudyFormComponent implements OnInit {
  valid: Boolean = false;
  model: StudyDesign = new StudyDesign()
  isValid() {this.valid = true; }
  ngOnInit() {
    this.model.name = 'New GLM'
  }

}
