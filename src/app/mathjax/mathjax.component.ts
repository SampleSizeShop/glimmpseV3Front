import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MathJaxService} from "../services/mathjax.service";
import 'rxjs/add/operator/map';
@Component({
  selector: 'mathjax-component',
  styleUrls: ['../app.component.css'],
  templateUrl: './mathjax.component.html'
})
export class MathJaxComponent implements OnInit, OnChanges {
  @Input() texString: String = "$M = \\begin{bmatrix}x_1 & \\cdots & n_1 \\\\x_2 & \\cdots & n_2 \\\\x_3 & \\cdots & n_3 \\\\x_4 & \\cdots & n_4 \\\\x_5 & \\cdots & n_5 \\end{bmatrix}$";
  mathjaxService: MathJaxService;
  constructor(mathjaxService: MathJaxService) {
    this.mathjaxService = mathjaxService;
  }

  ngOnInit(): void {}
  ngOnChanges(): void {}

  updateTexString(){
    this.mathjaxService.getTexFromFlask().then(response => this.texString = response );
  }
}
