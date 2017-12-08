import { Component, OnInit } from '@angular/core';
import {StudyService} from '../study.service';

@Component({
  selector: 'app-optional-specs-power-method',
  templateUrl: './optional-specs-power-method.component.html',
  styleUrls: ['./optional-specs-power-method.component.scss']
})
export class OptionalSpecsPowerMethodComponent implements OnInit {
  unconditional: boolean;

  constructor(private study_service: StudyService) {}

  selectUnconditional() {
    this.unconditional = true;
    // this.study_service.selectMode(this.unconditional);
  }

  selectQuantile() {
    this.unconditional = false;
    // this.study_service.selectMode(this.unconditional);
  }

  ngOnInit() {
    this.selectUnconditional();
  }

}
