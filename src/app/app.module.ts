import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MatrixService} from './matrix-service';
import {MatrixComponent} from './matrix.component';
import {MathJaxDirective} from './mathjax.directive';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    MatrixComponent,
    MathJaxDirective
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MatrixService],
  bootstrap: [AppComponent]
})
export class AppModule { }
