import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MathJaxService } from './shared/mathjax.service';
import { MathJaxComponent } from './mathjax/mathjax.component';
import { MathJaxDirective } from './mathjax/mathjax.directive';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing-module';
import { UserModeComponent } from './user-mode/user-mode.component';
import { StudyFormComponent } from './study-form/study-form.component';
import { TargetEventComponent } from './target-event/target-event.component';

@NgModule({
  declarations: [
    AppComponent,
    MathJaxComponent,
    MathJaxDirective,
    UserModeComponent,
    StudyFormComponent,
    TargetEventComponent
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
