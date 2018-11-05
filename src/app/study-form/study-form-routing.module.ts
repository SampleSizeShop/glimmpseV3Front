import {RouterModule, Routes} from '@angular/router';
import {StudyFormComponent} from './study-form.component';
import {constants} from '../shared/constants';
import {UserModeComponent} from './user-mode/user-mode.component';
import {TargetEventComponent} from './target-event/target-event.component';
import {SolveForComponent} from './solve-for/solve-for.component';
import {StatisticalTestsComponent} from './statistical-tests/statistical-tests.component';
import {TypeOneErrorComponent} from './type-one-error/type-one-error.component';
import {WithinIsuOutcomesComponent} from './within-isu-outcomes/within-isu-outcomes.component';
import {WithinIsuRepeatedMeasuresComponent} from './within-isu-repeated-measures/within-isu-repeated-measures.component';
import {WithinIsuClustersComponent} from './within-isu-clusters/within-isu-clusters.component';
import {BetweenIsuPredictorsComponent} from './between-isu-predictors/between-isu-predictors.component';
import {BetweenIsuGroupsComponent} from './between-isu-groups/between-isu-groups.component';
import {GaussianCovariateComponent} from './gaussian-covariate/gaussian-covariate.component';
import {HypothesisEffectChoiceComponent} from './hypothesis-effect-choice/hypothesis-effect-choice.component';
import {HypothesisBetweenComponent} from './hypothesis-between/hypothesis-between.component';
import {HypothesisWithinComponent} from './hypothesis-within/hypothesis-within.component';
import {ParametersMarginalMeansComponent} from './parameters-marginal-means/parameters-marginal-means.component';
import {ParametersScaleFactorComponent} from './parameters-scale-factor/parameters-scale-factor.component';
import {ParametersStandardDeviationComponent} from './parameters-standard-deviation/parameters-standard-deviation.component';
import {ParametersOutcomeCorrelationsComponent} from './parameters-outcome-correlations/parameters-outcome-correlations.component';
import {ParametersRepeatedMeasureStdevComponent} from './parameters-repeated-measure-stdev/parameters-repeated-measure-stdev.component';
import {ParametersRepeatedMeasureCorrelationsComponent} from './parameters-repeated-measure-correlations/parameters-repeated-measure-correlations.component';
import {NgModule} from '@angular/core';
import {StudyFormGuard} from './study-form-guard.service';
import {StudyService} from './study.service';
import {RepeatedMeasureGuard} from '../shared/repeated-measure-guard.service';
import {NavigationService} from '../shared/navigation.service';
import {ParametersIntraClassCorrelationComponent} from './parameters-intra-class-correlation/parameters-intra-class-correlation.component';
import {ClusterGuard} from '../shared/cluster-guard.service';
import {ParametersVarianceScaleFactorsComponent} from './parameters-variance-scale-factors/parameters-variance-scale-factors.component';
import {ParametersGaussianCovariateCorrelationComponent} from './parameters-gaussian-covariate-correlation/parameters-gaussian-covariate-correlation.component';
import {GaussianCovariateGuard} from '../shared/gaussian-covariate-guard.service';
import {ParametersGaussianCovariateVarianceComponent} from './parameters-gaussian-covariate-variance/parameters-gaussian-covariate-variance.component';
import {OptionalSpecsPowerMethodComponent} from './optional-specs-power-method/optional-specs-power-method.component';
import {CalculateComponent} from './calculate/calculate.component';
import {OptionalSpecsPowerCurveDataSeriesComponent} from './optional-specs-power-curve-data-series/optional-specs-power-curve-data-series.component';
import {OptionalSpecsPowerCurveAxesComponent} from './optional-specs-power-curve-axes/optional-specs-power-curve-axes.component';
import {OptionalSpecsPowerCurveChoiceComponent} from './optional-specs-power-curve-choice/optional-specs-power-curve-choice.component';
import {OptionalSpecsCiBetaDesignMatrixRankComponent} from './optional-specs-ci-beta-design-matrix-rank/optional-specs-ci-beta-design-matrix-rank.component';
import {OptionalSpecsCiBetaSampleSizeComponent} from './optional-specs-ci-beta-sample-size/optional-specs-ci-beta-sample-size.component';
import {OptionalSpecsCiUpperTailComponent} from './optional-specs-ci-upper-tail/optional-specs-ci-upper-tail.component';
import {OptionalSpecsCiLowerTailComponent} from './optional-specs-ci-lower-tail/optional-specs-ci-lower-tail.component';
import {OptionalSpecsCiAssumptionsComponent} from './optional-specs-ci-assumptions/optional-specs-ci-assumptions.component';
import {OptionalSpecsCiChoiceComponent} from './optional-specs-ci-choice/optional-specs-ci-choice.component';
import {PowerCurveGuard} from '../shared/power-curve-guard.service';
import {ConfidenceIntervalGuard} from '../shared/ci-guard.service';
import {MarginalMeansGuard} from './parameters-marginal-means/marginal-means-guard.service';
import {BetweenIsuSmallestGroupComponent} from './between-isu-smallest-group/between-isu-smallest-group.component';
import {HypothesisTheta0Component} from './hypothesis-theta-0/hypothesis-theta-0.component';
import {CanDeactivatePredictorsGuardService} from './between-isu-predictors/can-deactivate-predictors-guard.service';
const names = [];
Object.keys(constants.STAGES).forEach(key => {names.push(key)});

