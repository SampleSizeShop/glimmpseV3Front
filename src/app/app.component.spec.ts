import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {FlaskService} from './flask.service';
import { FlaskComponent } from './flask.component';
import {FormsModule} from '@angular/forms';
import {FlaskDirective} from './flask.directive';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent, FlaskComponent, FlaskDirective
      ],
      providers: [FlaskService]
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

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Demo');
  }));

  it('should should attach a message from service to the component', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.message).toBe('real service');
  }));

  it('should render a MathJax component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(typeof(app.mathjax_component) == typeof(FlaskComponent) );
  }));
});
