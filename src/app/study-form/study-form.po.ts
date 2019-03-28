import { browser, by, element } from 'protractor';
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
import {ParametersRepeatedMeasureStdevPo} from './parameters-repeated-measure-stdev/parameters-repeated-measure-stdev.po';
import {ParametersRepeatedMeasureCorellationsPo} from './parameters-repeated-measure-correlations/parameters-repeated-measure-corellations.po';
import {ParametersIntraClassCorellationPo} from './parameters-intra-class-correlation/parameters-intra-class-corellation.po';
import {ParametersGaussianCovariateVariancePo} from './parameters-gaussian-covariate-variance/parameters-gaussian-covariate-variance.po';
import {ParametersGaussianCovariateCorellationPo} from './parameters-gaussian-covariate-correlation/parameters-gaussian-covariate-corellation.po';
import {constants, getStageName} from '../shared/constants';
import {CalculatePo} from './calculate/calculate.po';
import {OptionalSpecsConfidenceIntervalsPo} from './optional-specs-confidence-intervals/optional-specs-confidence-intervals.po';
import {ParametersGaussianPowerPo} from './parameters-gaussian-power/parameters-gaussian-power.po';

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
  parameters_outcome_repeated_measure_stdev: ParametersRepeatedMeasureStdevPo;
  parameters_repeated_measure_correlations: ParametersRepeatedMeasureCorellationsPo;
  parameters_intra_class_correlation: ParametersIntraClassCorellationPo;
  parameters_gaussian_covariate_variance: ParametersGaussianCovariateVariancePo;
  parameters_gaussian_covariate_correlation: ParametersGaussianCovariateCorellationPo;
  parameters_gaussian_covariate_power: ParametersGaussianPowerPo;
  parameters_scale_factor_variance: ParametersVarianceScaleFactorsPo;
  optional_specs_confidence_intervals: OptionalSpecsConfidenceIntervalsPo;
  calculate_component: CalculatePo;

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
    this.parameters_outcome_repeated_measure_stdev = new ParametersRepeatedMeasureStdevPo();
    this.parameters_repeated_measure_correlations = new ParametersRepeatedMeasureCorellationsPo();
    this.parameters_intra_class_correlation = new ParametersIntraClassCorellationPo();
    this.parameters_gaussian_covariate_variance = new ParametersGaussianCovariateVariancePo();
    this.parameters_gaussian_covariate_correlation = new ParametersGaussianCovariateCorellationPo();
    this.parameters_gaussian_covariate_power = new ParametersGaussianPowerPo();
    this.parameters_scale_factor_variance = new ParametersVarianceScaleFactorsPo();
    this.optional_specs_confidence_intervals = new OptionalSpecsConfidenceIntervalsPo();
    this.calculate_component = new CalculatePo();
  }

  fromJSON(input): Promise<any> {
    // Tried to do this with a while loop, but it didn't work. this.next() didn't function. Not sure why.
    return new Promise((resolve, reject) => {
      Object.keys(input).forEach(key => {
        browser.getCurrentUrl().then(value => {
          if (this.fillCurrentComponent(value, input)) {
            this.next();
          } else {
            resolve(true);
          }
        });
      });
    });
  }

  isStage(url, stage): boolean {
    return url.split('/')[4] === getStageName(stage)
  }

  fillCurrentComponent(url, input): boolean {
    let ret = true
    if ( this.isStage(url, constants.STAGES.SOLVE_FOR))  {
      this.solve_for.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.STATISTICAL_TESTS))  {
      this.statistical_tests.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.TYPE_ONE_ERROR))  {
      this.type_one_error.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.WITHIN_ISU_OUTCOMES))  {
      this.outcomes.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.WITHIN_ISU_REPEATED_MEASURES))  {
      this.repeated_measures.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.WITHIN_ISU_CLUSTERS))  {
      this.cluster.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.BETWEEN_ISU_PREDICTORS))  {
      this.predictors.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.BETWEEN_ISU_SMALLEST_GROUP))  {
      this.smallest_group.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.BETWEEN_ISU_GROUPS))  {
      this.groups.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.GAUSSIAN_COVARIATE))  {
      this.gaussian_covatiate.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.HYPOTHESIS_EFFECT_CHOICE))  {
      this.hypothesis.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.HYPOTHESIS_BETWEEN))  {
      this.hypothesis_between.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.HYPOTHESIS_WITHIN))  {
      this.hypothesis_within.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.HYPOTHESIS_THETA_0))  {
      this.theta0.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_MARGINAL_MEANS))  {
      this.marginal_means.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_SCALE_FACTOR))  {
      this.parameters_scale_factor.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_STANDARD_DEVIATION))  {
      this.parameters_standard_deviation.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_OUTCOME_CORRELATION))  {
      this.parameters_outcome_correlation.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_REPEATED_MEASURE_ST_DEV))  {
      this.parameters_outcome_repeated_measure_stdev.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_REPEATED_MEASURE_CORRELATION))  {
      this.parameters_repeated_measure_correlations.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_INTRA_CLASS_CORRELATION))  {
      this.parameters_intra_class_correlation.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_GAUSSIAN_COVARIATE_VARIANCE))  {
      this.parameters_gaussian_covariate_variance.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_GAUSSIAN_COVARIATE_CORRELATION))  {
      this.parameters_gaussian_covariate_correlation.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_GAUSSIAN_COVARIATE_POWER))  {
      this.parameters_gaussian_covariate_power.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.PARAMETERS_SCALE_FACTOR_VARIANCE))  {
      this.parameters_scale_factor_variance.fromJSON(input);
    } else if ( this.isStage(url, constants.STAGES.OPTIONAL_SPECS_CONFIDENCE_INTERVALS))  {
      this.optional_specs_confidence_intervals.fromJSON(input);
    } else {
      ret = false;
    }
    return ret;
  }

  calculate(): Promise<any> {
    browser.sleep(1000);
    return new Promise((resolve, reject) => {
      element(by.id('calculate')).click().then(val => {
        setTimeout(() => {
          // resolve once the results are back. I don't like the sleep above.
          resolve(true);
        }, 1000)
      });
    });
  }

  power(index: number): Promise<number> {
    return this.calculate_component.readPower(index);
  }

  targetPower(index: number, solveFor: string): Promise<number> {
    return this.calculate_component.readTargetPower(index, solveFor);
  }

  meansScaleFactor(index: number): Promise<number> {
    return this.calculate_component.readMeansScaleFactor(index);
  }

  varianceScaleFactor(index: number): Promise<number> {
    return this.calculate_component.readVarianceScaleFactor(index);
  }

  test(index: number): Promise<string> {
    return this.calculate_component.readTest(index);
  }

  alpha(index: number): Promise<number> {
    return this.calculate_component.readAlpha(index);
  }

  groupCombination(indexX: number, indexY: number): Promise<string> {
    return this.calculate_component.readGroupCombination(indexX, indexY);
  }

  totalSampleSize(): Promise<number> {
    return this.calculate_component.readTotalSampleSize();
  }

  perGroupSampleSize(index: number): Promise<number> {
    return this.calculate_component.readPerGroupSampleSize(index);
  }

  predictor(index: number): Promise<string> {
    return this.calculate_component.readPredictor(index);
  }

  level(index: number): Promise<string> {
    return this.calculate_component.readLevel(index);
  }

  output(): Promise<string> {
    return this.calculate_component.readOutput();
  }

  modelText(): Promise<string> {
    return this.calculate_component.readPost();
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

  triggerDetailTable(index: number) {
    element(by.id('result_display_row_' + index)).click()
  }
}
