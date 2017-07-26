import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetEventComponent } from './target-event.component';

describe('TargetEventComponent', () => {
  let component: TargetEventComponent;
  let fixture: ComponentFixture<TargetEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
