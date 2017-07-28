import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { SolveForComponent } from './solve-for.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

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

  it('select Power should select power mode', () => {
    component.selectPower();
    fixture.detectChanges();
    expect(component.isPower());
  });

  it('select Sample Size should select sample size mode', () => {
    component.selectSampleSize();
    fixture.detectChanges();
    expect(!component.isSampleSize());
  });

  it('should show sample size description when solve for power is selected', () => {
    component.selectPower();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#samplesizedesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should show power description when solve for sample size is selected', () => {
    component.selectSampleSize();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#powerdesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should not show power description when Power is selected', () => {
    component.selectPower();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#powerdesc'));
    expect(!desc);
  });

  it('should not show sample size mode description when sample size is selected', () => {
    component.selectSampleSize();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#samplesizedesc'));
    expect(!desc);
  });

  it('should show the power button when target event is rejection', () => {
    spyOn(component, 'isRejection').and.returnValue(true);
    spyOn(component, 'isCIWidth').and.returnValue(false);
    spyOn(component, 'isWAVR').and.returnValue(false);

    component.selectPower();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('#powerbtn'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('powerbtn')
  });

  it('should show the probability button when target event is ci width', () => {
    spyOn(component, 'isRejection').and.returnValue(false);
    spyOn(component, 'isCIWidth').and.returnValue(true);
    spyOn(component, 'isWAVR').and.returnValue(false);

    component.selectPower();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('probabilitybtn')
  });

  it('should show the probability button when target event is ci width', () => {
    spyOn(component, 'isRejection').and.returnValue(false);
    spyOn(component, 'isCIWidth').and.returnValue(false);
    spyOn(component, 'isWAVR').and.returnValue(true);

    component.selectPower();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('probabilitybtn')
  });

  it('should show the sample size button when target event is power', () => {
    spyOn(component, 'isRejection').and.returnValue(true);
    spyOn(component, 'isCIWidth').and.returnValue(false);
    spyOn(component, 'isWAVR').and.returnValue(false);

    component.selectSampleSize();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('samplesizebtn')
  });

  it('should show the sample size button when target event is ci width', () => {
    spyOn(component, 'isRejection').and.returnValue(false);
    spyOn(component, 'isCIWidth').and.returnValue(true);
    spyOn(component, 'isWAVR').and.returnValue(false);

    component.selectSampleSize();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('samplesizebtn')
  });

  it('should show the sample size button when target event is WAVR', () => {
    spyOn(component, 'isRejection').and.returnValue(false);
    spyOn(component, 'isCIWidth').and.returnValue(true);
    spyOn(component, 'isWAVR').and.returnValue(false);

    component.selectSampleSize();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('samplesizebtn')
  });

  it('should show the sample size input when target event is rejection', () => {
    spyOn(component, 'isRejection').and.returnValue(true);
    spyOn(component, 'isCIWidth').and.returnValue(false);
    spyOn(component, 'isWAVR').and.returnValue(false);

    component.selectPower();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('#samplesizeinput'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy()
  });

  it('should show the sample size input when target event is ci width', () => {
    spyOn(component, 'isRejection').and.returnValue(false);
    spyOn(component, 'isCIWidth').and.returnValue(true);
    spyOn(component, 'isWAVR').and.returnValue(false);

    component.selectPower();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('#samplesizeinput'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy()
  });

  it('should show the sample size input when target event is WAVR', () => {
    spyOn(component, 'isRejection').and.returnValue(false);
    spyOn(component, 'isCIWidth').and.returnValue(false);
    spyOn(component, 'isWAVR').and.returnValue(true);

    component.selectPower();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('#samplesizeinput'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy()
  });

  it('should show the power input and correct power label input when target event is rejection', () => {
    spyOn(component, 'isRejection').and.returnValue(true);
    spyOn(component, 'isCIWidth').and.returnValue(false);
    spyOn(component, 'isWAVR').and.returnValue(false);

    component.selectSampleSize();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('#powerinput'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy()

    const lbldesc: DebugElement = fixture.debugElement.query(By.css('#rejectnulllbl'));
    const lblel = lbldesc.nativeElement;
    expect(lblel).toBeTruthy()

  });

  it('should show the power input and correct power label input when target event is ci width', () => {
    spyOn(component, 'isRejection').and.returnValue(false);
    spyOn(component, 'isCIWidth').and.returnValue(true);
    spyOn(component, 'isWAVR').and.returnValue(false);

    component.selectSampleSize();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('#powerinput'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy()

    const lbldesc: DebugElement = fixture.debugElement.query(By.css('#achieveciwidthlbl'));
    const lblel = lbldesc.nativeElement;
    expect(lblel).toBeTruthy()

  });

  it('should show the power input and correct power label input when target event is WAVR', () => {
    spyOn(component, 'isRejection').and.returnValue(false);
    spyOn(component, 'isCIWidth').and.returnValue(false);
    spyOn(component, 'isWAVR').and.returnValue(true);

    component.selectSampleSize();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('#powerinput'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy()

    const lbldesc: DebugElement = fixture.debugElement.query(By.css('#probwavrlbl'));
    const lblel = lbldesc.nativeElement;
    expect(lblel).toBeTruthy()

  });
});
