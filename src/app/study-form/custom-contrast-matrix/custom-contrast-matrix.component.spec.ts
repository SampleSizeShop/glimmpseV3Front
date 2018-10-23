import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomContrastMatrixComponent } from './custom-contrast-matrix.component';

describe('CustomMatrixComponent', () => {
  let component: CustomContrastMatrixComponent;
  let fixture: ComponentFixture<CustomContrastMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomContrastMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomContrastMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
