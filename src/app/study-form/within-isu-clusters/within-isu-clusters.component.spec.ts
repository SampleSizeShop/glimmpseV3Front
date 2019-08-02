import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinIsuClustersComponent } from './within-isu-clusters.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {NavigationService} from '../../shared/navigation.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NGXLogger} from 'ngx-logger';
import {CollapsibleTreeComponent} from '../../d3/visuals/collapsible-tree/collapsible-tree.component';
import {NodeVisualComponent} from '../../d3/visuals/shared/node-visual/node-visual.component';
import {LinkVisualComponent} from '../../d3/visuals/shared/link-visual/link-visual.component';
import {ZoomableDirective} from '../../d3/directives/zoomable.directive';
import {D3Service} from "../../d3/d3.service";

describe('WithinIsuClustersComponent', () => {
  let component: WithinIsuClustersComponent;
  let fixture: ComponentFixture<WithinIsuClustersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, BrowserAnimationsModule
      ],
      declarations: [
        WithinIsuClustersComponent,
        CollapsibleTreeComponent,
        LinkVisualComponent,
        NodeVisualComponent,
        ZoomableDirective],
      providers: [ StudyService,
                  NgbModal,
                  NGXLogger,
                  { provide: HttpClient, useClass: MockBackend},
                  D3Service,
                  NavigationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinIsuClustersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the Element form when the user chooses to add clustering', () => {
    component.includeClusters();
    fixture.detectChanges();
    const form: DebugElement = fixture.debugElement.query(By.css('#name'));
    const el = form.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should show the cluster level form when the user clicks next after naming their cluster.', () => {
    component.includeClusters();
    component.elementForm.get('name').setValue('Name')
    component.setStage(component.stages.LEVELS);

    fixture.detectChanges();
    const form: DebugElement = fixture.debugElement.query(By.css('#clusterLevelForm'));
    const el = form.nativeElement;
    expect(el).toBeTruthy();
  })

  it('should add a level when a user clicks the add button if value and noElements are both supplied', () => {
    component.includeClusters();
    component.elementForm.get('name').setValue('Name')
    component.setStage(component.stages.LEVELS);
    component.clusterLevelForm.get('levelName').setValue('levelName');
    component.clusterLevelForm.get('noElements').setValue('noElements');
    component.addLevel();
    fixture.detectChanges();
    expect(component.levels.length).toBe(1);
  });

  it('should not add a level when a user clicks the add button if value is not supplied', () => {
    component.includeClusters();
    component.elementForm.get('name').setValue('Name')
    component.setStage(component.stages.LEVELS);
    component.clusterLevelForm.get('noElements').setValue('noElements');
    component.addLevel();
    fixture.detectChanges();
    expect(component.levels.length).toBe(0);
  });

  it('should not add a level when a user clicks the add button if noElements is not supplied', () => {
    component.includeClusters();
    component.elementForm.get('name').setValue('Name')
    component.setStage(component.stages.LEVELS);
    component.clusterLevelForm.get('levelName').setValue('levelName');
    component.clusterLevelForm.get('noElements').setValue('');
    component.addLevel();
    fixture.detectChanges();
    expect(component.levels.length).toBe(0);
  });

  it('should add the cluster when user clicks next after specifying its levels', () => {
    component.includeClusters();
    component.elementForm.get('name').setValue('Name')
    fixture.detectChanges();
    component.addISU();
    component.clusterLevelForm.get('levelName').setValue('levelName');
    component.clusterLevelForm.get('noElements').setValue(2);
    component.addLevel();
    component.addCluster();
    fixture.detectChanges();

    expect(component.cluster.name).toBe('Name');
    expect(component.cluster.levels.length).toBe(1);

    const level = component.cluster.levels.pop();
    expect(level.levelName).toBe('levelName')
    expect(level.noElements).toBe(2)
  });
});
