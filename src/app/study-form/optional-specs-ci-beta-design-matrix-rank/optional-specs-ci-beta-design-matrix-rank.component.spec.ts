import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsCiBetaDesignMatrixRankComponent } from './optional-specs-ci-beta-design-matrix-rank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {StudyService} from '../study.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {testEnvironment} from '../../../environments/environment.test';

describe('OptionalSpecsCiBetaDesignMatrixRankComponent', () => {
  let component: OptionalSpecsCiBetaDesignMatrixRankComponent;
  let fixture: ComponentFixture<OptionalSpecsCiBetaDesignMatrixRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })],
      declarations: [ OptionalSpecsCiBetaDesignMatrixRankComponent ],
      providers: [
      StudyService,
      {provide: Router, useClass: RouterStub},
      {provide: HttpClient, useClass: MockBackend},
      {provide: NGXLogger, useClass: NGXLoggerMock},
      {provide: ActivatedRoute, useClass: ActivatedRouteStub }
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsCiBetaDesignMatrixRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
