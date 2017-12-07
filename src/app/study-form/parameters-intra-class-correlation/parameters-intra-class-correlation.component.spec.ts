import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersIntraClassCorrelationComponent } from './parameters-intra-class-correlation.component';

describe('ParametersIntraClassCorrelationComponent', () => {
  let component: ParametersIntraClassCorrelationComponent;
  let fixture: ComponentFixture<ParametersIntraClassCorrelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersIntraClassCorrelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersIntraClassCorrelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
