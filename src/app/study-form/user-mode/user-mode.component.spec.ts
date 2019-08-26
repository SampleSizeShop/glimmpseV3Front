import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserModeComponent } from './user-mode.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NavigationService} from '../../shared/services/navigation.service';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';

describe('UserModeComponent', () => {
  let component: UserModeComponent;
  let fixture: ComponentFixture<UserModeComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ UserModeComponent ],
      providers: [ StudyService, NavigationService, NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}} ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(UserModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('select Guided should select guided mode', () => {
    component.selectGuided();
    fixture.detectChanges();
    expect(component.guided);
  });

  it('select Flexible should select guided mode', () => {
    component.selectFlex();
    fixture.detectChanges();
    expect(!component.guided);
  });

  it('should show Guided mode description when guided mode is selected', () => {
    component.selectGuided();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#guideddesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should show Flex mode description when flex mode is selected', () => {
    component.selectFlex();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#flexdesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should not Flex mode description when guided mode is selected', () => {
    component.selectGuided();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#flexdesc'));
    expect(!desc);
  });

  it('should not Guided mode description when flex mode is selected', () => {
    component.selectFlex();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#guideddesc'));
    expect(!desc);
  });

  it('should give Guided button active class if Guided Mode is selected', () => {
    component.selectGuided();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('guidedbtn')
  });

  it('should give Flex button active class if Flex Mode is selected', () => {
    component.selectFlex();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('flexbtn')
  });
});
