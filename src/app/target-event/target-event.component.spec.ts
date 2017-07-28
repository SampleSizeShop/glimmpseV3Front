import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetEventComponent } from './target-event.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

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

  it('should show rejection only description when rejection is selected', () => {
    component.selectRejectionOnly();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#rejectiondesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should not show CIWidth description when rejection is selected', () => {
    component.selectRejectionOnly();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#ciwidthdesc'));
    expect(!desc);
  });

  it('should not show WAVR description when rejection is selected', () => {
    component.selectRejectionOnly();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#wavrdesc'));
    expect(!desc);
  });

  it('should show ciwidth description when ci width is selected', () => {
    component.selectCIWidth();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#ciwidthdesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should not show Rejection description when rejection is selected', () => {
    component.selectCIWidth();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#rejectiondesc'));
    expect(!desc);
  });

  it('should not show WAVR description when ci width is selected', () => {
    component.selectCIWidth();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#wavrdesc'));
    expect(!desc);
  });

  it('should show WAVR description when WAVR is selected', () => {
    component.selectWAVR();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#wavrdesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should not show Rejection description when WAVR is selected', () => {
    component.selectWAVR();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#rejectiondesc'));
    expect(!desc);
  });

  it('should not show CI width description when WAVR is selected', () => {
    component.selectWAVR();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#ciwidthdesc'));
    expect(!desc);
  });

  it('should give Rejection button active class if Rejection Mode is selected', () => {
    component.selectRejectionOnly();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('rejectionbtn')
  });

  it('should give CI width button active class if CI Width Mode is selected', () => {
    component.selectCIWidth();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('ciwidthbtn')
  });

  it('should give WAVR button active class if WAVR is selected', () => {
    component.selectWAVR();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('wavrbtn')
  });

  it('should be created with rejection selected', () => {
    expect(component).toBeTruthy();
    component.isRejection()
  });
});
