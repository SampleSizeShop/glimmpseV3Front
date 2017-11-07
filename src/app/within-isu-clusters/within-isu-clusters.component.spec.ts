import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinIsuClustersComponent } from './within-isu-clusters.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {NavigationService} from '../shared/navigation.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('WithinIsuClustersComponent', () => {
  let component: WithinIsuClustersComponent;
  let fixture: ComponentFixture<WithinIsuClustersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ WithinIsuClustersComponent ],
      providers: [ StudyService,  { provide: Http, useClass: MockBackend}, NavigationService]
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

  it('should not show the Element form when the user chooses to add clustering', () => {
    component.dontincludeClusters();
    fixture.detectChanges();
    const form: DebugElement = fixture.debugElement.query(By.css('#elementName'));
    expect(form).toBeFalsy();
  });

  it('should show the Element form when the user chooses to add clustering', () => {
    component.includeClusters();
    fixture.detectChanges();
    const form: DebugElement = fixture.debugElement.query(By.css('#elementName'));
    const el = form.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should show the cluster level form when the user clicks next after naming their cluster.', () => {
    component.includeClusters();
    component.elementForm.get('elementName').setValue('Name')
    component.internallyNavigate('NEXT');

    fixture.detectChanges();
    const form: DebugElement = fixture.debugElement.query(By.css('#clusterLevelForm'));
    const el = form.nativeElement;
    expect(el).toBeTruthy();
  })

  it('should add a level when a user clicks the add button if value and noElements are both supplied', () => {
    component.includeClusters();
    component.elementForm.get('elementName').setValue('Name')
    component.internallyNavigate('NEXT');
    component.clusterLevelForm.get('levelName').setValue('levelName');
    component.clusterLevelForm.get('noElements').setValue('noElements');
    component.addLevel();
    fixture.detectChanges();
    expect(component.levels.length).toBe(1);
  });

  it('should not add a level when a user clicks the add button if value is not supplied', () => {
    component.includeClusters();
    component.elementForm.get('elementName').setValue('Name')
    component.internallyNavigate('NEXT');
    component.clusterLevelForm.get('noElements').setValue('noElements');
    component.addLevel();
    fixture.detectChanges();
    expect(component.levels.length).toBe(0);
  });

  it('should not add a level when a user clicks the add button if noElements is not supplied', () => {
    component.includeClusters();
    component.elementForm.get('elementName').setValue('Name')
    component.internallyNavigate('NEXT');
    component.clusterLevelForm.get('levelName').setValue('levelName');
    component.addLevel();
    fixture.detectChanges();
    expect(component.levels.length).toBe(0);
  });

  it('should add the cluster when user clicks next after specifying its levels', () => {
    component.includeClusters();
    component.elementForm.get('elementName').setValue('Name')
    fixture.detectChanges();
    component.internallyNavigate('NEXT');
    component.clusterLevelForm.get('levelName').setValue('levelName');
    component.clusterLevelForm.get('noElements').setValue(1);
    component.addLevel();
    component.internallyNavigate('NEXT');
    fixture.detectChanges();

    expect(component.cluster.elementName).toBe('Name');
    expect(component.cluster.levels.length).toBe(1);

    const level = component.cluster.levels.pop();
    expect(level.levelName).toBe('levelName')
    expect(level.noElements).toBe(1)
  });
});
