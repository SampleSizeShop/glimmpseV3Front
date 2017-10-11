import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisWithinComponent } from './hypothesis-within.component';

describe('HypothesisWithinComponent', () => {
  let component: HypothesisWithinComponent;
  let fixture: ComponentFixture<HypothesisWithinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypothesisWithinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisWithinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
