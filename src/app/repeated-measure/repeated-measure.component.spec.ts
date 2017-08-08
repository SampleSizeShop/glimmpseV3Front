import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedMeasureComponent } from './repeated-measure.component';

describe('RepeatedMeasureComponent', () => {
  let component: RepeatedMeasureComponent;
  let fixture: ComponentFixture<RepeatedMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatedMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatedMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
