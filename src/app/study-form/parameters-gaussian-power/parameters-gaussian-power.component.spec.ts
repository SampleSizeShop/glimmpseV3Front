import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersGaussianPowerComponent } from './parameters-gaussian-power.component';

describe('ParametersGaussianPowerComponent', () => {
  let component: ParametersGaussianPowerComponent;
  let fixture: ComponentFixture<ParametersGaussianPowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersGaussianPowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersGaussianPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
