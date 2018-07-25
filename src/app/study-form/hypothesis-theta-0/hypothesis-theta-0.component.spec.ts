import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisTheta0Component } from './hypothesis-theta-0.component';

describe('HypothesisTheta0Component', () => {
  let component: HypothesisTheta0Component;
  let fixture: ComponentFixture<HypothesisTheta0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypothesisTheta0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisTheta0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
