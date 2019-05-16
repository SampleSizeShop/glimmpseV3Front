import {Injectable} from '@angular/core';
import * as d3 from 'd3';
import {CollapsibleTree} from './models/collapsible-tree';

@Injectable()
export class D3Service {

  /** This service will provide methods to enable user interaction with elements
   * while maintaining the d3 simulations physics
   */
  constructor() { }

  /** A method to bind a pan and zoom behaviour to an svg element */
  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = () => {
      const transform = d3.event.transform;
      container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
    }

    zoom = d3.zoom().on('zoom', zoomed);
    svg.call(zoom);
  }

  /** A method to bind a collapse/expand an svg element ???*/

  /** The interactable graph we will simulate in this article
   * This method does not interact with the document, purely physical calculations with d3
   */
  getCollapsibleTree(data: any): CollapsibleTree {
    const tree = new CollapsibleTree(data, null);
    return tree;
  }
}
