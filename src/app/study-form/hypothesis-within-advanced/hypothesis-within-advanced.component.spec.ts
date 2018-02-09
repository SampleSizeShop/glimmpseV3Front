import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisWithinAdvancedComponent } from './hypothesis-within-advanced.component';

describe('HypothesisWithinAdvancedComponent', () => {
  let component: HypothesisWithinAdvancedComponent;
  let fixture: ComponentFixture<HypothesisWithinAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypothesisWithinAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisWithinAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
