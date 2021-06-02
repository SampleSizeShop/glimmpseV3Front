import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParametersIntraClassCorrelationComponent } from './parameters-intra-class-correlation.component';
import {StudyService} from '../../shared/services/study.service';
import {LoggerModule} from 'ngx-logger';
import {ReactiveFormsModule} from '@angular/forms';
import {testEnvironment} from '../../../environments/environment.test';
import {Cluster} from '../../shared/model/Cluster';
import {NavigationService} from '../../shared/services/navigation.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import {ControlHelpTextComponent} from "../control-help-text/control-help-text.component";
import { MatIconModule } from "@angular/material/icon";

describe('ParametersIntraClassCorrelationComponent', () => {
  let component: ParametersIntraClassCorrelationComponent;
  let fixture: ComponentFixture<ParametersIntraClassCorrelationComponent>;

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
        })
      ],
      declarations: [
        ParametersIntraClassCorrelationComponent,
        ControlHelpTextComponent
      ],
      providers: [
        StudyService,
        NavigationService
        ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersIntraClassCorrelationComponent);
    component = fixture.componentInstance;
    component.isuFactors.variables.push(new Cluster('cluster'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
