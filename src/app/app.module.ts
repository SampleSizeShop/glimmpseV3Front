import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MathJaxService} from './mathjax/mathjax.service';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {MathJaxDirective} from './mathjax/mathjax.directive';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import { ParametersGaussianCovariateCorrelationComponent } from './study-form/parameters-gaussian-covariate-correlation/parameters-gaussian-covariate-correlation.component';
import { ParametersVarianceScaleFactorsComponent } from './study-form/parameters-variance-scale-factors/parameters-variance-scale-factors.component';
import { ParametersGaussianCovariateVarianceComponent } from './study-form/parameters-gaussian-covariate-variance/parameters-gaussian-covariate-variance.component';
import { OptionalSpecsPowerMethodComponent } from './study-form/optional-specs-power-method/optional-specs-power-method.component';
import { OptionalSpecsCiChoiceComponent } from './study-form/optional-specs-ci-choice/optional-specs-ci-choice.component';
import { OptionalSpecsCiAssumptionsComponent } from './study-form/optional-specs-ci-assumptions/optional-specs-ci-assumptions.component';
import { OptionalSpecsCiLowerTailComponent } from './study-form/optional-specs-ci-lower-tail/optional-specs-ci-lower-tail.component';
import { OptionalSpecsCiUpperTailComponent } from './study-form/optional-specs-ci-upper-tail/optional-specs-ci-upper-tail.component';
import { OptionalSpecsCiBetaSampleSizeComponent } from './study-form/optional-specs-ci-beta-sample-size/optional-specs-ci-beta-sample-size.component';
import { OptionalSpecsCiBetaDesignMatrixRankComponent } from './study-form/optional-specs-ci-beta-design-matrix-rank/optional-specs-ci-beta-design-matrix-rank.component';
import { OptionalSpecsPowerCurveChoiceComponent } from './study-form/optional-specs-power-curve-choice/optional-specs-power-curve-choice.component';
import { OptionalSpecsPowerCurveAxesComponent } from './study-form/optional-specs-power-curve-axes/optional-specs-power-curve-axes.component';
import { OptionalSpecsPowerCurveDataSeriesComponent } from './study-form/optional-specs-power-curve-data-series/optional-specs-power-curve-data-series.component';
import { CalculateComponent } from './study-form/calculate/calculate.component';


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
    ParametersIntraClassCorrelationComponent,
    ParametersGaussianCovariateCorrelationComponent,
    ParametersVarianceScaleFactorsComponent,
    ParametersGaussianCovariateVarianceComponent,
    OptionalSpecsPowerMethodComponent,
    OptionalSpecsCiChoiceComponent,
    OptionalSpecsCiAssumptionsComponent,
    OptionalSpecsCiLowerTailComponent,
    OptionalSpecsCiUpperTailComponent,
    OptionalSpecsCiBetaSampleSizeComponent,
    OptionalSpecsCiBetaDesignMatrixRankComponent,
    OptionalSpecsPowerCurveChoiceComponent,
    OptionalSpecsPowerCurveAxesComponent,
    OptionalSpecsPowerCurveDataSeriesComponent,
    CalculateComponent
  ],
  imports: [
    NgbModule.forRoot(),
    LoggerModule.forRoot({
      serverLoggingUrl: environment.serverLoggingUrl,
      level: environment.loglevel,
      serverLogLevel: environment.serverLoglevel
    }),
    BsDropdownModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StudyFormRoutingModule,
    AppRoutingModule
  ],
  providers: [MathJaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
