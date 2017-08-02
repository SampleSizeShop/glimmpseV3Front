import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOneErrorComponent } from './type-one-error.component';

describe('TypeOneErrorComponent', () => {
  let component: TypeOneErrorComponent;
  let fixture: ComponentFixture<TypeOneErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOneErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOneErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
