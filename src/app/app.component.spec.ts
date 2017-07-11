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

});
