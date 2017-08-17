import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitinIsuComponent } from './within-isu.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {RepeatedMeasureComponent} from '../repeated-measure/repeated-measure.component';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MathJaxDirective} from '../mathjax/mathjax.directive';
import {DifferentMeasuresComponent} from '../different-measures/different-measures.component';

describe('WitinIsuComponent', () => {
  let component: WitinIsuComponent;
  let fixture: ComponentFixture<WitinIsuComponent>;
  let measure: RepeatedMeasure;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ WitinIsuComponent, RepeatedMeasureComponent, CorrelationMatrixComponent, MathJaxDirective, DifferentMeasuresComponent ],
      providers: [ RepeatedMeasure, StudyService, { provide: Http, useClass: MockBackend } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitinIsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    measure = new RepeatedMeasure();
    measure.name = 'NAME';
    measure.noRepeats = 2;
    measure.spacing = 2;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  })

  it('Should remove the selected repeated measure when deleteRepeatedMeasure is called', () => {
    component.repeatedMeasures.push(measure);
    expect(component.repeatedMeasures.length).toEqual(1);
    component.deleteRepeatedMeasure(measure);
    expect(component.repeatedMeasures.length).toEqual(0);
  });

  it('Should set components repeated measure to one selected and editingRepeatedMeasure true when editRepeartedMeasure is called.', () => {
    component.repeatedMeasures.push(measure);
    component.editRepeatedMeasure(measure);
    expect(component.editingRepeatedMeasure).toEqual(true);
    expect(component.repeatedMeasures.length).toEqual(0)
    expect(component.repeatedMeasure).toEqual(measure);
  });

  it('Should add a new repeated measure and set editingRepeatedMeasure to true whe addRepeatedMeasure is called', () => {
    component.addRepeatedMeasure();
    expect(component.editingRepeatedMeasure).toEqual(true);
    expect(component.repeatedMeasures.length).toEqual(0)
    expect(component.repeatedMeasure.noRepeats).toBeFalsy();
    expect(component.repeatedMeasure.name).toBeFalsy();
    expect(component.repeatedMeasure.spacing).toBeFalsy();
  });

});
