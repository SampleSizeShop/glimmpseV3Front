import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersStandardDeviationComponent } from './parameters-standard-deviation.component';

describe('ParametersStandardDeviationComponent', () => {
  let component: ParametersStandardDeviationComponent;
  let fixture: ComponentFixture<ParametersStandardDeviationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersStandardDeviationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersStandardDeviationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
