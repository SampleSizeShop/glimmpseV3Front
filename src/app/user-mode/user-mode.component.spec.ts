import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModeComponent } from './user-mode.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';

describe('UserModeComponent', () => {
  let component: UserModeComponent;
  let fixture: ComponentFixture<UserModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ UserModeComponent ],
      providers: [ StudyService, { provide: Http, useClass: MockBackend } ]
    })
    .compileComponents();
  }));

  it('select Guided should select guided mode', () => {
    component.selectGuided();
    expect(component.guided)
  });

  it('select Flexible should select guided mode', () => {
    component.selectFlex();
    expect(!component.guided)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
