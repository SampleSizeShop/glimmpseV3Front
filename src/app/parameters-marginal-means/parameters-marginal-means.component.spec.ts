import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersMarginalMeansComponent } from './parameters-marginal-means.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {StudyService} from "../shared/study.service";
import {Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {Component} from "@angular/core";
import {ISUFactors} from "../shared/ISUFactors";

describe('ParametersMarginalMeansComponent', () => {
  let component: ParametersMarginalMeansComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;

  @Component({
    selector: 'app-test-component-wrapper',
    template: '<app-parameters-marginal-means [isuFactors]="isuFactors"></app-parameters-marginal-means>'
  })
  class TestWrapperComponent {
    isuFactors = new ISUFactors();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ TestWrapperComponent, ParametersMarginalMeansComponent ],
      providers: [StudyService, { provide: Http, useClass: MockBackend }]
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

