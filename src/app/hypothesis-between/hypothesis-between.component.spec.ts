import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisBetweenComponent } from './hypothesis-between.component';

describe('HypothesisBetweenComponent', () => {
  let component: HypothesisBetweenComponent;
  let fixture: ComponentFixture<HypothesisBetweenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypothesisBetweenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisBetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
