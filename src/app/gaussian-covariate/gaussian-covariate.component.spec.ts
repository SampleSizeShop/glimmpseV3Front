import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussianCovariateComponent } from './gaussian-covariate.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {GaussianCovariate} from '../shared/GaussianCovariate';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {NavigationService} from '../shared/navigation.service';

describe('GaussianCovariateComponent', () => {
  let component: GaussianCovariateComponent;
  let fixture: ComponentFixture<GaussianCovariateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ GaussianCovariateComponent ],
      providers: [StudyService, {provide: Http, useClass: MockBackend}, NavigationService]
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
    const desc: DebugElement = fixture.debugElement.query(By.css('#firstgaussiancovariate'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it( 'should ask the user to define a variance for their gaussian covariate when the click the' +
    'define a gaussian covariate button.', () => {
    component.includeGaussianCovariate();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#variance'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should add a gaussian covariate object to the study design when the user clicks next.', () => {
    component.editing = true;
    component.setStage(0);
    component.gaussianCovariateForm.get('variance').setValue(1);
    component.internallyNavigate('NEXT');
    fixture.detectChanges();
    expect(component.gaussianCovariates.length).toEqual(1);
  });
});
