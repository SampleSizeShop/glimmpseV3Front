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

  it('Should populate correlation matrix with a diagonal matrix of 1s if size is set',() => {
    component.size = 2;
    component._initializeProperties();
    expect(component.uMatrix.values.get([0, 0])).toEqual(1);
    expect(component.uMatrix.values.get([0, 1])).toEqual(0);
    expect(component.uMatrix.values.get([1, 0])).toEqual(0);
    expect(component.uMatrix.values.get([1, 1])).toEqual(1);
  });

  it('Should set size to size of correlation matrix if size = -1', () => {
    component.uMatrix.populateDefaultValues(3);
    component.size = -1;
    component._initializeProperties();
    expect(component.uMatrix.values.size()[0]).toEqual(3);
  })

  it('Should create the array of controls addressed to each matrix element', () => {
    component.size = 2;
    component._initializeProperties();
    component._defineFormControls();
    expect(Object.keys(component.controlDefs).length).toEqual(4);
  } )

  it('Should create the array of values corresponding to controls, addressed by name to each matrix element', () => {
    component.size = 2;
    component._initializeProperties();
    component._defineFormControls();
    expect(Object.keys(component.controlDefs)).toEqual(Object.keys(component.values));
  } )
});
