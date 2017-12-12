import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsPowerCurveChoiceComponent } from './optional-specs-power-curve-choice.component';

describe('OptionalSpecsPowerCurveChoiceComponent', () => {
  let component: OptionalSpecsPowerCurveChoiceComponent;
  let fixture: ComponentFixture<OptionalSpecsPowerCurveChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsPowerCurveChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsPowerCurveChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
