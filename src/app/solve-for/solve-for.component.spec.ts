import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveForComponent } from './solve-for.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('SolveForComponent', () => {
  let component: SolveForComponent;
  let fixture: ComponentFixture<SolveForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ SolveForComponent ],
      providers: [ StudyService, { provide: Http, useClass: MockBackend } ]
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
