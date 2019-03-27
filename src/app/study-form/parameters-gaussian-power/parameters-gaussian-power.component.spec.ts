import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersGaussianPowerComponent } from './parameters-gaussian-power.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NavigationService} from '../../shared/navigation.service';
import {HttpClient} from '@angular/common/http';
import {NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {StudyService} from '../study.service';
import {ActivatedRouteStub} from '../../../testing/router-stubs';
import {MockBackend} from '@angular/http/testing';
import {ActivatedRoute} from '@angular/router';
import {GaussianCovariate} from '../../shared/GaussianCovariate';

describe('ParametersGaussianPowerComponent', () => {
  let component: ParametersGaussianPowerComponent;
  let fixture: ComponentFixture<ParametersGaussianPowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ParametersGaussianPowerComponent ],
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
    fixture = TestBed.createComponent(ParametersGaussianPowerComponent);
    component = fixture.componentInstance;
    component._gaussianCovariate = new GaussianCovariate();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
