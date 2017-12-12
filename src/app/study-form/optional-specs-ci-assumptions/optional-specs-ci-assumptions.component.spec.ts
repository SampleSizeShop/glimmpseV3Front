import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsCiAssumptionsComponent } from './optional-specs-ci-assumptions.component';

describe('OptionalSpecsCiAssumptionsComponent', () => {
  let component: OptionalSpecsCiAssumptionsComponent;
  let fixture: ComponentFixture<OptionalSpecsCiAssumptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsCiAssumptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsCiAssumptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
