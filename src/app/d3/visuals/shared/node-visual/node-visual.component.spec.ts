import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeVisualComponent } from './node-visual.component';
import {D3Service} from "../../../d3.service";
import {LinkVisualComponent} from "../link-visual/link-visual.component";
import {CollapsibleTreeComponent} from "../../collapsible-tree/collapsible-tree.component";
import {ZoomableDirective} from "../../../directives/zoomable.directive";

describe('NodeVisualComponent', () => {
  let component: NodeVisualComponent;
  let fixture: ComponentFixture<NodeVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NodeVisualComponent,
        ZoomableDirective ],
      providers: [D3Service]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
