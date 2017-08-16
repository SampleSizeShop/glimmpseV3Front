import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentMeasuresComponent } from './different-measures.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {LoggerModule} from 'ngx-logger';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {DifferentMeasures} from '../shared/DifferentMeasures';

describe('DifferentMeasuresComponent', () => {
  let component: DifferentMeasuresComponent;
  let fixture: ComponentFixture<DifferentMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  ReactiveFormsModule,
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})],
      declarations: [ DifferentMeasuresComponent, CorrelationMatrixComponent ],
      providers: [ DifferentMeasures, { provide: Http, useClass: MockBackend } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferentMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
