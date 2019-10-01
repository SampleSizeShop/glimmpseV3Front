import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MathJaxDirective} from './mathjax/mathjax.directive';
import {RouterTestingModule} from '@angular/router/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StudyService} from './shared/services/study.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MatIconModule} from '@angular/material/icon';

describe('AppComponent', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        HttpClientTestingModule,
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
      ]
    }).compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

});
