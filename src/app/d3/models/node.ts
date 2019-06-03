// Implementing SimulationNodeDatum interface into our custom Node class

export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number;
  x?: number;
  y?: number;

  id: string;
  description: string;

  constructor(id, description) {
    this.id = id;
    this.description = description;
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
