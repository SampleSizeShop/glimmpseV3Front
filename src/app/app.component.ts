import { Component } from '@angular/core';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
search = new FormControl();

}
