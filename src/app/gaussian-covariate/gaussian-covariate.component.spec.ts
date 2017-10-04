import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussianCovariateComponent } from './gaussian-covariate.component';

describe('GaussianCovariateComponent', () => {
  let component: GaussianCovariateComponent;
  let fixture: ComponentFixture<GaussianCovariateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaussianCovariateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaussianCovariateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
