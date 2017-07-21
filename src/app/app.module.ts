import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MathJaxService} from './services/mathjax.service';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {MathJaxDirective} from './mathjax/mathjax.directive';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { StudyFormComponent } from './study-form/study-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdInputModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    MathJaxComponent,
    MathJaxDirective,
    StudyFormComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdButtonModule
  ],
  providers: [MathJaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
