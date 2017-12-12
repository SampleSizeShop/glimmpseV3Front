import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsPowerCurveAxesComponent } from './optional-specs-power-curve-axes.component';

describe('OptionalSpecsPowerCurveAxesComponent', () => {
  let component: OptionalSpecsPowerCurveAxesComponent;
  let fixture: ComponentFixture<OptionalSpecsPowerCurveAxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsPowerCurveAxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsPowerCurveAxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
