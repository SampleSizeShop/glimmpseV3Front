import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelationMatrixComponent } from './correlation-matrix.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CorrelationMatrixService} from '../shared/correlationMatrix.service';

describe('CorrelationMatrixComponent', () => {
  let component: CorrelationMatrixComponent;
  let fixture: ComponentFixture<CorrelationMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ CorrelationMatrixComponent ],
      providers: [ CorrelationMatrixService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelationMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
