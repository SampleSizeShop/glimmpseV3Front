import { Node } from './node';
import {DefaultLinkObject} from "d3-shape";

// Implementing SimulationLinkDatum interface into our custom Link class
export class Link implements DefaultLinkObject{
  // Optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;

  // Must - defining enforced implementation properties
  source: [number, number];
  target: [number, number];

  constructor(source, target) {
    this.source = source;
    this.target = target;
  }
}
