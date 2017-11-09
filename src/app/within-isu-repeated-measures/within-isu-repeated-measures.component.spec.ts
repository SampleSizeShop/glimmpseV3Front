import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinIsuRepeatedMeasuresComponent } from './within-isu-repeated-measures.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {NavigationService} from '../shared/navigation.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('WithinIsuRepeatedMeasuresComponent', () => {
  let component: WithinIsuRepeatedMeasuresComponent;
  let fixture: ComponentFixture<WithinIsuRepeatedMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ WithinIsuRepeatedMeasuresComponent ],
      providers: [StudyService, {provide: Http, useClass: MockBackend}, NavigationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinIsuRepeatedMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the dimension form when the user chooses to add a repeated measure', () => {
    component.includeRepeatedMeasures();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#dimension'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the type form when the user clicks next after defining the name', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#type'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the repeats form when the user clicks next after defining the type', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.typeForm.get('type').setValue('Type1');
    component.setStage(1);
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#repeats'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the valueNames form when the user clicks next after defining the number of repeats', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.typeForm.get('type').setValue('Type1');
    component.setStage(2);
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#spacing'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should add a repeated measure to the study when the user clicks next after defining the valueNames', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.typeForm.get('type').setValue('Type1');
    component.spacingValues.push('1');
    component.setStage(3);
    component.internallyNavigate('NEXT');
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
    component.setStage(3);
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    expect(component.repeatedMeasures.length).toBe(1);
    const desc: DebugElement = fixture.debugElement.query(By.css('#nextrepmeasure'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy()
    component.editRepeatedMeasure(component.repeatedMeasures[0]);
    fixture.detectChanges();
    expect(component.dimensionForm.get('dimension').value).toBe('Measure1');
  });
});