const studyFormRoutes: Routes = [
      {
        path: 'design',
        component: StudyFormComponent,
        canActivate: [StudyFormGuard],
        children: [
          {
            path: '',
            children: [
            {
              path: names[constants.STAGES.MODE],
              component: UserModeComponent,
              data: {animation: constants.STAGES.MODE}
            },
            {
              path: names[constants.STAGES.TARGET_EVENT],
              component: TargetEventComponent,
              data: {animation: constants.STAGES.TARGET_EVENT}
            },
            {
              path: names[constants.STAGES.SOLVE_FOR],
              component: SolveForComponent,
              data: {animation: constants.STAGES.SOLVE_FOR}
            },
            {
              path: names[constants.STAGES.STATISTICAL_TESTS],
              component: StatisticalTestsComponent,
              data: {animation: constants.STAGES.STATISTICAL_TESTS}
            },
            {
              path: names[constants.STAGES.TYPE_ONE_ERROR],
              component: TypeOneErrorComponent,
              data: {animation: constants.STAGES.TYPE_ONE_ERROR}
            },
            {
              path: names[constants.STAGES.WITHIN_ISU_OUTCOMES],
              component: WithinIsuOutcomesComponent,
              data: {animation: constants.STAGES.WITHIN_ISU_OUTCOMES}
            },
            {
              path: names[constants.STAGES.WITHIN_ISU_REPEATED_MEASURES],
              component: WithinIsuRepeatedMeasuresComponent,
              data: {animation: constants.STAGES.WITHIN_ISU_REPEATED_MEASURES}
            },
            {
              path: names[constants.STAGES.WITHIN_ISU_CLUSTERS],
              component: WithinIsuClustersComponent,
              data: {animation: constants.STAGES.WITHIN_ISU_CLUSTERS}
            },
            {
              path: names[constants.STAGES.BETWEEN_ISU_PREDICTORS],
              component: BetweenIsuPredictorsComponent,
              canDeactivate: [CanDeactivatePredictorsGuardService],
              data: {animation: constants.STAGES.BETWEEN_ISU_PREDICTORS}
            },
            {
              path: names[constants.STAGES.BETWEEN_ISU_SMALLEST_GROUP],
              component: BetweenIsuSmallestGroupComponent,
              data: {animation: constants.STAGES.BETWEEN_ISU_SMALLEST_GROUP}
            },
            {
              path: names[constants.STAGES.BETWEEN_ISU_GROUPS] + '/:index',
              component: BetweenIsuGroupsComponent,
              data: {animation: constants.STAGES.BETWEEN_ISU_GROUPS}
            },
            {
              path: names[constants.STAGES.BETWEEN_ISU_GROUPS],
              component: BetweenIsuGroupsComponent,
              data: {animation: constants.STAGES.BETWEEN_ISU_GROUPS}
            },
            {path: names[constants.STAGES.GAUSSIAN_COVARIATE],
              component: GaussianCovariateComponent,
              data: {animation: constants.STAGES.GAUSSIAN_COVARIATE}
            },
            {
              path: names[constants.STAGES.HYPOTHESIS_EFFECT_CHOICE],
              component: HypothesisEffectChoiceComponent,
              data: {animation: constants.STAGES.HYPOTHESIS_EFFECT_CHOICE}
            },
            {
              path: names[constants.STAGES.HYPOTHESIS_BETWEEN],
              component: HypothesisBetweenComponent,
              canDeactivate: [CanDeactivatePredictorsGuardService],
              data: {animation: constants.STAGES.HYPOTHESIS_BETWEEN}
            },
            {
              path: names[constants.STAGES.HYPOTHESIS_WITHIN],
              component: HypothesisWithinComponent,
              canDeactivate: [CanDeactivatePredictorsGuardService],
              data: {animation: constants.STAGES.HYPOTHESIS_WITHIN}
            },
            {
              path: names[constants.STAGES.HYPOTHESIS_THETA_0],
              component: HypothesisTheta0Component,
              data: {animation: constants.STAGES.HYPOTHESIS_THETA_0}
            },
            {
              path: names[constants.STAGES.PARAMETERS_MARGINAL_MEANS] + '/:index',
              component: ParametersMarginalMeansComponent,
              data: {animation: constants.STAGES.PARAMETERS_MARGINAL_MEANS},
              canActivate: [ MarginalMeansGuard ]
            },
            {
              path: names[constants.STAGES.PARAMETERS_SCALE_FACTOR],
              component: ParametersScaleFactorComponent,
              data: {animation: constants.STAGES.PARAMETERS_SCALE_FACTOR},
              canActivate: [MarginalMeansGuard]},
            {
              path: names[constants.STAGES.PARAMETERS_STANDARD_DEVIATION],
              component: ParametersStandardDeviationComponent,
              data: {animation: constants.STAGES.PARAMETERS_STANDARD_DEVIATION}
            },
            {
              path: names[constants.STAGES.PARAMETERS_OUTCOME_CORRELATION],
              component: ParametersOutcomeCorrelationsComponent,
              data: {animation: constants.STAGES.PARAMETERS_OUTCOME_CORRELATION}
            },
            {
              path: names[constants.STAGES.PARAMETERS_REPEATED_MEASURE_ST_DEV] + '/:measure',
              component: ParametersRepeatedMeasureStdevComponent,
              data: {animation: constants.STAGES.PARAMETERS_REPEATED_MEASURE_ST_DEV},
              canActivate: [ RepeatedMeasureGuard ] },
            {
              path: names[constants.STAGES.PARAMETERS_REPEATED_MEASURE_ST_DEV],
              component: ParametersRepeatedMeasureStdevComponent,
              data: {animation: constants.STAGES.PARAMETERS_REPEATED_MEASURE_ST_DEV},
              canActivate: [ RepeatedMeasureGuard ] },
            {
              path: names[constants.STAGES.PARAMETERS_REPEATED_MEASURE_CORRELATION] + '/:measure',
              component: ParametersRepeatedMeasureCorrelationsComponent,
              data: {animation: constants.STAGES.PARAMETERS_REPEATED_MEASURE_CORRELATION},
              canActivate: [ RepeatedMeasureGuard ]
            },
            {
              path: names[constants.STAGES.PARAMETERS_REPEATED_MEASURE_CORRELATION],
              component: ParametersRepeatedMeasureCorrelationsComponent,
              data: {animation: constants.STAGES.PARAMETERS_REPEATED_MEASURE_CORRELATION},
              canActivate: [ RepeatedMeasureGuard ]
            },
            {
              path: names[constants.STAGES.PARAMETERS_INTRA_CLASS_CORRELATION],
              component: ParametersIntraClassCorrelationComponent,
              data: {animation: constants.STAGES.PARAMETERS_INTRA_CLASS_CORRELATION},
              canActivate: [ ClusterGuard ]
            },
            {
              path: names[constants.STAGES.PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE],
              component: ParametersGaussianCovariateVarianceComponent,
              data: {animation: constants.STAGES.PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE},
              canActivate: [ GaussianCovariateGuard ]
            },
            {
              path: names[constants.STAGES.PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION],
              component: ParametersGaussianCovariateCorrelationComponent,
              data: {animation: constants.STAGES.PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION},
              canActivate: [ GaussianCovariateGuard ]
            },
            {
              path: names[constants.STAGES.PARAMETERS_SCALE_FACTOR_VARIANCE],
              component: ParametersVarianceScaleFactorsComponent,
              data: {animation: constants.STAGES.PARAMETERS_SCALE_FACTOR_VARIANCE}
            },
            {
              path: names[constants.STAGES.OPTIONAL_SPECS_POWER_METHOD],
              component: OptionalSpecsPowerMethodComponent,
              data: {animation: constants.STAGES.OPTIONAL_SPECS_POWER_METHOD},
              canActivate: [ GaussianCovariateGuard ]
            },
            {
              path: names[constants.STAGES.OPTIONAL_SPECS_POWER_CURVE_CHOICE],
              component: OptionalSpecsPowerCurveChoiceComponent,
              data: {animation: constants.STAGES.OPTIONAL_SPECS_POWER_CURVE_CHOICE}
            },
            {
              path: names[constants.STAGES.OPTIONAL_SPECS_POWER_CURVE_AXES],
              component: OptionalSpecsPowerCurveAxesComponent,
              data: {animation: constants.STAGES.OPTIONAL_SPECS_POWER_CURVE_AXES},
              canActivate: [ PowerCurveGuard ]
            },
            {
              path: names[constants.STAGES.OPTIONAL_SPECS_POWER_CURVE_DATA_SERIES],
              component: OptionalSpecsPowerCurveDataSeriesComponent,
              data: {animation: constants.STAGES.OPTIONAL_SPECS_POWER_CURVE_DATA_SERIES},
              canActivate: [ PowerCurveGuard ]
            },
            {
              path: names[constants.STAGES.OPTIONAL_SPECS_CI_CHOICE],
              component: OptionalSpecsCiChoiceComponent,
              data: {animation: constants.STAGES.OPTIONAL_SPECS_CI_CHOICE},
              canActivate: [ PowerCurveGuard ]
            },
            {
              path: names[constants.STAGES.OPTIONAL_SPECS_CI_ASSUMPTIONS],
              component: OptionalSpecsCiAssumptionsComponent,
              data: {animation: constants.STAGES.OPTIONAL_SPECS_CI_ASSUMPTIONS},
              canActivate: [ PowerCurveGuard, ConfidenceIntervalGuard ]
            },
            {
              path: names[constants.STAGES.OPTIONAL_SPECS_CI_LOWER_TAIL],
              component: OptionalSpecsCiLowerTailComponent,
              data: {animation: constants.STAGES.OPTIONAL_SPECS_CI_LOWER_TAIL},
              canActivate: [ PowerCurveGuard, ConfidenceIntervalGuard ]
            },
            {
              path: names[constants.STAGES.OPTIONAL_SPECS_CI_UPPER_TAIL],
              component: OptionalSpecsCiUpperTailComponent,
              data: {animation: constants.STAGES.OPTIONAL_SPECS_CI_UPPER_TAIL},
              canActivate: [ PowerCurveGuard, ConfidenceIntervalGuard ]
            },
            {
              path: names[constants.STAGES.OPTIONAL_SPECS_CI_BETA_SAMPLE_SIZE],
              component: OptionalSpecsCiBetaSampleSizeComponent,
              data: {animation: constants.STAGES.OPTIONAL_SPECS_CI_BETA_SAMPLE_SIZE},
              canActivate: [ PowerCurveGuard, ConfidenceIntervalGuard ]
            },
            {
              path: names[constants.STAGES.OPTIONAL_SPECS_CI_BETA_DESIGN_MATRIX_RANK],
              component: OptionalSpecsCiBetaDesignMatrixRankComponent,
              data: {animation: constants.STAGES.OPTIONAL_SPECS_CI_BETA_DESIGN_MATRIX_RANK},
              canActivate: [ PowerCurveGuard, ConfidenceIntervalGuard ]
            },
            {
              path: names[constants.STAGES.CALCULATE],
              component: CalculateComponent,
              data: {animation: constants.STAGES.CALCULATE}
            }
            ]
          }
        ]
      }
];

@NgModule({
  imports: [
    RouterModule.forChild(studyFormRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivatePredictorsGuardService,
    StudyService,
    NavigationService,
    StudyFormGuard,
    RepeatedMeasureGuard,
    ClusterGuard,
    GaussianCovariateGuard,
    ConfidenceIntervalGuard,
    PowerCurveGuard,
    MarginalMeansGuard
  ]
})
export class StudyFormRoutingModule {}
