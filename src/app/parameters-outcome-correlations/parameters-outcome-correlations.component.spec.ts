import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersOutcomeCorrelationsComponent } from './parameters-outcome-correlations.component';
import {Component} from "@angular/core";
import {ISUFactors} from "../shared/ISUFactors";

describe('ParametersOutcomeCorrelationsComponent', () => {
  let component: ParametersOutcomeCorrelationsComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  @Component({
    selector: 'app-test-component-wrapper',
    template: '<app-parameters-outcome-correlations [isuFactors]="isuFactors"></app-parameters-outcome-correlations>'
  })
  class TestWrapperComponent {
    isuFactors = new ISUFactors();
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersOutcomeCorrelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersOutcomeCorrelationsComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
