import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FlaskService} from './flask.service';
import {FlaskComponent} from './flask.component';
import {FlaskDirective} from './flask.directive';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    FlaskComponent,
    FlaskDirective
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [FlaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
