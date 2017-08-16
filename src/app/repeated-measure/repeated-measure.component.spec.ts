import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatedMeasureComponent } from './repeated-measure.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {RepeatedMeasureService} from '../shared/repeatedMeasure.service';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {LoggerModule} from 'ngx-logger';

describe('RepeatedMeasureComponent', () => {
  let component: RepeatedMeasureComponent;
  let fixture: ComponentFixture<RepeatedMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [  ReactiveFormsModule,
                  LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'})],
      declarations: [ RepeatedMeasureComponent, CorrelationMatrixComponent ],
      providers: [ RepeatedMeasureService, RepeatedMeasure, { provide: Http, useClass: MockBackend } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatedMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  const validFormSetup = function () {
    component.repeatedMeasureForm.controls['name'].setValue('2');
    component.repeatedMeasureForm.controls['noRepeats'].setValue(2);
    component.repeatedMeasureForm.controls['spacing'].setValue(2);
  };

  it('Should be valid when required input is set', () => {
    validFormSetup();
    expect(component.repeatedMeasureForm.valid).toBeTruthy();
  });

  it('Should show correlation matrix component when form is valid', () => {
    validFormSetup();
    const desc: DebugElement = fixture.debugElement.query(By.css('#correlationMatrix'));
    expect(desc);
  });

  it('Should not show correlation matrix component when form is not valid', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('#correlationMatrix'));
    expect(!desc);
  });

  it('Should have add measure button enabled when form is valid', () => {
    validFormSetup();
    fixture.detectChanges();
    const btn: DebugElement = fixture.debugElement.query(By.css('#addMeasureBtn'));
    expect(btn.nativeElement.disabled).toBeFalsy();
  });

  it('Should not have add measure button enabled when form is not valid', () => {
    const btn: DebugElement = fixture.debugElement.query(By.css('#addMeasureBtn'));
    expect(btn.nativeElement.disabled).toBeTruthy();
  });
});
