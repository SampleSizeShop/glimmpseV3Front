import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersIntraClassCorrelationComponent } from './parameters-intra-class-correlation.component';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {ReactiveFormsModule} from '@angular/forms';
import {testEnvironment} from '../../../environments/environment.test';
import {Outcome} from '../../shared/model/Outcome';
import {Cluster} from '../../shared/model/Cluster';
import {NavigationService} from '../../shared/services/navigation.service';

describe('ParametersIntraClassCorrelationComponent', () => {
  let component: ParametersIntraClassCorrelationComponent;
  let fixture: ComponentFixture<ParametersIntraClassCorrelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })
      ],
      declarations: [
        ParametersIntraClassCorrelationComponent
      ],
      providers: [
        StudyService,
        NavigationService,
        {provide: HttpClient, useClass: MockBackend},
        {provide: NGXLogger, useClass: NGXLoggerMock}
        ]
    })
    .compileComponents();
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
