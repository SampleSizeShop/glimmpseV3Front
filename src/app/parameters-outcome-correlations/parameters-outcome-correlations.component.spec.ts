import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersOutcomeCorrelationsComponent } from './parameters-outcome-correlations.component';
import {Component} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';

describe('ParametersOutcomeCorrelationsComponent', () => {
  let component: ParametersOutcomeCorrelationsComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  @Component({
    selector: 'app-test-component-wrapper',
    template: '<app-parameters-outcome-correlations [isuFactors]="isuFactors"></app-parameters-outcome-correlations>'
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
        ParametersOutcomeCorrelationsComponent,
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
