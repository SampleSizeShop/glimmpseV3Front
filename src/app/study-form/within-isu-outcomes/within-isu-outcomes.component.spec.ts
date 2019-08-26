import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinIsuOutcomesComponent } from './within-isu-outcomes.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NavigationService} from '../../shared/services/navigation.service';
import {StudyService} from '../../shared/services/study.service';

import {HttpClient} from '@angular/common/http';
import {Outcome} from '../../shared/model/Outcome';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from "ngx-logger/testing";

describe('WithinIsuOutcomesComponent', () => {
  let component: WithinIsuOutcomesComponent;
  let fixture: ComponentFixture<WithinIsuOutcomesComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ WithinIsuOutcomesComponent ],
      providers: [StudyService, NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        NavigationService]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinIsuOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add the current value of the form to the list of outcomes.', () => {
    const val = 'ABC';
    component.outcomesForm.value.outcomes = val;
    component.addOutcome();
    expect(component.outcomes.length).toEqual(1);
    expect(component.outcomes[0].name).toEqual(val);
  });

  it('should remove the selected value of the form to the list of outcomes.', () => {
    const val = 'ABC';
    const outcome = new Outcome(val);
    component.outcomes.push(outcome);
    component.removeOutcome(outcome);
    expect(component.outcomes.length).toEqual(0);
  });

  it('should not add an empty outcome', () => {
    const val = '  ';
    component.outcomesForm.value.outcomes = val;
    component.addOutcome();
    expect(component.outcomes.length).toEqual(0);
  });

  it('should show the appropriate message if we have no outcomes stored', () => {
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#firstoutcome'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy()
  });

  it('should show the appropriate message if we have outcomes stored and can still add more', () => {
    component.outcomes.push(new Outcome('ABC'));
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#nextoutcome'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy()
  });

  it('should show the appropriate message if we have reached the outcome limit', () => {
    for (let i = 0; i < component.max; i++) {
      component.outcomes.push(new Outcome('A'))
    }
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#outcomesfull'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy()
  });

  it('should not allow the user to move on without naming at least one outcome', () => {});
});
