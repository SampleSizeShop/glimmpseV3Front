import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetEventComponent } from './target-event.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';

describe('TargetEventComponent', () => {
  let component: TargetEventComponent;
  let fixture: ComponentFixture<TargetEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ TargetEventComponent ],
      providers: [ StudyService, { provide: Http, useClass: MockBackend } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
