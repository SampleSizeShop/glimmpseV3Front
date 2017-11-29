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
import {ParametersStandardDeviationComponent} from './parameters-standard-deviation/parameters-standard-deviation.component';
import {ParametersOutcomeCorrelationsComponent} from "./parameters-outcome-correlations/parameters-outcome-correlations.component";
import {ParametersRepeatedMeasureOutcomeCorrelationsComponent} from "./parameters-repeated-measure-outcome-correlations/parameters-repeated-measure-outcome-correlations.component";
import {ParametersRepeatedMeasureCorrelationsComponent} from "./parameters-repeated-measure-correlations/parameters-repeated-measure-correlations.component";

const routes: Routes = [
  {path: 'mathjax', component: MathJaxComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
