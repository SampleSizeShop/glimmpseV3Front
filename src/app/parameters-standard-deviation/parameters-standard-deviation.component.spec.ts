import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersStandardDeviationComponent } from './parameters-standard-deviation.component';
import {Component} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('ParametersStandardDeviationComponent', () => {
  let component: ParametersStandardDeviationComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  @Component({
    selector: 'app-test-component-wrapper',
    template: '<app-parameters-standard-deviation [isuFactors]="isuFactors"></app-parameters-standard-deviation>'
  })
  class TestWrapperComponent {
    isuFactors = new ISUFactors();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})
      ],
      declarations: [
        TestWrapperComponent,
        ParametersStandardDeviationComponent,
        CorrelationMatrixComponent
      ],
      providers: [
        {provide: Http, useClass: MockBackend},
        {provide: NGXLogger, useClass: NGXLoggerMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
