import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsCiChoiceComponent } from './optional-specs-ci-choice.component';

describe('OptionalSpecsCiChoiceComponent', () => {
  let component: OptionalSpecsCiChoiceComponent;
  let fixture: ComponentFixture<OptionalSpecsCiChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsCiChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsCiChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
