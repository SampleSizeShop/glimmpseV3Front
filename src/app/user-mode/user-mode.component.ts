import { Component, OnInit } from '@angular/core';
import {StudyService} from '../services/study.service';

@Component({
  selector: 'app-user-mode',
  templateUrl: './user-mode.component.html',
  styleUrls: ['./user-mode.component.scss']
})
export class UserModeComponent implements OnInit {
  guided: boolean;

  constructor(private study_service: StudyService) {}

  selectGuided() {
    this.study_service.setGuided(true);
    this.updateForm();
  }

  selectFlex() {
    this.study_service.setGuided(false);
    this.updateForm();
  }

  private updateForm() {
    this.guided = this.study_service.isGuided();
    this.study_service.selectMode(this.guided);
    this.study_service.setNext('TARGET_EVENT');
  }

  ngOnInit() {
    this.selectGuided();
  }

}
