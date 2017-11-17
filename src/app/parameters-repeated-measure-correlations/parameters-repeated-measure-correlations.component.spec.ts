import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersRepeatedMeasureCorrelationsComponent } from './parameters-repeated-measure-correlations.component';

describe('ParametersRepeatedMeasureCorrelationsComponent', () => {
  let component: ParametersRepeatedMeasureCorrelationsComponent;
  let fixture: ComponentFixture<ParametersRepeatedMeasureCorrelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersRepeatedMeasureCorrelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersRepeatedMeasureCorrelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
