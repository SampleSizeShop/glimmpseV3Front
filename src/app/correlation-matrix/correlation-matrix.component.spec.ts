import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelationMatrixComponent } from './correlation-matrix.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CorrelationMatrixService} from '../shared/correlationMatrix.service';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('CorrelationMatrixComponent', () => {
  let component: CorrelationMatrixComponent;
  let fixture: ComponentFixture<CorrelationMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  ReactiveFormsModule,
                  LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})],
      declarations: [ CorrelationMatrixComponent ],
      providers: [ CorrelationMatrixService, { provide: Http, useClass: MockBackend }, {provide: NGXLogger, useClass: NGXLoggerMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelationMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should populate correlation matrix with a diagonal matrix of 1s if size is set',() => {
    component.size = 2;
    component._initializeProperties();
    expect(component.uMatrix.values.get([0, 0])).toEqual(1);
    expect(component.uMatrix.values.get([0, 1])).toEqual(0);
    expect(component.uMatrix.values.get([1, 0])).toEqual(0);
    expect(component.uMatrix.values.get([1, 1])).toEqual(1);
  });

  it('Should set size to size of correlation matrix if size = -1', () => {
    component.uMatrix.populateDefaultValues(3);
    component.size = -1;
    component._initializeProperties();
    expect(component.uMatrix.values.size()[0]).toEqual(3);
  })

  it('Should create the array of controls addressed to each matrix element', () => {
    component.size = 2;
    component._initializeProperties();
    component._defineFormControls();
    expect(Object.keys(component.controlDefs).length).toEqual(4);
  } )

  it('Should create the array of values corresponding to controls, addressed by name to each matrix element', () => {
    component.size = 2;
    component._initializeProperties();
    component._defineFormControls();
    expect(Object.keys(component.controlDefs)).toEqual(Object.keys(component.values));
  } );

  it('Should give the transposed matrix element', () => {
    const actual = '2-3';
    const expected = '3-2';
    expect(component._transposeName(actual)).toEqual(expected);
  });

  it('Should return true if element is not on a diagonal', () => {
    const actual = '1-0';
    expect(component._linkToTranspose(actual)).toEqual(true);
  });

  it('Should return false if element is on a diagonal', () => {
    const actual = '1-1';
    expect(component._linkToTranspose(actual)).toEqual(false);
  });

  it('Should correctly build a mathjs matrix from the values in the control', () => {
    component.values = {'0-0': 1, '0-1': 0, '1-0': 0, '1-1': 1};
    component._setUMatrixFromValues();
    expect(component.uMatrix.values.get([0, 0])).toEqual(1);
    expect(component.uMatrix.values.get([0, 1])).toEqual(0);
    expect(component.uMatrix.values.get([1, 0])).toEqual(0);
    expect(component.uMatrix.values.get([1, 1])).toEqual(1);
  });

  it('Should give disable cells inherited colour', () => {
    const expected = 'inherit'
    expect(component.getStyle(0,1)).toEqual(expected);
  });

  it('Should give diagonal cells contrast colour', () => {
    const white = '#ffffff';
    const inherit = 'inherit';
    expect(component.getStyle(0, 0) !== white);
    expect(component.getStyle(0, 0) !== inherit);
  });

  it('Should colour active cells white', () => {
    const expected = '#ffffff'
    expect(component.getStyle(1, 0)).toEqual(expected);
  });
});
