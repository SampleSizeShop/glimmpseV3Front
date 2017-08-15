import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedMeasureComponent } from './repeated-measure.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {RepeatedMeasureService} from '../shared/repeatedMeasure.service';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('RepeatedMeasureComponent', () => {
  let component: RepeatedMeasureComponent;
  let fixture: ComponentFixture<RepeatedMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ RepeatedMeasureComponent, CorrelationMatrixComponent ],
      providers: [ RepeatedMeasureService, RepeatedMeasure ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatedMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
