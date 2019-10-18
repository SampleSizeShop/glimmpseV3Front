import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalTestsComponent } from './statistical-tests.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {StudyService} from '../../shared/services/study.service';
import {NavigationService} from '../../shared/services/navigation.service';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from "ngx-logger/testing";
import {MatIconModule} from "@angular/material";
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";

describe('StatisticalTestsComponent', () => {
  let component: StatisticalTestsComponent;
  let fixture: ComponentFixture<StatisticalTestsComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatIconModule],
      declarations: [
        StatisticalTestsComponent,
        ControlHelpTextComponent ],
      providers: [ StudyService,
        NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        NavigationService
      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('selectedTests should return true if value is in selectedTests', () => {
    expect(component.isSelected(component.statisticalTests.HOTELLING_LAWLEY)).toEqual(true);
  });

  it('selectedTests should return false if value is not in selectedTests', () => {
    expect(component.isSelected(component.statisticalTests.PILLAI_BARTLET)).toEqual(false);
  });

  it('should give all statistical test checkboxes active class if they are selected', () => {
    // Start with an empty set
    component.selectTest(component.statisticalTests.HOTELLING_LAWLEY)

    for (const test of Object.keys(component.statisticalTests)) {
      component.selectTest(component.statisticalTests[test]);
    }
    fixture.detectChanges();
    const activeElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.active'));
    expect(activeElements.length).toEqual(component.selectedTests.length);
  });
});
