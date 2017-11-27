import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersRepeatedMeasureOutcomeCorrelationsComponent } from './parameters-repeated-measure-outcome-correlations.component';
import {Component} from '@angular/core';
import {ISUFactors} from '../shared/ISUFactors';
import {ReactiveFormsModule} from '@angular/forms';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('ParametersRepeatedMeasureOutcomeCorrelationsComponent', () => {
  let component: ParametersRepeatedMeasureOutcomeCorrelationsComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  @Component({
    selector: 'app-test-component-wrapper',
    template: '<app-parameters-repeated-measure-outcome-correlations [isuFactors]="isuFactors"></app-parameters-repeated-measure-outcome-correlations>'
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
        ParametersRepeatedMeasureOutcomeCorrelationsComponent,
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
