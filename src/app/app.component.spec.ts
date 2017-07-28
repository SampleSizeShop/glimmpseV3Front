import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { MathJaxService } from './shared/mathjax.service';
import { MathJaxComponent } from './mathjax/mathjax.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MathJaxDirective } from './mathjax/mathjax.directive';
import { Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      declarations: [
        AppComponent, MathJaxComponent, MathJaxDirective
      ],
      providers: [MathJaxService,  { provide: Http, useClass: MockBackend } ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
