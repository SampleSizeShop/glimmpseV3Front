import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinIsuRepeatedMeasuresComponent } from './within-isu-repeated-measures.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';

import {NavigationService} from '../../shared/services/navigation.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';
import {ControlHelpTextComponent} from '../control-help-text/control-help-text.component';
import { MatIconModule } from '@angular/material/icon';

describe('WithinIsuRepeatedMeasuresComponent', () => {
  let component: WithinIsuRepeatedMeasuresComponent;
  let fixture: ComponentFixture<WithinIsuRepeatedMeasuresComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [
        WithinIsuRepeatedMeasuresComponent,
        ControlHelpTextComponent
      ],
      providers: [
        StudyService,
        NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        NavigationService,
        NgbModal]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinIsuRepeatedMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the dimension form when the user chooses to add a repeated measure', () => {
    component.includeRepeatedMeasures();
    fixture.detectChanges();
    component.stage = component.stages.DIMENSIONS;
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#dimension'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the type form when the user clicks next after defining the name', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.setStage(component.stages.TYPE);
    fixture.detectChanges();
    component.stage = component.stages.TYPE;
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#type'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the repeats form when the user clicks next after defining the type', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.typeForm.get('type').setValue('Type1');
    component.setStage(component.stages.TYPE);
    component.stage = component.stages.TYPE;
    fixture.detectChanges();
    component.setStage(component.stages.REPEATS);
    component.stage = component.stages.REPEATS;
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#repeats'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should show the valueNames form when the user clicks next after defining the number of repeats', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.typeForm.get('type').setValue('Type1');
    component.setStage(component.stages.SPACING);
    component.stage = component.stages.SPACING;
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#spacinginput'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should add a repeated measure to the study when the user clicks next after defining the valueNames', () => {
    component.includeRepeatedMeasures();
    component.dimensionForm.get('dimension').setValue('Measure1');
    component.typeForm.get('type').setValue('Type1');
    component.spacingValues.push('1');
    component.setStage(component.stages.SPACING);
    component.stage = component.stages.SPACING;
    fixture.detectChanges();
    component.addRepeatedMeasure();
    fixture.detectChanges();
    component.stage = component.stages.INFO;
    fixture.detectChanges();
    expect(component.repeatedMeasures.length).toBe(1);
    const desc: DebugElement = fixture.debugElement.query(By.css('#nextrepmeasure'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  // it('Should add a load all forms with properties of a repeated measure when edit measure is selected.', () => {
  //   component.includeRepeatedMeasures();
  //   component.dimensionForm.get('dimension').setValue('Measure1');
  //   component.typeForm.get('type').setValue('Type1');
  //   component.spacingValues.push('1');
  //   component.addRepeatedMeasure();
  //   expect(component.repeatedMeasures.length).toBe(1);
  //   component.editRepeatedMeasure(component.repeatedMeasures[0]);
  // });
});
