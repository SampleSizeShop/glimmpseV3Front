import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersRepeatedMeasureOutcomeCorrelationsComponent } from './parameters-repeated-measure-outcome-correlations.component';

describe('ParametersRepeatedMeasureOutcomeCorrelationsComponent', () => {
  let component: ParametersRepeatedMeasureOutcomeCorrelationsComponent;
  let fixture: ComponentFixture<ParametersRepeatedMeasureOutcomeCorrelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersRepeatedMeasureOutcomeCorrelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersRepeatedMeasureOutcomeCorrelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
