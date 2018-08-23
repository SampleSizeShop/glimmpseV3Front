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
            {path: 'MODE', component: UserModeComponent},
            {path: 'TARGET_EVENT', component: TargetEventComponent},
            {path: 'SOLVE_FOR', component: SolveForComponent},
            {path: 'STATISTICAL_TESTS', component: StatisticalTestsComponent},
            {path: 'TYPE_ONE_ERROR', component: TypeOneErrorComponent},
            {path: 'WITHIN_ISU_OUTCOMES', component: WithinIsuOutcomesComponent},
            {path: 'WITHIN_ISU_REPEATED_MEASURES', component: WithinIsuRepeatedMeasuresComponent},
            {path: 'WITHIN_ISU_CLUSTERS', component: WithinIsuClustersComponent},
            {path: 'BETWEEN_ISU_PREDICTORS', component: BetweenIsuPredictorsComponent},
            {path: 'BETWEEN_ISU_SMALLEST_GROUP', component: BetweenIsuSmallestGroupComponent},
            {
              path: 'BETWEEN_ISU_GROUPS/:index',
              component: BetweenIsuGroupsComponent
            },
            {
              path: 'BETWEEN_ISU_GROUPS',
              component: BetweenIsuGroupsComponent
            },
            {path: 'GAUSSIAN_COVARIATE', component: GaussianCovariateComponent},
            {path: 'HYPOTHESIS_EFFECT_CHOICE', component: HypothesisEffectChoiceComponent},
            {path: 'HYPOTHESIS_BETWEEN', component: HypothesisBetweenComponent},
            {path: 'HYPOTHESIS_WITHIN', component: HypothesisWithinComponent},
            {path: 'HYPOTHESIS_THETA_0', component: HypothesisTheta0Component},
            {
              path: 'PARAMETERS_MARGINAL_MEANS]/:index',
              component: ParametersMarginalMeansComponent,
              canActivate: [ MarginalMeansGuard ]
            },
            {
              path: 'PARAMETERS_SCALE_FACTOR',
              component: ParametersScaleFactorComponent,
              canActivate: [MarginalMeansGuard]},
            {path: 'PARAMETERS_STANDARD_DEVIATION', component: ParametersStandardDeviationComponent},
            {path: 'PARAMETERS_OUTCOME_CORRELATION', component: ParametersOutcomeCorrelationsComponent},
            {
              path: 'PARAMETERS_REPEATED_MEASURE_ST_DEV/:measure',
              component: ParametersRepeatedMeasureStdevComponent,
              canActivate: [ RepeatedMeasureGuard ] },
            {
              path: 'PARAMETERS_REPEATED_MEASURE_ST_DEV',
              component: ParametersRepeatedMeasureStdevComponent,
              canActivate: [ RepeatedMeasureGuard ] },
            {
              path: 'PARAMETERS_REPEATED_MEASURE_CORRELATION/:measure',
              component: ParametersRepeatedMeasureCorrelationsComponent,
              canActivate: [ RepeatedMeasureGuard ]
            },
            {
              path: 'PARAMETERS_REPEATED_MEASURE_CORRELATION',
              component: ParametersRepeatedMeasureCorrelationsComponent,
              canActivate: [ RepeatedMeasureGuard ]
            },
            {
              path: 'PARAMETERS_INTRA_CLASS_CORRELATION',
              component: ParametersIntraClassCorrelationComponent,
              canActivate: [ ClusterGuard ]
            },
            {
              path: 'PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE',
              component: ParametersGaussianCovariateVarianceComponent,
              canActivate: [ GaussianCovariateGuard ]
            },
            {
              path: 'PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION',
              component: ParametersGaussianCovariateCorrelationComponent,
              canActivate: [ GaussianCovariateGuard ]
            },
            {path: 'PARAMETERS_SCALE_FACTOR_VARIANCE', component: ParametersVarianceScaleFactorsComponent},
            {
              path: 'OPTIONAL_SPECS_POWER_METHOD',
              component: OptionalSpecsPowerMethodComponent,
              canActivate: [ GaussianCovariateGuard ]
            },
              {path: 'OPTIONAL_SPECS_POWER_CURVE_CHOICE', component: OptionalSpecsPowerCurveChoiceComponent},
              {
                path: 'OPTIONAL_SPECS_POWER_CURVE_AXES',
                component: OptionalSpecsPowerCurveAxesComponent,
                canActivate: [ PowerCurveGuard ]
              },
              {
                path: 'OPTIONAL_SPECS_POWER_CURVE_DATA_SERIES',
                component: OptionalSpecsPowerCurveDataSeriesComponent,
                canActivate: [ PowerCurveGuard ]
              },
            {
              path: 'OPTIONAL_SPECS_CI_CHOICE',
              component: OptionalSpecsCiChoiceComponent,
              canActivate: [ PowerCurveGuard ]
            },
            {
              path: 'OPTIONAL_SPECS_CI_ASSUMPTIONS',
              component: OptionalSpecsCiAssumptionsComponent,
              canActivate: [ PowerCurveGuard, ConfidenceIntervalGuard ]
            },
            {
              path: 'OPTIONAL_SPECS_CI_LOWER_TAIL',
              component: OptionalSpecsCiLowerTailComponent,
              canActivate: [ PowerCurveGuard, ConfidenceIntervalGuard ]
            },
            {
              path: 'OPTIONAL_SPECS_CI_UPPER_TAIL',
              component: OptionalSpecsCiUpperTailComponent,
              canActivate: [ PowerCurveGuard, ConfidenceIntervalGuard ]
            },
            {
              path: 'OPTIONAL_SPECS_CI_BETA_SAMPLE_SIZE',
              component: OptionalSpecsCiBetaSampleSizeComponent,
              canActivate: [ PowerCurveGuard, ConfidenceIntervalGuard ]
            },
            {
              path: 'OPTIONAL_SPECS_CI_BETA_DESIGN_MATRIX_RANK',
              component: OptionalSpecsCiBetaDesignMatrixRankComponent,
              canActivate: [ PowerCurveGuard, ConfidenceIntervalGuard ]
            },
            {path: 'CALCULATE', component: CalculateComponent}
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
