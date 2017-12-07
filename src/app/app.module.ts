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
import {UserModeComponent} from './study-form/user-mode/user-mode.component';
import {StudyFormComponent} from './study-form/study-form.component';
import {TargetEventComponent} from './study-form/target-event/target-event.component';
import {SolveForComponent} from './study-form/solve-for/solve-for.component';
import {LoggerModule} from 'ngx-logger';
import {environment} from '../environments/environment';
import { StatisticalTestsComponent } from './study-form/statistical-tests/statistical-tests.component';
import { TypeOneErrorComponent } from './study-form/type-one-error/type-one-error.component';
import { CorrelationMatrixComponent } from './study-form/correlation-matrix/correlation-matrix.component';
import { WithinIsuOutcomesComponent } from './study-form/within-isu-outcomes/within-isu-outcomes.component';
import { WithinIsuRepeatedMeasuresComponent } from './study-form/within-isu-repeated-measures/within-isu-repeated-measures.component';
import { WithinIsuClustersComponent } from './study-form/within-isu-clusters/within-isu-clusters.component';
import { BetweenIsuPredictorsComponent } from './study-form/between-isu-predictors/between-isu-predictors.component';
import { BetweenIsuGroupsComponent } from './study-form/between-isu-groups/between-isu-groups.component';
import { GaussianCovariateComponent } from './study-form/gaussian-covariate/gaussian-covariate.component';
import { HypothesisEffectChoiceComponent } from './study-form/hypothesis-effect-choice/hypothesis-effect-choice.component';
import { HypothesisBetweenComponent } from './study-form/hypothesis-between/hypothesis-between.component';
import { HypothesisWithinComponent } from './study-form/hypothesis-within/hypothesis-within.component';
import { ParametersMarginalMeansComponent } from './study-form/parameters-marginal-means/parameters-marginal-means.component';
import { ParametersScaleFactorComponent } from './study-form/parameters-scale-factor/parameters-scale-factor.component';
import { ParametersStandardDeviationComponent } from './study-form/parameters-standard-deviation/parameters-standard-deviation.component';
import { ParametersOutcomeCorrelationsComponent } from './study-form/parameters-outcome-correlations/parameters-outcome-correlations.component';
import { ParametersRepeatedMeasureCorrelationsComponent } from './study-form/parameters-repeated-measure-correlations/parameters-repeated-measure-correlations.component';
import {StudyFormRoutingModule} from './study-form/study-form-routing.module';
import {ParametersRepeatedMeasureOutcomeStDevComponent} from './study-form/parameters-repeated-measure-outcome-stdev/parameters-repeated-measure-outcome-stdev.component';
import { ParametersIntraClassCorrelationComponent } from './study-form/parameters-intra-class-correlation/parameters-intra-class-correlation.component';


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
    WithinIsuClustersComponent,
    BetweenIsuPredictorsComponent,
    BetweenIsuGroupsComponent,
    GaussianCovariateComponent,
    HypothesisEffectChoiceComponent,
    HypothesisBetweenComponent,
    HypothesisWithinComponent,
    ParametersMarginalMeansComponent,
    ParametersScaleFactorComponent,
    ParametersStandardDeviationComponent,
    ParametersOutcomeCorrelationsComponent,
    ParametersRepeatedMeasureOutcomeStDevComponent,
    ParametersRepeatedMeasureCorrelationsComponent,
    ParametersIntraClassCorrelationComponent
  ],
  imports: [
    LoggerModule.forRoot({serverLoggingUrl: environment.serverLoggingUrl, level: environment.loglevel} ),
    BsDropdownModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    StudyFormRoutingModule,
    AppRoutingModule
  ],
  providers: [MathJaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
