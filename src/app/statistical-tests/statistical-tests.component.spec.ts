import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalTestsComponent } from './statistical-tests.component';

describe('StatisticalTestsComponent', () => {
  let component: StatisticalTestsComponent;
  let fixture: ComponentFixture<StatisticalTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalTestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
