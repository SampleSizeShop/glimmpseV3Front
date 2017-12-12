import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsCiLowerTailComponent } from './optional-specs-ci-lower-tail.component';

describe('OptionalSpecsCiLowerTailComponent', () => {
  let component: OptionalSpecsCiLowerTailComponent;
  let fixture: ComponentFixture<OptionalSpecsCiLowerTailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsCiLowerTailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsCiLowerTailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
