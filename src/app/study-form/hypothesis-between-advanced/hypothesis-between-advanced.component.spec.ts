import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisBetweenAdvancedComponent } from './hypothesis-between-advanced.component';

describe('HypothesisBetweenAdvancedComponent', () => {
  let component: HypothesisBetweenAdvancedComponent;
  let fixture: ComponentFixture<HypothesisBetweenAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypothesisBetweenAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisBetweenAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
