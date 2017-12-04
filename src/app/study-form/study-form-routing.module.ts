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
import {ParametersRepeatedMeasureOutcomeCorrelationsComponent} from './parameters-repeated-measure-outcome-correlations/parameters-repeated-measure-outcome-correlations.component';
import {ParametersRepeatedMeasureCorrelationsComponent} from './parameters-repeated-measure-correlations/parameters-repeated-measure-correlations.component';
import {NgModule} from '@angular/core';
import {StudyFormGuard} from './study-form-guard.service';
import {StudyService} from "./study.service";
import {RepeatedMeasureGuard} from "../shared/repeated-measure-guard.service";

const studyFormRoutes: Routes = [
      {
        path: 'design',
        component: StudyFormComponent,
        canActivate: [StudyFormGuard],
        children: [
          {
            path: '',
            children: [
            {path: constants.STAGES[1], component: UserModeComponent},
            {path: constants.STAGES[2], component: TargetEventComponent},
            {path: constants.STAGES[3], component: SolveForComponent},
            {path: constants.STAGES[4], component: StatisticalTestsComponent},
            {path: constants.STAGES[5], component: TypeOneErrorComponent},
            {path: constants.STAGES[6], component: WithinIsuOutcomesComponent},
            {path: constants.STAGES[7], component: WithinIsuRepeatedMeasuresComponent},
            {path: constants.STAGES[8], component: WithinIsuClustersComponent},
            {path: constants.STAGES[9], component: BetweenIsuPredictorsComponent},
            {path: constants.STAGES[10], component: BetweenIsuGroupsComponent},
            {path: constants.STAGES[11], component: GaussianCovariateComponent},
            {path: constants.STAGES[12], component: HypothesisEffectChoiceComponent},
            {path: constants.STAGES[13], component: HypothesisBetweenComponent},
            {path: constants.STAGES[14], component: HypothesisWithinComponent},
            {path: constants.STAGES[15], component: ParametersMarginalMeansComponent},
            {path: constants.STAGES[16], component: ParametersScaleFactorComponent},
            {path: constants.STAGES[17], component: ParametersStandardDeviationComponent},
            {path: constants.STAGES[18], component: ParametersOutcomeCorrelationsComponent},
            {
              path: constants.STAGES[19],
              component: ParametersRepeatedMeasureOutcomeCorrelationsComponent,
              canActivate: [ RepeatedMeasureGuard ] },
            {
              path: constants.STAGES[20] + '/:meas',
              component: ParametersRepeatedMeasureCorrelationsComponent,
              canActivate: [ RepeatedMeasureGuard ]
            },
            {
              path: constants.STAGES[20],
              component: ParametersRepeatedMeasureCorrelationsComponent,
              canActivate: [ RepeatedMeasureGuard ]
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
    StudyService,
    StudyFormGuard,
    RepeatedMeasureGuard
  ]
})
export class StudyFormRoutingModule {}
