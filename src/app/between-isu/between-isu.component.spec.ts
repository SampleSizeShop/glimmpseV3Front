import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuComponent } from './between-isu.component';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('BetweenIsuComponent', () => {
  let component: BetweenIsuComponent;
  let fixture: ComponentFixture<BetweenIsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ BetweenIsuComponent ],
      providers: [StudyService, { provide: Http, useClass: MockBackend }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenIsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
