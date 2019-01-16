import {RouterModule, Routes} from '@angular/router';
import {StudyFormComponent} from './study-form.component';
import {constants} from '../shared/constants';
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
import {CalculateComponent} from './calculate/calculate.component';
import {PowerCurveGuard} from '../shared/power-curve-guard.service';
import {ConfidenceIntervalGuard} from '../shared/ci-guard.service';
import {MarginalMeansGuard} from './parameters-marginal-means/marginal-means-guard.service';
import {BetweenIsuSmallestGroupComponent} from './between-isu-smallest-group/between-isu-smallest-group.component';
import {HypothesisTheta0Component} from './hypothesis-theta-0/hypothesis-theta-0.component';
import {CanDeactivatePredictorsGuardService} from './between-isu-predictors/can-deactivate-predictors-guard.service';
import {StudyTitleComponent} from './study-title/study-title.component';
import {OutcomeCorrelationsGuard} from '../shared/outcome-correlation-guard.service';
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
              path: names[constants.STAGES.STUDY_TITLE],
              component: StudyTitleComponent,
              data: {animation: constants.STAGES.STUDY_TITLE}
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
              canDeactivate: [CanDeactivatePredictorsGuardService],
              data: {animation: constants.STAGES.WITHIN_ISU_REPEATED_MEASURES}
            },
            {
              path: names[constants.STAGES.WITHIN_ISU_CLUSTERS],
              component: WithinIsuClustersComponent,
              canDeactivate: [CanDeactivatePredictorsGuardService],
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
              data: {animation: constants.STAGES.PARAMETERS_OUTCOME_CORRELATION},
              canActivate: [ OutcomeCorrelationsGuard ]
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
    MarginalMeansGuard,
    OutcomeCorrelationsGuard
  ]
})
export class StudyFormRoutingModule {}
