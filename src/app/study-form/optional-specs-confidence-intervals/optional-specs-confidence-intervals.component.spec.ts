import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsConfidenceIntervalsComponent } from './optional-specs-confidence-intervals.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {NavigationService} from '../../shared/services/navigation.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NGXLogger} from 'ngx-logger';

describe('WithinIsuRepeatedMeasuresComponent', () => {
  let component: OptionalSpecsConfidenceIntervalsComponent;
  let fixture: ComponentFixture<OptionalSpecsConfidenceIntervalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ OptionalSpecsConfidenceIntervalsComponent ],
      providers: [
        StudyService,
        NGXLogger,
        {provide: HttpClient, useClass: MockBackend},
        NavigationService,
        NgbModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsConfidenceIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
