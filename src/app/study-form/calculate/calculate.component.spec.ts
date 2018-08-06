import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateComponent } from './calculate.component';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {MathJaxDirective} from '../../mathjax/mathjax.directive';

describe('CalculateComponent', () => {
  let component: CalculateComponent;
  let fixture: ComponentFixture<CalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalculateComponent,
        MathJaxDirective],
      providers: [ StudyService,
      {provide: HttpClient, useClass: MockBackend}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
