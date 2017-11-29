import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';

import { TypeOneErrorComponent } from './type-one-error.component';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {StudyService} from '../../shared/study.service';

describe('TypeOneErrorComponent', () => {
  let component: TypeOneErrorComponent;
  let fixture: ComponentFixture<TypeOneErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})],
      declarations: [ TypeOneErrorComponent ],
      providers: [ StudyService, { provide: Http, useClass: MockBackend }, {provide: NGXLogger, useClass: NGXLoggerMock} ]
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
