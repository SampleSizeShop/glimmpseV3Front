import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatrixComponent } from './custom-matrix.component';

describe('CustomMatrixComponent', () => {
  let component: CustomMatrixComponent;
  let fixture: ComponentFixture<CustomMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
