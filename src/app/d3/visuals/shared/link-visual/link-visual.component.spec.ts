import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkVisualComponent } from './link-visual.component';
import {D3Service} from "../../../d3.service";
import {NodeVisualComponent} from "../node-visual/node-visual.component";
import {CollapsibleTreeComponent} from "../../collapsible-tree/collapsible-tree.component";
import {ZoomableDirective} from "../../../directives/zoomable.directive";
import {Link} from "../../../models/link";

describe('LinkVisualComponent', () => {
  let component: LinkVisualComponent;
  let fixture: ComponentFixture<LinkVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LinkVisualComponent,
        ZoomableDirective ],
      providers: [D3Service]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkVisualComponent);
    component = fixture.componentInstance;
    const n1 = [0, 0]
    const n2 = [1, 1];
    component.link = new Link(n1, n2);
    fixture.detectChanges();
  });
});
