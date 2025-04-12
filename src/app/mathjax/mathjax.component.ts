import {Component, Input} from '@angular/core';
import {MathJaxService} from './mathjax.service';

import {UntypedFormControl} from '@angular/forms';

/**
 *  The MathJax component was a test component designed to demo the MathJaxDirective and the connection between the Angular app and the FLASK back end.
 *  It is currently non functional.
 *
 */
@Component({
  selector: 'app-mathjax-component',
  styleUrls: ['../app.component.css'],
  templateUrl: './mathjax.component.html'
})
export class MathJaxComponent {
  /**
   * @param texString a raw string in TeX format which will be typeset by mathJax.
   */
  @Input() texString: String = '$M = \\begin{bmatrix}x_1 & \\cdots & n_1 \\\\x_2 & \\cdots & n_2 \\\\x_3 & \\cdots & n_3 \\\\x_4 & \\cdots & n_4 \\\\x_5 & \\cdots & n_5 \\end{bmatrix}$';

  /**
   * Form control to take user defined input.
   */
  tex: UntypedFormControl = new UntypedFormControl();
  /**
   * Gets formatted strings from FLASK
   */
  mathjaxService: MathJaxService;

  /**
   * Default constructor.
   *
   *  @param mathJaxService @required MathJaxService is required to get updated TeX strings from FLASK.
   */
  constructor(mathjaxService: MathJaxService) {
    this.mathjaxService = mathjaxService;
  }

  /**
   * Currently disabled.
   * Updates the input texString by calling the FLASK back end.
   */
  updateTexString() {
    // this.mathjaxService.getTexFromFlask().then(response => this.texString = response );
  }
}
