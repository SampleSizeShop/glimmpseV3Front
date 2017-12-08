import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersIntraClassCorrelationComponent } from './parameters-intra-class-correlation.component';
import {StudyService} from '../study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('ParametersIntraClassCorrelationComponent', () => {
  let component: ParametersIntraClassCorrelationComponent;
  let fixture: ComponentFixture<ParametersIntraClassCorrelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersIntraClassCorrelationComponent ],
      providers: [
        StudyService,
        { provide: Http, useClass: MockBackend}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersIntraClassCorrelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
