import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { SolveForComponent } from './solve-for.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {LoggerModule} from 'ngx-logger';
import {testEnvironment} from '../../../environments/environment.test';
import {NavigationService} from '../../shared/services/navigation.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import {ControlHelpTextComponent} from '../control-help-text/control-help-text.component';

describe('SolveForComponent', () => {
  let component: SolveForComponent;
  let fixture: ComponentFixture<SolveForComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        ReactiveFormsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })],
      declarations: [
        SolveForComponent,
        ControlHelpTextComponent
      ],
      providers: [
        StudyService,
        NavigationService,
        NgbModal,
         ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('select Power should select solve for power mode', () => {
    component.selectPower();
    fixture.detectChanges();
    expect(component.isPower());
  });

  it('select Sample Size should select solve for sample size mode', () => {
    component.selectSampleSize();
    fixture.detectChanges();
    expect(!component.isSampleSize());
  });

  it('should not show power description when solve for power is selected', () => {
    component.selectPower();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#powerdesc'));
    expect(!desc);
  });

  it('should not show sample size description when solve for sample size is selected', () => {
    component.selectSampleSize();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#samplesizedesc'));
    expect(!desc);
  });
});

describe('SolveForComponen_targetEvent_Rejection', () => {
  let component: SolveForComponent;
  let fixture: ComponentFixture<SolveForComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatIconModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })],
      declarations: [
        SolveForComponent,
        ControlHelpTextComponent
      ],
      providers: [
        NavigationService,
        NgbModal,
        StudyService,
         ]
    })
      .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the power button when target event is rejection and solving for power', () => {
    component.selectPower();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('#powerbtn'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('powerbtn')
  });

  it('should show the sample size button when target event is rejection and solving for samplesize', () => {
    component.selectSampleSize();
    fixture.detectChanges();

    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('samplesizebtn')
  });
});
