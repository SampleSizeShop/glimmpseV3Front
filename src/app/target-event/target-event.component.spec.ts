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

  it('select RejectionOnly should ste targetEvent to rejection', () => {
    component.selectRejectionOnly();
    expect(component.isRejection())
  });

  it('select CI Width should ste targetEvent to CI width', () => {
    component.selectCIWidth();
    expect(component.isCIWidth())
  });

  it('select WAVR should ste targetEvent to WAVR', () => {
    component.selectCIWidth();
    expect(component.isCIWidth())
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created with rejection selected', () => {
    expect(component).toBeTruthy();
    component.isRejection()
  });
});
