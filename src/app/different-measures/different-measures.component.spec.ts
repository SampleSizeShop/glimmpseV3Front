import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentMeasuresComponent } from './different-measures.component';

describe('DifferentMeasuresComponent', () => {
  let component: DifferentMeasuresComponent;
  let fixture: ComponentFixture<DifferentMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifferentMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferentMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
