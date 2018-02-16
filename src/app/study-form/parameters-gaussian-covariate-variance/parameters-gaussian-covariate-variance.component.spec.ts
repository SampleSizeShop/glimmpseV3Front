import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersGaussianCovariateVarianceComponent } from './parameters-gaussian-covariate-variance.component';

describe('ParametersGaussianCovariateVarianceComponent', () => {
  let component: ParametersGaussianCovariateVarianceComponent;
  let fixture: ComponentFixture<ParametersGaussianCovariateVarianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersGaussianCovariateVarianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersGaussianCovariateVarianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
