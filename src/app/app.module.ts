import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MathJaxService} from './mathjax/mathjax.service';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {MathJaxDirective} from './mathjax/mathjax.directive';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing-module';
import {UserModeComponent} from './user-mode/user-mode.component';
import {StudyFormComponent} from './study-form/study-form.component';
import {TargetEventComponent} from './target-event/target-event.component';
import {SolveForComponent} from './solve-for/solve-for.component';
import {LoggerModule} from 'ngx-logger';
import {environment} from '../environments/environment';
import { StatisticalTestsComponent } from './statistical-tests/statistical-tests.component';
import { TypeOneErrorComponent } from './type-one-error/type-one-error.component';
import { CorrelationMatrixComponent } from './correlation-matrix/correlation-matrix.component';
import { WithinIsuOutcomesComponent } from './within-isu-outcomes/within-isu-outcomes.component';
import { WithinIsuRepeatedMeasuresComponent } from './within-isu-repeated-measures/within-isu-repeated-measures.component';
import { WithinIsuClustersComponent } from './within-isu-clusters/within-isu-clusters.component';


@NgModule({
  declarations: [
    AppComponent,
    MathJaxComponent,
    MathJaxDirective,
    UserModeComponent,
    StudyFormComponent,
    TargetEventComponent,
    SolveForComponent,
    StatisticalTestsComponent,
    TypeOneErrorComponent,
    CorrelationMatrixComponent,
    WithinIsuOutcomesComponent,
    WithinIsuRepeatedMeasuresComponent,
    WithinIsuClustersComponent
  ],
  imports: [
    LoggerModule.forRoot({serverLoggingUrl: environment.serverLoggingUrl, level: environment.loglevel} ),
    BsDropdownModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [MathJaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
