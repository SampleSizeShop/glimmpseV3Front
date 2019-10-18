import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParametersVarianceScaleFactorsComponent } from './parameters-variance-scale-factors.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';
import {NavigationService} from '../../shared/services/navigation.service';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';
import {MatIconModule} from "@angular/material";
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";

describe('ParametersVarianceScaleFactorsComponent', () => {
  let component: ParametersVarianceScaleFactorsComponent;
  let fixture: ComponentFixture<ParametersVarianceScaleFactorsComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatIconModule],
      declarations: [
        ParametersVarianceScaleFactorsComponent,
        ControlHelpTextComponent
      ],
      providers: [
        NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        NavigationService,
        StudyService
      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersVarianceScaleFactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
