import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersGaussianCovariateCorrelationComponent } from './parameters-gaussian-covariate-correlation.component';

describe('ParametersGaussianCovariateCorrelationComponent', () => {
  let component: ParametersGaussianCovariateCorrelationComponent;
  let fixture: ComponentFixture<ParametersGaussianCovariateCorrelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersGaussianCovariateCorrelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersGaussianCovariateCorrelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
