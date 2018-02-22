import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';

import { TypeOneErrorComponent } from './type-one-error.component';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {MockBackend} from '@angular/http/testing';
import {HttpClient} from '@angular/common/http';
import {StudyService} from '../study.service';
import {testEnvironment} from '../../../environments/environment.test';

describe('TypeOneErrorComponent', () => {
  let component: TypeOneErrorComponent;
  let fixture: ComponentFixture<TypeOneErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })],
      declarations: [ TypeOneErrorComponent ],
      providers: [ StudyService, { provide: HttpClient, useClass: MockBackend }, {provide: NGXLogger, useClass: NGXLoggerMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOneErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
