// Implementing SimulationNodeDatum interface into our custom Node class
import {stringify} from "querystring";

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;

  id: string;

  constructor(id) {
    this.id = id;
  }

  get r() {
    return 10;
  }

  get fontSize() {
    return "0.31em";
  }

  get color() {
    return '#555';
  }
}
