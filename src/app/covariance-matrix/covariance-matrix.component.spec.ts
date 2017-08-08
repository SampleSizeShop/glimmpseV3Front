import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovarianceMatrixComponent } from './covariance-matrix.component';

describe('CovarianceMatrixComponent', () => {
  let component: CovarianceMatrixComponent;
  let fixture: ComponentFixture<CovarianceMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovarianceMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovarianceMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
