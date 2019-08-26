import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathJaxComponent } from './mathjax.component';
import {MathJaxDirective} from '../mathjax/mathjax.directive';
import {MathJaxService} from './mathjax.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('MathJaxComponent', () => {
  let component: MathJaxComponent;
  let fixture: ComponentFixture<MathJaxComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        MathJaxDirective,
        MathJaxComponent
      ],
      providers: [ MathJaxService]
    })
      .compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathJaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
