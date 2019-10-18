import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuSmallestGroupComponent } from './between-isu-smallest-group.component';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteStub} from '../../../testing/router-stubs';
import {StudyService} from '../../shared/services/study.service';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {NavigationService} from '../../shared/services/navigation.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LoggerTestingModule, NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";

describe('BetweenIsuSmallestGroupComponent', () => {
  let component: BetweenIsuSmallestGroupComponent;
  let fixture: ComponentFixture<BetweenIsuSmallestGroupComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoggerTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        NgbModule,
        MatIconModule],
      declarations: [
        BetweenIsuSmallestGroupComponent,
        ControlHelpTextComponent
      ],
      providers: [
        StudyService,
        NavigationService,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub },
        NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}}
      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenIsuSmallestGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the group size form', () => {
    component.isuFactors = new ISUFactors();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#groupSizeForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });
});
