import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsCiUpperTailComponent } from './optional-specs-ci-upper-tail.component';

describe('OptionalSpecsCiUpperTailComponent', () => {
  let component: OptionalSpecsCiUpperTailComponent;
  let fixture: ComponentFixture<OptionalSpecsCiUpperTailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsCiUpperTailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsCiUpperTailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
