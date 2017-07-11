import { Component } from '@angular/core';
import { FlaskService } from './flask.service';
import {FlaskComponent} from './flask.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  public message: string;
  public mathjax_component: FlaskComponent;
  constructor(mathjaxService: FlaskService) {
    this.message = mathjaxService.getMessage();
  }
}
