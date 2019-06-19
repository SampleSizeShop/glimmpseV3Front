import {Component, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {D3Service} from '../../d3.service';
import {CollapsibleTree} from '../../models/collapsible-tree';
import {Link} from '../../models/link';
import {Node} from '../../models/node';

@Component({
  selector: 'app-graph-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg width="100%" height="200">
      <g [appZoomableOf]="svg">
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" [leafNodes]="leaf_nodes" *ngFor="let node of nodes"></g>
      </g>
    </svg>
  `,
  styleUrls: ['./collapsible-tree.component.scss']
})
export class CollapsibleTreeComponent implements OnInit {
  @Input('data') data: any;
  nodes: Node[];
  links: Link[];
  leaf_nodes: string[];

  private tree: CollapsibleTree;
  private _options: { width, height } = { width: 800, height: 300 };

  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    const tree = this.d3Service.getCollapsibleTree(this.data);
    this.nodes = tree.nodes;
    this.links = tree.links;
    this.leaf_nodes = tree.leaf_nodes;
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
