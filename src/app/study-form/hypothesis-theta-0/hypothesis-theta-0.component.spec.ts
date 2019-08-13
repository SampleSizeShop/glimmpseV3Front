import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisTheta0Component } from './hypothesis-theta-0.component';
import {ActivatedRouteStub} from '../../../testing/router-stubs';
import {MockBackend} from '@angular/http/testing';
import {ActivatedRoute} from '@angular/router';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {constants} from '../../shared/model/constants';
import {NavigationService} from '../../shared/services/navigation.service';
import {NGXLogger} from 'ngx-logger';

describe('HypothesisTheta0Component', () => {
  let component: HypothesisTheta0Component;
  let fixture: ComponentFixture<HypothesisTheta0Component>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ HypothesisTheta0Component ],
      providers: [
        StudyService,
        NGXLogger,
        NavigationService,
        {provide: HttpClient, useClass: MockBackend},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisTheta0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const a  = constants.STAGES;
    const names = []
    Object.keys(a).forEach( key => {names.push(key)});
    expect(component).toBeTruthy();
  });
});
