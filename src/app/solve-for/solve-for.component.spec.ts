import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveForComponent } from './solve-for.component';

describe('SolveForComponent', () => {
  let component: SolveForComponent;
  let fixture: ComponentFixture<SolveForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolveForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
