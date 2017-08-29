import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinIsuRepeatedMeasuresComponent } from './within-isu-repeated-measures.component';

describe('WithinIsuRepeatedMeasuresComponent', () => {
  let component: WithinIsuRepeatedMeasuresComponent;
  let fixture: ComponentFixture<WithinIsuRepeatedMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithinIsuRepeatedMeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinIsuRepeatedMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
