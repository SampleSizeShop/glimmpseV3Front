import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsConfidenceIntervalsComponent } from './optional-specs-confidence-intervals.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';

import {NavigationService} from '../../shared/services/navigation.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from "ngx-logger/testing";

describe('WithinIsuRepeatedMeasuresComponent', () => {
  let component: OptionalSpecsConfidenceIntervalsComponent;
  let fixture: ComponentFixture<OptionalSpecsConfidenceIntervalsComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ OptionalSpecsConfidenceIntervalsComponent ],
      providers: [
        StudyService,
        NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        NavigationService,
        NgbModal]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsConfidenceIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
