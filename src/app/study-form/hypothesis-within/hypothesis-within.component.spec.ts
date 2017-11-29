import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisWithinComponent } from './hypothesis-within.component';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {StudyService} from '../../shared/study.service';

describe('HypothesisWithinComponent', () => {
  let component: HypothesisWithinComponent;
  let fixture: ComponentFixture<HypothesisWithinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HypothesisWithinComponent ],
      providers: [ StudyService, {provide: Http, useClass: MockBackend} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisWithinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
