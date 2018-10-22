import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private _search = new FormControl();
  disableAnimationa: boolean;

  constructor() {
    this.disableAnimationa = environment.disableAnimations;
  }

  get search(): FormControl {
    return this._search;
  }

  set search(value: FormControl) {
    this._search = value;
  }
}
