import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MathJaxComponent} from './mathjax/mathjax.component';
import {StudyFormComponent} from './study-form/study-form.component';
import {constants} from './shared/constants';
import {ParametersMarginalMeansComponent} from './study-form/parameters-marginal-means/parameters-marginal-means.component';
import {UserModeComponent} from './study-form/user-mode/user-mode.component';
import {TargetEventComponent} from './study-form/target-event/target-event.component';
import {SolveForComponent} from './study-form/solve-for/solve-for.component';
import {StatisticalTestsComponent} from './study-form/statistical-tests/statistical-tests.component';
import {TypeOneErrorComponent} from './study-form/type-one-error/type-one-error.component';
import {WithinIsuOutcomesComponent} from './study-form/within-isu-outcomes/within-isu-outcomes.component';
import {WithinIsuRepeatedMeasuresComponent} from './study-form/within-isu-repeated-measures/within-isu-repeated-measures.component';
import {WithinIsuClustersComponent} from './study-form/within-isu-clusters/within-isu-clusters.component';
import {BetweenIsuPredictorsComponent} from './study-form/between-isu-predictors/between-isu-predictors.component';
import {BetweenIsuGroupsComponent} from './study-form/between-isu-groups/between-isu-groups.component';
import {GaussianCovariateComponent} from './study-form/gaussian-covariate/gaussian-covariate.component';
import {HypothesisEffectChoiceComponent} from './study-form/hypothesis-effect-choice/hypothesis-effect-choice.component';
import {HypothesisWithinComponent} from './study-form/hypothesis-within/hypothesis-within.component';
import {HypothesisBetweenComponent} from './study-form/hypothesis-between/hypothesis-between.component';
import {ParametersScaleFactorComponent} from './study-form/parameters-scale-factor/parameters-scale-factor.component';
import {ParametersStandardDeviationComponent} from './study-form/parameters-standard-deviation/parameters-standard-deviation.component';
import {ParametersOutcomeCorrelationsComponent} from "./study-form/parameters-outcome-correlations/parameters-outcome-correlations.component";
import {ParametersRepeatedMeasureOutcomeCorrelationsComponent} from "./study-form/parameters-repeated-measure-outcome-correlations/parameters-repeated-measure-outcome-correlations.component";
import {ParametersRepeatedMeasureCorrelationsComponent} from "./study-form/parameters-repeated-measure-correlations/parameters-repeated-measure-correlations.component";

const routes: Routes = [
  {path: 'mathjax', component: MathJaxComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
