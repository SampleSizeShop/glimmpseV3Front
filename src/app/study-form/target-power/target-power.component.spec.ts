import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetPowerComponent } from './target-power.component';

describe('TargetPowerComponent', () => {
  let component: TargetPowerComponent;
  let fixture: ComponentFixture<TargetPowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetPowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
