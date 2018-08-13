import { browser, by, element, protractor } from 'protractor';
import {UserModePo} from './user-mode/user-mode.po';
import {TargetEventPo} from './target-event/target-event.po';
import {SolveForPo} from './solve-for/solve-for.po';
import {StatisticalTestsPo} from './statistical-tests/statistical-tests.po';
import {TypeOneErrorPo} from './type-one-error/type-one-error.po';
import {WithinIsuOutcomesPo} from './within-isu-outcomes/within-isu-outcomes.po';
import {WithinIsuRepeatedMeasuresPo} from './within-isu-repeated-measures/within-isu-repeated-measures.po';
import {WithinIsuClustersPo} from './within-isu-clusters/within-isu-clusters.po';
import {BetweenIsuPredictorsPo} from './between-isu-predictors/between-isu-predictors.po';
import {BetweenIsuSmallestGroupPo} from './between-isu-smallest-group/between-isu-smallest-group.po';
import {BetweenIsuGroupsPo} from './between-isu-groups/between-isu-groups.po';
import {GaussianCovariatePo} from './gaussian-covariate/gaussian-covariate.po';
import {HypothesisEffectChoicePo} from './hypothesis-effect-choice/hypothesis-effect-choice.po';
import {HypothesisBetweenPo} from './hypothesis-between/hypothesis-between.po';
import {HypothesisTheta0Po} from './hypothesis-theta-0/hypothesis-theta0.po';
import {HypothesisWithinPo} from './hypothesis-within/hypothesis-within.po';
import {ParametersMarginalMeansPo} from './parameters-marginal-means/parameters-marginal-means.po';
import {ParametersScaleFactorPo} from './parameters-scale-factor/parameters-scale-factor.po';
import {ParametersStandardDeviationPo} from './parameters-standard-deviation/parameters-standard-deviation.po';
import {ParametersOutcomeCorrelationsPo} from './parameters-outcome-correlations/parameters-outcome-correlations.po';
import {ParametersVarianceScaleFactorsPo} from './parameters-variance-scale-factors/parameters-variance-scale-factors.po';
import {ParametersRepeatedMeasureOutcomeStdevPo} from './parameters-repeated-measure-outcome-stdev/parameters-repeated-measure-outcome-stdev.po';
import {ParametersRepeatedMeasureCorellationsPo} from './parameters-repeated-measure-correlations/parameters-repeated-measure-corellations.po';
import {ParametersIntraClassCorellationPo} from './parameters-intra-class-correlation/parameters-intra-class-corellation.po';
import {ParametersGaussianCovariateVariancePo} from './parameters-gaussian-covariate-variance/parameters-gaussian-covariate-variance.po';
import {ParametersGaussianCovariateCorellationPo} from './parameters-gaussian-covariate-correlation/parameters-gaussian-covariate-corellation.po';
import {OptionalSpecsPowerCurveChoicePo} from './optional-specs-power-curve-choice/optional-specs-power-curve-choice.po';
import {OptionalSpecsPowerMethodPo} from './optional-specs-power-method/optional-specs-power-method.po';

export class StudyFormComponentPage {
  user_mode: UserModePo;
  target_event: TargetEventPo;
  solve_for: SolveForPo;
  statistical_tests: StatisticalTestsPo;
  type_one_error: TypeOneErrorPo;
  outcomes: WithinIsuOutcomesPo;
  repeated_measures: WithinIsuRepeatedMeasuresPo;
  cluster: WithinIsuClustersPo;
  predictors: BetweenIsuPredictorsPo;
  smallest_group: BetweenIsuSmallestGroupPo;
  groups: BetweenIsuGroupsPo;
  gaussian_covatiate: GaussianCovariatePo;
  hypothesis: HypothesisEffectChoicePo;
  hypothesis_between: HypothesisBetweenPo;
  hypothesis_within: HypothesisWithinPo;
  theta0: HypothesisTheta0Po;
  marginal_means: ParametersMarginalMeansPo;
  parameters_scale_factor: ParametersScaleFactorPo;
  parameters_standard_deviation: ParametersStandardDeviationPo;
  parameters_outcome_correlation: ParametersOutcomeCorrelationsPo;
  parameters_outcome_repeated_measure_stdev: ParametersRepeatedMeasureOutcomeStdevPo;
  parameters_repeated_measure_correlations: ParametersRepeatedMeasureCorellationsPo;
  parameters_intra_class_correlation: ParametersIntraClassCorellationPo;
  parameters_gaussian_covariate_variance: ParametersGaussianCovariateVariancePo;
  parameters_gaussian_covariate_correlation: ParametersGaussianCovariateCorellationPo;
  parameters_scale_factor_variance: ParametersVarianceScaleFactorsPo;
  optional_specs_power_method: OptionalSpecsPowerMethodPo;
  optional_specs_power_curve_choice: OptionalSpecsPowerCurveChoicePo;

