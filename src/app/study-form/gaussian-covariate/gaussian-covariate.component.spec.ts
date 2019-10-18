import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussianCovariateComponent } from './gaussian-covariate.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {NavigationService} from '../../shared/services/navigation.service';
import {MatIconModule} from '@angular/material/icon';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";

describe('GaussianCovariateComponent', () => {
  let component: GaussianCovariateComponent;
  let fixture: ComponentFixture<GaussianCovariateComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        NgbModule,
        MatIconModule],
      declarations: [
        GaussianCovariateComponent,
        ControlHelpTextComponent
      ],
      providers: [
        StudyService,
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
    fixture = TestBed.createComponent(GaussianCovariateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it( 'should show ask the user if they want to define a gaussian covatiate,' +
    'if there is not one added and they are not currently editing one.', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('#includegaussiancovariateradio'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should add a gaussian covariate object to the study design when the user clicks define button and adds' +
    'a valid value for standard_deviation', () => {
    component.includeGaussianCovariate();
    fixture.detectChanges();
    expect(component.gaussianCovariate).toBeDefined();
  });
});
