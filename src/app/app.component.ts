import { Component } from '@angular/core';
import { MathJaxService } from './mathjax-service';
import {MathJaxComponent} from './mathjax.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  public message: string;
  public mathjax_component: MathJaxComponent;
  constructor(mathjaxService: MathJaxService) {
    this.message = mathjaxService.getMessage();
  }
}
