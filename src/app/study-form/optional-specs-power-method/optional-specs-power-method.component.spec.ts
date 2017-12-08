import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsPowerMethodComponent } from './optional-specs-power-method.component';

describe('OptionalSpecsPowerMethodComponent', () => {
  let component: OptionalSpecsPowerMethodComponent;
  let fixture: ComponentFixture<OptionalSpecsPowerMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsPowerMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsPowerMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
