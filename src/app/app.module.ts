import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MathJaxService} from './services/mathjax.service';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {MathJaxDirective} from './mathjax/mathjax.directive';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OutcomesFormComponent } from './outcomes-form/outcomes-form.component';
import {AppRoutingModule} from './app-routing-module';
import { UserModeComponent } from './user-mode/user-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    MathJaxComponent,
    MathJaxDirective,
    OutcomesFormComponent,
    UserModeComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [MathJaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
