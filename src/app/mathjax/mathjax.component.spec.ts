import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathJaxComponent } from './mathjax.component';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {MathJaxDirective} from '../mathjax/mathjax.directive';
import {MathJaxService} from './mathjax.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('MathJaxComponent', () => {
  let component: MathJaxComponent;
  let fixture: ComponentFixture<MathJaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        MathJaxDirective,
        MathJaxComponent
      ],
      providers: [ MathJaxService, {provide: Http, useClass: MockBackend}]
    })
      .compileComponents();
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
