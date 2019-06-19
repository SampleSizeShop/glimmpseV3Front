import {Component, Input} from '@angular/core';
import {Link} from '../../../models/link';
import {Node} from '../../../models/node';
import * as d3 from 'd3';

@Component({
  selector: '[linkVisual]',
  template: `
    <svg:path
      fill="none"
      stroke="rgb(85, 85, 85)"
      stroke-opacity="0.4"
      stroke-width="1.5"
      class="link" xmlns:svg="http://www.w3.org/1999/html"
      [attr.d]="getPath(link)"
    ></svg:path>
  `,
  styleUrls: ['./link-visual.component.scss']
})
export class LinkVisualComponent {
  @Input('linkVisual') link: any;

  getPath(link: {source: Node, target: Node}) {
    const e = d3.linkHorizontal().x(d => d[0]).y(d => d[1]);
    return e(this.link);
  }
}
