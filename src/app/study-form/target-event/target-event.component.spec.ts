import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetEventComponent } from './target-event.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {MockBackend} from '@angular/http/testing';
import {HttpClient} from '@angular/common/http';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NavigationService} from '../../shared/services/navigation.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

describe('TargetEventComponent_targetEvent_REJECTION', () => {
  let component: TargetEventComponent;
  let fixture: ComponentFixture<TargetEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ TargetEventComponent ],
      providers: [
        StudyService,
        { provide: HttpClient, useClass: MockBackend },
        NavigationService,
        NgbModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEventComponent);
    component = fixture.componentInstance;
    component.selectRejectionOnly();
    fixture.detectChanges();
  });

  it('should be created with rejection selected', () => {
    expect(component).toBeTruthy();
    component.isRejection()
  });

  it('select RejectionOnly should set targetEvent to rejection', () => {
  });

  it('should show rejection only description when rejection is selected', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('#rejectiondesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should not show CIWidth description when rejection is selected', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('#ciwidthdesc'));
    expect(!desc);
  });

  it('should not show WAVR description when rejection is selected', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('#wavrdesc'));
    expect(!desc);
  });

  it('should give Rejection button active class if Rejection Mode is selected', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('rejectionbtn')
  });
});

describe('TargetEventComponent_targetEvent_CIWIDTH', () => {
  let component: TargetEventComponent;
  let fixture: ComponentFixture<TargetEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TargetEventComponent],
      providers: [
        StudyService,
        {provide: HttpClient, useClass: MockBackend},
        NavigationService,
        NgbModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEventComponent);
    component = fixture.componentInstance;
    component.selectCIWidth();
    fixture.detectChanges();
  });

  it('select CI Width should set targetEvent to CI width', () => {
    expect(component.isCIWidth())
  });

  it('should show ciwidth description when ci width is selected', () => {
    component.selectCIWidth();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#ciwidthdesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should not show Rejection description when ci width is selected', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('#rejectiondesc'));
    expect(!desc);
  });

  it('should not show WAVR description when ci width is selected', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('#wavrdesc'));
    expect(!desc);
  });

  it('should give CI width button active class if CI Width Mode is selected', () => {
    component.selectCIWidth();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('ciwidthbtn')
  });
});

describe('TargetEventComponent_targetEvent_WAVR', () => {
  let component: TargetEventComponent;
  let fixture: ComponentFixture<TargetEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TargetEventComponent],
      providers: [
        StudyService,
        {provide: HttpClient, useClass: MockBackend},
        NavigationService,
        NgbModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetEventComponent);
    component = fixture.componentInstance;
    component.selectWAVR();
    fixture.detectChanges();
  });

  it('select WAVR should set targetEvent to WAVR', () => {
    expect(component.isWAVR())
  });

  it('should show WAVR description when WAVR is selected', () => {
    component.selectWAVR();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#wavrdesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should not show Rejection description when WAVR is selected', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('#rejectiondesc'));
    expect(!desc);
  });

  it('should not show CI width description when WAVR is selected', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('#ciwidthdesc'));
    expect(!desc);
  });

  it('should give WAVR button active class if WAVR is selected', () => {
    component.selectWAVR();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('wavrbtn')
  });
});
