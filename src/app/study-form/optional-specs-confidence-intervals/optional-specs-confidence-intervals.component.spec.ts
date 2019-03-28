import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsConfidenceIntervalsComponent } from './optional-specs-confidence-intervals.component';
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

describe('WithinIsuRepeatedMeasuresComponent', () => {
  let component: OptionalSpecsConfidenceIntervalsComponent;
  let fixture: ComponentFixture<OptionalSpecsConfidenceIntervalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ OptionalSpecsConfidenceIntervalsComponent ],
      providers: [
        StudyService,
        NGXLogger,
        {provide: HttpClient, useClass: MockBackend},
        NavigationService,
        NgbModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsConfidenceIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the dimension form when the user chooses to add a repeated measure', () => {
    component.includeRepeatedMeasures();
    fixture.detectChanges();
    component.stage = component.stages.DIMENSIONS;
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#dimension'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the type form when the user clicks next after defining the name', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.setStage(component.stages.TYPE);
    fixture.detectChanges();
    component.stage = component.stages.TYPE;
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#type'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the repeats form when the user clicks next after defining the type', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.typeForm.get('type').setValue('Type1');
    component.setStage(component.stages.TYPE);
    component.stage = component.stages.TYPE;
    fixture.detectChanges();
    component.setStage(component.stages.REPEATS);
    component.stage = component.stages.REPEATS;
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#repeats'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the valueNames form when the user clicks next after defining the number of repeats', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.typeForm.get('type').setValue('Type1');
    component.setStage(component.stages.SPACING);
    component.stage = component.stages.SPACING;
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#spacinginput'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should add a repeated measure to the study when the user clicks next after defining the valueNames', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.typeForm.get('type').setValue('Type1');
    component.spacingValues.push('1');
    component.setStage(component.stages.SPACING);
    component.stage = component.stages.SPACING;
    fixture.detectChanges();
    component.addRepeatedMeasure();
    fixture.detectChanges();
    component.stage = component.stages.INFO;
    fixture.detectChanges();
    expect(component.repeatedMeasures.length).toBe(1);
    const desc: DebugElement = fixture.debugElement.query(By.css('#nextrepmeasure'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should add a load all forms with properties of a repeated measure when edit measure is selected.', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.typeForm.get('type').setValue('Type1');
    component.spacingValues.push('1');
    component.addRepeatedMeasure();
    expect(component.repeatedMeasures.length).toBe(1);
    component.editRepeatedMeasure(component.repeatedMeasures[0]);
    fixture.detectChanges();
    component.setStage(component.stages.DIMENSIONS);
    fixture.detectChanges();
    component.stage = component.stages.DIMENSIONS;
    fixture.detectChanges();
    expect(component.dimensionForm.get('dimension').value).toBe('Measure1');
  });
});
