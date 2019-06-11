import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleTreeComponent } from './collapsible-tree.component';
import {NodeVisualComponent} from '../shared/node-visual/node-visual.component';
import {LinkVisualComponent} from '../shared/link-visual/link-visual.component';
import {ZoomableDirective} from '../../directives/zoomable.directive';
import {D3Service} from '../../d3.service';

describe('CollapsibleTreeComponent', () => {
  let component: CollapsibleTreeComponent;
  let fixture: ComponentFixture<CollapsibleTreeComponent>;

  const data4 = [
    {id: 'school', description: 'root'},
    {id: 'class 1', description: 'class 1', parent: 'school'},
    {id: 'pupil 1', description: 'pupil 1', parent: 'class 1'},
    {id: '...', description: 'pupil ...', parent: 'class 1'},
    {id: 'pupil 7', description: 'pupil 7', parent: 'class 1'},
    {id: '...', description: 'class ...', parent: 'school'},
    {id: 'class 7', description: 'class 7', parent: 'school'},
    {id: 'pupil 132', description: 'pupil 132', parent: 'class 7'},
    {id: '...', description: 'pupil ...', parent: 'class 7'},
    {id: 'pupil 154', description: 'pupil 154', parent: 'class 7'},
    {id: 'book 1', description: 'book 1', parent: 'pupil 1'},
    {id: 'book 2', description: 'book ...', parent: 'pupil 1'},
    {id: 'book 3', description: 'book 3', parent: 'pupil 1'},
    {id: 'book 460', description: 'book 459', parent: 'pupil 154'},
    {id: 'book 461', description: 'book ...', parent: 'pupil 154'},
    {id: 'book 462', description: 'book 459', parent: 'pupil 154'},
    {id: 'g 460', description: 'book 459', parent: 'book 1'},
    {id: 'g 461', description: 'book ...', parent: 'book 1'},
    {id: 'g 462', description: 'book 459', parent: 'book 1'},
    {id: 'h 460', description: 'book 459', parent: 'book 462'},
    {id: 'h 461', description: 'book ...', parent: 'book 462'},
    {id: 'h 462', description: 'book 459', parent: 'book 462'},
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CollapsibleTreeComponent,
        LinkVisualComponent,
        NodeVisualComponent,
        ZoomableDirective],
      providers: [D3Service]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleTreeComponent);
    component = fixture.componentInstance;
    component.data = data4;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