  constructor() {
    this.user_mode = new UserModePo();
    this.target_event = new TargetEventPo();
    this.solve_for = new SolveForPo();
    this.statistical_tests = new StatisticalTestsPo();
    this.type_one_error = new TypeOneErrorPo();
    this.outcomes = new WithinIsuOutcomesPo();
    this.repeated_measures = new WithinIsuRepeatedMeasuresPo();
    this.cluster = new WithinIsuClustersPo();
    this.predictors = new BetweenIsuPredictorsPo();
    this.smallest_group = new BetweenIsuSmallestGroupPo();
    this.groups = new BetweenIsuGroupsPo();
    this.gaussian_covatiate = new GaussianCovariatePo();
    this.hypothesis = new HypothesisEffectChoicePo();
    this.hypothesis_between = new HypothesisBetweenPo();
    this.hypothesis_within = new HypothesisWithinPo();
    this.theta0 = new HypothesisTheta0Po();
    this.marginal_means = new ParametersMarginalMeansPo();
    this.parameters_scale_factor = new ParametersScaleFactorPo();
    this.parameters_standard_deviation = new ParametersStandardDeviationPo();
    this.parameters_outcome_correlation = new ParametersOutcomeCorrelationsPo();
    this.parameters_outcome_repeated_measure_stdev = new ParametersRepeatedMeasureOutcomeStdevPo();
    this.parameters_repeated_measure_correlations = new ParametersRepeatedMeasureCorellationsPo();
    this.parameters_intra_class_correlation = new ParametersIntraClassCorellationPo();
    this.parameters_gaussian_covariate_variance = new ParametersGaussianCovariateVariancePo();
    this.parameters_gaussian_covariate_correlation = new ParametersGaussianCovariateCorellationPo();
    this.parameters_scale_factor_variance = new ParametersVarianceScaleFactorsPo();
    this.optional_specs_power_method = new OptionalSpecsPowerMethodPo();
    this.optional_specs_power_curve_choice = new OptionalSpecsPowerCurveChoicePo();
  }

  fromJSON(input) {
    this.user_mode.fromJSON(input);
    this.next();
    this.target_event.fromJSON(input);
    this.next();
    this.solve_for.fromJSON(input);
    this.next();
    this.statistical_tests.fromJSON(input);
    this.next();
    this.type_one_error.fromJSON(input);
    this.next();
    this.outcomes.fromJSON(input);
    this.next();
    this.repeated_measures.fromJSON(input);
    this.next();
    this.cluster.fromJSON(input);
    this.next();
    this.predictors.fromJSON(input);
    this.next();
    this.smallest_group.fromJSON(input);
    this.next();
    this.groups.fromJSON(input);
    this.next();
    this.gaussian_covatiate.fromJSON(input);
    this.next();
    this.hypothesis.fromJSON(input);
    this.next();
    this.hypothesis_between.fromJSON(input);
    this.next();
    this.hypothesis_within.fromJSON(input);
    this.next();
    this.theta0.fromJSON(input);
    this.next();
    this.marginal_means.fromJSON(input);
    this.next();
    this.parameters_scale_factor.fromJSON(input);
    this.next();
    this.parameters_standard_deviation.fromJSON(input);
    this.next();
    this.parameters_outcome_correlation.fromJSON(input);
    this.next();
    this.parameters_outcome_repeated_measure_stdev.fromJSON(input);
    this.next();
    this.parameters_repeated_measure_correlations.fromJSON(input);
    this.next();
    this.parameters_intra_class_correlation.fromJSON(input);
    this.next();
    this.parameters_gaussian_covariate_variance.fromJSON(input);
    this.next();
    this.parameters_gaussian_covariate_correlation.fromJSON(input);
    this.next();
    this.parameters_scale_factor_variance.fromJSON(input);
    this.next();
    this.optional_specs_power_method.fromJSON(input);
    this.next();
    this.optional_specs_power_curve_choice.fromJSON(input);
    this.next();
  }

  calculate() {
    element(by.id('calculate')).click();
    browser.sleep(4000);
  }

  navigateToHome() {
    return browser.get('/design');
  };

  navigateTo(subURL: string) {
    return browser.get(subURL);
  };

  next() {
    element(by.id('navigate_next')).click();
  };

  prev() {
    element(by.id('navigate_before')).click();
  };
}
