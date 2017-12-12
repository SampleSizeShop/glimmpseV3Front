import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsPowerCurveDataSeriesComponent } from './optional-specs-power-curve-data-series.component';

describe('OptionalSpecsPowerCurveDataSeriesComponent', () => {
  let component: OptionalSpecsPowerCurveDataSeriesComponent;
  let fixture: ComponentFixture<OptionalSpecsPowerCurveDataSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsPowerCurveDataSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsPowerCurveDataSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
