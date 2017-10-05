import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisEffectChoiceComponent } from './hypothesis-effect-choice.component';

describe('HypothesisEffectChoiceComponent', () => {
  let component: HypothesisEffectChoiceComponent;
  let fixture: ComponentFixture<HypothesisEffectChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypothesisEffectChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisEffectChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
