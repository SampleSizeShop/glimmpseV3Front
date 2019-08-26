import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersGaussianCovariateCorrelationComponent } from './parameters-gaussian-covariate-correlation.component';

import {HttpClient} from '@angular/common/http';
import {StudyService} from '../../shared/services/study.service';
import {ReactiveFormsModule} from '@angular/forms';
import {NavigationService} from "../../shared/services/navigation.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ParametersGaussianCovariateCorrelationComponent', () => {
  let component: ParametersGaussianCovariateCorrelationComponent;
  let fixture: ComponentFixture<ParametersGaussianCovariateCorrelationComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [ ParametersGaussianCovariateCorrelationComponent ],
      providers: [
        StudyService,
        NavigationService]
    })
    .compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersGaussianCovariateCorrelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
