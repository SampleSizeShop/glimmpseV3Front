import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersScaleFactorComponent } from './parameters-scale-factor.component';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {ReactiveFormsModule} from '@angular/forms';

describe('ParametersScaleFactorComponent', () => {
  let component: ParametersScaleFactorComponent;
  let fixture: ComponentFixture<ParametersScaleFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({imports: [
      ReactiveFormsModule,
      LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})],
      declarations: [ ParametersScaleFactorComponent ],
      providers: [ StudyService, { provide: HttpClient, useClass: MockBackend }, {provide: NGXLogger, useClass: NGXLoggerMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersScaleFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
