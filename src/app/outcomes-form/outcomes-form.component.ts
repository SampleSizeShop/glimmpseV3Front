import { Component, OnInit } from '@angular/core';
import {Outcome} from '../shared/outcome';

@Component({
  selector: 'outcome-form',
  templateUrl: './outcomes-form.component.html',
  styleUrls: ['./outcomes-form.component.scss']
})
export class OutcomesFormComponent implements OnInit {
  outcome = new Outcome();
  types = ['Between', 'Within'];
  constructor() { }
  ngOnInit() {
  }

  onSubmit() {
    alert('Thanks for submitting! Data: ' + JSON.stringify(this.outcome.name) + ' ' + JSON.stringify(this.outcome.type));
  }
}
