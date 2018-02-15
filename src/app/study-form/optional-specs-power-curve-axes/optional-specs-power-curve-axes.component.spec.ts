import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsPowerCurveAxesComponent } from './optional-specs-power-curve-axes.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {StudyService} from '../study.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('OptionalSpecsPowerCurveAxesComponent', () => {
  let component: OptionalSpecsPowerCurveAxesComponent;
  let fixture: ComponentFixture<OptionalSpecsPowerCurveAxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})
      ],
      declarations: [ OptionalSpecsPowerCurveAxesComponent ],
      providers: [
        StudyService,
        {provide: Router, useClass: RouterStub},
        {provide: Http, useClass: MockBackend},
        {provide: NGXLogger, useClass: NGXLoggerMock},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsPowerCurveAxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
