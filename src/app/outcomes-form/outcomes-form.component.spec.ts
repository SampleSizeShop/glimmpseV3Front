import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcomesFormComponent } from './outcomes-form.component';

describe('OutcomesFormComponent', () => {
  let component: OutcomesFormComponent;
  let fixture: ComponentFixture<OutcomesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutcomesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcomesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
