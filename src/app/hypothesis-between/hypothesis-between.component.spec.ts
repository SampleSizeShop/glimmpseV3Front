import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HypothesisBetweenComponent } from './hypothesis-between.component';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {StudyService} from '../shared/study.service';
import {MathJaxDirective} from "../mathjax/mathjax.directive";
import {MathJaxComponent} from "../mathjax/mathjax.component";

describe('HypothesisBetweenComponent', () => {
  let component: HypothesisBetweenComponent;
  let fixture: ComponentFixture<HypothesisBetweenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HypothesisBetweenComponent,
        MathJaxDirective ],
      providers: [ StudyService, {provide: Http, useClass: MockBackend} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisBetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
