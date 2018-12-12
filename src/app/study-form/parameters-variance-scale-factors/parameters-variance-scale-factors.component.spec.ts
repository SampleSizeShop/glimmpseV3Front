import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersVarianceScaleFactorsComponent } from './parameters-variance-scale-factors.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {NavigationService} from '../../shared/navigation.service';
import {NGXLogger} from 'ngx-logger';

describe('ParametersVarianceScaleFactorsComponent', () => {
  let component: ParametersVarianceScaleFactorsComponent;
  let fixture: ComponentFixture<ParametersVarianceScaleFactorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ParametersVarianceScaleFactorsComponent ],
      providers: [
        NGXLogger,
        NavigationService,
        StudyService,
        {provide: HttpClient, useClass: MockBackend}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersVarianceScaleFactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
