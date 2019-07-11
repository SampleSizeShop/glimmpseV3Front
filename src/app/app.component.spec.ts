import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MathJaxDirective} from './mathjax/mathjax.directive';
import {RouterTestingModule} from '@angular/router/testing';
import {MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StudyService} from './study-form/study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatTooltipModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        AppComponent,
        MathJaxComponent,
        MathJaxDirective
      ],
      providers: [
        StudyService,
        RouterTestingModule,
        { provide: HttpClient, useClass: MockBackend },
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

});
