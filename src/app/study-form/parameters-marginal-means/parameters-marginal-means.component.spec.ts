import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersMarginalMeansComponent } from './parameters-marginal-means.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Component} from '@angular/core';
import {ISUFactors} from '../../shared/ISUFactors';

describe('ParametersMarginalMeansComponent', () => {
  let component: ParametersMarginalMeansComponent;
  let fixture: ComponentFixture<ParametersMarginalMeansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ParametersMarginalMeansComponent ],
      providers: [StudyService, { provide: Http, useClass: MockBackend }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersMarginalMeansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

