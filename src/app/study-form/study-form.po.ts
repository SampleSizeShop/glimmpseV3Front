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
import {ParametersMarginalMeansPo} from "./parameters-marginal-means/parameters-marginal-means.po";
import {ParametersScaleFactorPo} from "./parameters-scale-factor/parameters-scale-factor.po";
import {ParametersStandardDeviationPo} from "./parameters-standard-deviation/parameters-standard-deviation.po";

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
  }

  fromJSON(input) {
    this.sleep(100);
    this.user_mode.fromJSON(input);
    this.next();
    this.sleep(100);
    this.target_event.fromJSON(input);
    this.next();
    this.sleep(100);
    this.solve_for.fromJSON(input);
    this.next();
    this.sleep(100);
    this.statistical_tests.fromJSON(input);
    this.next();
    this.sleep(100);
    this.type_one_error.fromJSON(input);
    this.next();
    this.sleep(100);
    this.outcomes.fromJSON(input);
    this.next();
    this.sleep(100);
    this.repeated_measures.fromJSON(input);
    this.next();
    this.sleep(100);
    this.cluster.fromJSON(input);
    this.next();
    this.sleep(100);
    this.predictors.fromJSON(input);
    this.next();
    this.sleep(100);
    this.smallest_group.fromJSON(input);
    this.next();
    this.sleep(100);
    this.groups.fromJSON(input);
    this.next();
    this.sleep(100);
    this.gaussian_covatiate.fromJSON(input);
    this.next();
    this.sleep(100);
    this.hypothesis.fromJSON(input);
    this.next();
    this.sleep(100);
    this.hypothesis_between.fromJSON(input);
    this.next();
    this.sleep(100);
    this.hypothesis_within.fromJSON(input);
    this.next();
    this.sleep(100);
    this.theta0.fromJSON(input);
    this.next();
    this.sleep(100);
    this.marginal_means.fromJSON(input);
    this.next();
    this.sleep(100);
    this.parameters_scale_factor.fromJSON(input);
    this.next();
    this.sleep(100);
    this.parameters_standard_deviation.fromJSON(input);
    this.sleep(4000);
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

  refresh() {
    browser.refresh();
  };

  browserBack() {
    browser.navigate().back();
  };

  browserForward() {
    browser.navigate().forward();
  };

  getRouterURLString() {
    return browser.getCurrentUrl().then(url => url.split('/').pop());
  };

  getElementClass(cid: string) {
    return element(by.id(cid)).getAttribute('class')
  };

  findContentById(cid: string) {
    return element(by.id(cid))
  };

  findContentByClass(ccls: string) {
    return element(by.className(ccls));
  };

  findAllcontentById(cid: string) {
    return element.all(by.id(cid));
  };

  sleep(ms: number) {
    browser.sleep(ms);
  };

  findAllByClass(ccls: string) {
    return element.all(by.className(ccls));
  };

  findAllByTag(tag: string) {
    return element.all(by.tagName(tag));
  };

  findByTag(tag: string) {
    return element(by.tagName(tag));
  };

  findByCssWithText(cls: string, txt: string) {
    return element(by.cssContainingText(cls, txt))
  };

  findContentByCss(ccss: string) {
    return element(by.css(ccss));
  };

  clickEnterKey() {
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  };

  findByPartialLinkText(txt: string) {
    return element(by.partialLinkText(txt));
  };
}
