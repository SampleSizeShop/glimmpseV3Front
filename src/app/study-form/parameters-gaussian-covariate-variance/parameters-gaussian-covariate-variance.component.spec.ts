import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersGaussianCovariateVarianceComponent } from './parameters-gaussian-covariate-variance.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {NavigationService} from '../../shared/services/navigation.service';
import {HttpClient} from '@angular/common/http';
import {StudyService} from '../study.service';
import {ActivatedRouteStub} from '../../../testing/router-stubs';
import {MockBackend} from '@angular/http/testing';
import {ActivatedRoute} from '@angular/router';

describe('ParametersGaussianCovariateVarianceComponent', () => {
  let component: ParametersGaussianCovariateVarianceComponent;
  let fixture: ComponentFixture<ParametersGaussianCovariateVarianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ ParametersGaussianCovariateVarianceComponent ],
      providers: [
        StudyService,
        NavigationService,
        {provide: HttpClient, useClass: MockBackend},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub },
        {provide: NGXLogger, useClass: NGXLoggerMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersGaussianCovariateVarianceComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
