import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussianCovariateComponent } from './gaussian-covariate.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {NGXLogger} from 'ngx-logger';
import {NavigationService} from '../../shared/services/navigation.service';

describe('GaussianCovariateComponent', () => {
  let component: GaussianCovariateComponent;
  let fixture: ComponentFixture<GaussianCovariateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ GaussianCovariateComponent ],
      providers: [
        StudyService,
        {provide: HttpClient, useClass: MockBackend},
        NGXLogger,
        NavigationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaussianCovariateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it( 'should show ask the user if they want to define a gaussian covatiate,' +
    'if there is not one added and they are not currently editing one.', () => {
    const desc: DebugElement = fixture.debugElement.query(By.css('#includegaussiancovariateradio'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should add a gaussian covariate object to the study design when the user clicks define button and adds' +
    'a valid value for standard_deviation', () => {
    component.includeGaussianCovariate();
    fixture.detectChanges();
    expect(component.gaussianCovariate).toBeDefined();
  });
});
