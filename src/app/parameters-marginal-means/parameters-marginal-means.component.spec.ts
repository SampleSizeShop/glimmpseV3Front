import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersMarginalMeansComponent } from './parameters-marginal-means.component';

describe('ParametersMarginalMeansComponent', () => {
  let component: ParametersMarginalMeansComponent;
  let fixture: ComponentFixture<ParametersMarginalMeansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersMarginalMeansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersMarginalMeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
