import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinIsuFactorsComponent } from './within-isu-factors.component';

describe('WithinIsuFactorsComponent', () => {
  let component: WithinIsuFactorsComponent;
  let fixture: ComponentFixture<WithinIsuFactorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithinIsuFactorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinIsuFactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
