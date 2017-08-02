import { Component } from '@angular/core';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private _search = new FormControl();

  get search(): FormControl {
    return this._search;
  }

  set search(value: FormControl) {
    this._search = value;
  }
}
