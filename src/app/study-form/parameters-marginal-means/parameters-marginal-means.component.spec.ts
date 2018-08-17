import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersMarginalMeansComponent } from './parameters-marginal-means.component';
import { ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';

describe('ParametersMarginalMeansComponent', () => {
  let component: ParametersMarginalMeansComponent;
  let fixture: ComponentFixture<ParametersMarginalMeansComponent>;

  /**
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ParametersMarginalMeansComponent ],
      providers: [StudyService, { provide: HttpClient, useClass: MockBackend }]
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
  }); **/
});

