import {Component} from '@angular/core';

@Component({
  selector: 'mathjax-component',
  styleUrls: ['./app.component.css'],
  templateUrl: './mathjax.component.html'
})
export class MathJaxComponent {
  output: string = "$$M = \\begin{bmatrix}x_1 & \\cdots & n_1 \\\\x_2 & \\cdots & n_2 \\\\x_3 & \\cdots & n_3 \\\\x_4 & \\cdots & n_4 \\\\x_5 & \\cdots & n_5 \\end{bmatrix}$$";
}
