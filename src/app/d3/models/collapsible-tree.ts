import * as d3 from 'd3';
import {Link} from './link';
import {Node} from './node';
import {isNullOrUndefined} from "util";


export class CollapsibleTree {

  public nodes: Node[] = [];
  public links: Link[] = [];
  public leaf_nodes = [];

  constructor(data, options: { width, height }) {
    this.initTree(data);
  }

  initTree(data) {
    const treeLayout = d3.tree()
        .size([10, 162.5])
        .nodeSize([2, 2])
        .separation((a, b) => a.parent === b.parent ? 3.5 : 6);
    let root;
    root = d3.stratify<any>()
      .id(function(d) { return d.id; })
      .parentId(function(d) { return d.parent; })
      (data);
    root.x0 = 20;
    root.y0 = 40;

    this.setNodes(treeLayout(root));
    this.setLinks(root);
  }

 setNodes(tree: any) {
  const nodes = tree.descendants();
  nodes.forEach(node => {
    const x = node.y;
    const y = node.x;
    node.x = x * 25 + tree.x0;
    node.y = y + tree.y0;
    if (isNullOrUndefined( node.children) || node.children.length == 0) {
      this.leaf_nodes.push(node.id);
    }
  });
  const a = 1;
  this.nodes = nodes;
  }

  setLinks(root: any) {
    const l = [];
    root.links().forEach(link => {
      l.push(new Link([link.source.x * 2, link.source.y * 2],[link.target.x * 2, link.target.y * 2]))
    });
    this.links = l;
  }

  collapse(d) {
    if (d.children) {
      d._children = d.children
      d._children.map( (child) => this.collapse(child));
      d.children = null
    }
  }

  expand(d) {
    if (d._children) {
      d.children = d._children
      d.children.map((child) => this.expand(child));
      d.children = null
    }
  }

  expandAndFixHeight(d, newParent) {
    d.height = newParent.height - 1;
    d.depth = newParent.depth + 1;

    if (d._children) {
      d.children = d._children;
      d._children = null;
    }
    if (d.children) {
      d.children.map((child) => this.expandAndFixHeight(child, d));
    }
  }

  // Creates a curved (diagonal) path from parent to the child nodes
  diagonalCurvedPath(s, d) {

    const path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }
}
