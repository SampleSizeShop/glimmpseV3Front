import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {StudyFormComponent} from './study-form/study-form.component';
import {constants} from './shared/constants';
import {ParametersMarginalMeansComponent} from './parameters-marginal-means/parameters-marginal-means.component';
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
import {HypothesisWithinComponent} from './hypothesis-within/hypothesis-within.component';
import {HypothesisBetweenComponent} from './hypothesis-between/hypothesis-between.component';
import {ParametersScaleFactorComponent} from './parameters-scale-factor/parameters-scale-factor.component';

const routes: Routes = [
  {path: 'mathjax', component: MathJaxComponent},
  {path: 'design', component: StudyFormComponent,
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
      {path: constants.STAGES[16], component: ParametersScaleFactorComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
