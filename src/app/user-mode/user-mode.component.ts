import { Component, OnInit } from '@angular/core';
import {StudyService} from '../shared/study.service';

@Component({
  selector: 'app-user-mode',
  templateUrl: './user-mode.component.html',
  styleUrls: ['./user-mode.component.scss']
})
export class UserModeComponent implements OnInit {
  guided: boolean;

  constructor(private study_service: StudyService) {}

  selectGuided() {
    this.study_service.guided = true;
    this.updateForm();
  }

  selectFlex() {
    this.study_service.guided = false;
    this.updateForm();
  }

  private updateForm() {
    this.guided = this.study_service.guided;
    this.study_service.selectMode(this.guided);
    this.study_service.next = 'TARGET_EVENT';
  }

  ngOnInit() {
    this.selectGuided();
  }

}
