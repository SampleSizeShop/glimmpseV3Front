import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {MathJaxService} from './mathjax.service';
import { MathJaxComponent } from './mathjax.component';
import {FormsModule} from '@angular/forms';
import {MathJaxDirective} from './mathjax.directive';
import {Http, HttpModule, XHRBackend} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
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

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toContain('app');
  }));

});
