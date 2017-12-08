import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersVarianceScaleFactorsComponent } from './parameters-variance-scale-factors.component';

describe('ParametersVarianceScaleFactorsComponent', () => {
  let component: ParametersVarianceScaleFactorsComponent;
  let fixture: ComponentFixture<ParametersVarianceScaleFactorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersVarianceScaleFactorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersVarianceScaleFactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
