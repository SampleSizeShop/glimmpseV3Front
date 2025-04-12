import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MathJaxService} from './mathjax/mathjax.service';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {MathJaxDirective} from './mathjax/mathjax.directive';

import {NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing-module';
import {UserModeComponent} from './study-form/user-mode/user-mode.component';
import {StudyFormComponent} from './study-form/study-form.component';
import {SolveForComponent} from './study-form/solve-for/solve-for.component';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
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
import {ParametersRepeatedMeasureStdevComponent} from './study-form/parameters-repeated-measure-stdev/parameters-repeated-measure-stdev.component';
import { ParametersIntraClassCorrelationComponent } from './study-form/parameters-intra-class-correlation/parameters-intra-class-correlation.component';
import { ParametersGaussianCovariateCorrelationComponent } from './study-form/parameters-gaussian-covariate-correlation/parameters-gaussian-covariate-correlation.component';
import { ParametersVarianceScaleFactorsComponent } from './study-form/parameters-variance-scale-factors/parameters-variance-scale-factors.component';
import { ParametersGaussianCovariateVarianceComponent } from './study-form/parameters-gaussian-covariate-variance/parameters-gaussian-covariate-variance.component';
import { CalculateComponent } from './study-form/calculate/calculate.component';
import { BetweenIsuSmallestGroupComponent } from './study-form/between-isu-smallest-group/between-isu-smallest-group.component';
import { HypothesisTheta0Component } from './study-form/hypothesis-theta-0/hypothesis-theta-0.component';
import { CustomContrastMatrixComponent } from './study-form/custom-contrast-matrix/custom-contrast-matrix.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { StudyTitleComponent } from './study-form/study-title/study-title.component';
import {ParametersGaussianPowerComponent} from './study-form/parameters-gaussian-power/parameters-gaussian-power.component';
import {OptionalSpecsConfidenceIntervalsComponent} from './study-form/optional-specs-confidence-intervals/optional-specs-confidence-intervals.component';
import { LinkVisualComponent } from './d3/visuals/shared/link-visual/link-visual.component';
import { NodeVisualComponent } from './d3/visuals/shared/node-visual/node-visual.component';
import {ZoomableDirective} from './d3/directives/zoomable.directive';
import {CollapsibleTreeComponent} from './d3/visuals/collapsible-tree/collapsible-tree.component';
import {D3Service} from './d3/d3.service';
import {HypothesisMixedComponent} from './study-form/hypothesis-mixed/hypothesis-mixed.component';
import { StatusComponent } from './study-form/status/status.component';
import {CustomHammerConfig} from './hammer/CustomHammerConfig';
import { ControlHelpTextComponent } from './study-form/control-help-text/control-help-text.component';
import { TargetPowerComponent } from './study-form/target-power/target-power.component';
import {authStrategyProvider} from './shared/services/auth.strategy';
import {AuthModule} from '@auth0/auth0-angular';
import {AccordionModule} from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    AppComponent,
    MathJaxComponent,
    MathJaxDirective,
    UserModeComponent,
    StudyFormComponent,
    SolveForComponent,
    StatisticalTestsComponent,
    TypeOneErrorComponent,
    CorrelationMatrixComponent,
    WithinIsuOutcomesComponent,
    WithinIsuRepeatedMeasuresComponent,
    WithinIsuClustersComponent,
    BetweenIsuPredictorsComponent,
    BetweenIsuGroupsComponent,
    BetweenIsuSmallestGroupComponent,
    GaussianCovariateComponent,
    HypothesisEffectChoiceComponent,
    HypothesisMixedComponent,
    HypothesisBetweenComponent,
    HypothesisWithinComponent,
    HypothesisTheta0Component,
    ParametersMarginalMeansComponent,
    ParametersScaleFactorComponent,
    ParametersStandardDeviationComponent,
    ParametersOutcomeCorrelationsComponent,
    ParametersRepeatedMeasureStdevComponent,
    ParametersRepeatedMeasureCorrelationsComponent,
    ParametersIntraClassCorrelationComponent,
    ParametersGaussianCovariateCorrelationComponent,
    ParametersGaussianPowerComponent,
    ParametersVarianceScaleFactorsComponent,
    ParametersGaussianCovariateVarianceComponent,
    OptionalSpecsConfidenceIntervalsComponent,
    CalculateComponent,
    BetweenIsuSmallestGroupComponent,
    CustomContrastMatrixComponent,
    StudyTitleComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    ZoomableDirective,
    CollapsibleTreeComponent,
    StatusComponent,
    ControlHelpTextComponent,
    TargetPowerComponent,
  ],
  imports: [
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'samplesizeshop.us.auth0.com',
      clientId: 'Xas70BGaLbcH45TzCgSCUtU2ve9pTOaw',
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    // Local settings
    // AuthModule.forRoot({
    //   domain: 'dev-9mnzuul1.us.auth0.com',
    //   clientId: 'UL74O5heOlXTVbClBnAYpjIHhAfA7ilP'
    // }),
    // AuthModule.forRoot({
    //   domain: 'dev-a2swjm1l.us.auth0.com',
    //   clientId: 'w62sDH2I34hTs3QmQn7YylyA54n48fbr',
    //   useRefreshTokens: true,
    //   cacheLocation: 'localstorage',
    //   authorizationParams: {
    //     redirect_uri: window.location.origin
    //   }
    // }),
    NgbModule,
    NgbAccordionModule,
    LoggerModule.forRoot({
      serverLoggingUrl: environment.serverLoggingUrl,
      level: NgxLoggerLevel.INFO,
      serverLogLevel: NgxLoggerLevel.ERROR
    }),
    BsDropdownModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StudyFormRoutingModule,
    AppRoutingModule,
    MatTooltipModule,
    MatIconModule,
    AccordionModule,
    // Angular2CsvModule
  ],
  providers: [
    Title,
    MathJaxService,
    D3Service,
    {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
    authStrategyProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
