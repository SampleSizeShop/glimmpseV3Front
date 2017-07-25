import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModeComponent } from './user-mode.component';

describe('UserModeComponent', () => {
  let component: UserModeComponent;
  let fixture: ComponentFixture<UserModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
