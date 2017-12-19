import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudyFormComponent} from './study-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from './study.service';
import {UserModeComponent} from './user-mode/user-mode.component';
import {TargetEventComponent} from './target-event/target-event.component';
import {SolveForComponent} from './solve-for/solve-for.component';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {StatisticalTestsComponent} from './statistical-tests/statistical-tests.component';
import {TypeOneErrorComponent} from './type-one-error/type-one-error.component';
import {CorrelationMatrixComponent} from './correlation-matrix/correlation-matrix.component';
import {MathJaxDirective} from '../mathjax/mathjax.directive';
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
import {RouterTestingModule} from '@angular/router/testing';
import {ParametersScaleFactorComponent} from './parameters-scale-factor/parameters-scale-factor.component';
import {ParametersOutcomeCorrelationsComponent} from './parameters-outcome-correlations/parameters-outcome-correlations.component';
import {ParametersRepeatedMeasureOutcomeStDevComponent} from './parameters-repeated-measure-outcome-stdev/parameters-repeated-measure-outcome-stdev.component';
import {ParametersRepeatedMeasureCorrelationsComponent} from './parameters-repeated-measure-correlations/parameters-repeated-measure-correlations.component';
import {ParametersStandardDeviationComponent} from './parameters-standard-deviation/parameters-standard-deviation.component';
import {ParametersIntraClassCorrelationComponent} from './parameters-intra-class-correlation/parameters-intra-class-correlation.component';
import {ParametersGaussianCovariateVarianceComponent} from './parameters-gaussian-covariate-variance/parameters-gaussian-covariate-variance.component';
import {ParametersGaussianCovariateCorrelationComponent} from './parameters-gaussian-covariate-correlation/parameters-gaussian-covariate-correlation.component';
import {ParametersVarianceScaleFactorsComponent} from './parameters-variance-scale-factors/parameters-variance-scale-factors.component';
import {OptionalSpecsPowerMethodComponent} from './optional-specs-power-method/optional-specs-power-method.component';
import {OptionalSpecsCiChoiceComponent} from './optional-specs-ci-choice/optional-specs-ci-choice.component';
import {OptionalSpecsCiAssumptionsComponent} from './optional-specs-ci-assumptions/optional-specs-ci-assumptions.component';
import {OptionalSpecsCiLowerTailComponent} from './optional-specs-ci-lower-tail/optional-specs-ci-lower-tail.component';
import {OptionalSpecsCiUpperTailComponent} from './optional-specs-ci-upper-tail/optional-specs-ci-upper-tail.component';
import {OptionalSpecsCiBetaSampleSizeComponent} from './optional-specs-ci-beta-sample-size/optional-specs-ci-beta-sample-size.component';
import {OptionalSpecsCiBetaDesignMatrixRankComponent} from './optional-specs-ci-beta-design-matrix-rank/optional-specs-ci-beta-design-matrix-rank.component';
import {OptionalSpecsPowerCurveChoiceComponent} from './optional-specs-power-curve-choice/optional-specs-power-curve-choice.component';
import {OptionalSpecsPowerCurveAxesComponent} from './optional-specs-power-curve-axes/optional-specs-power-curve-axes.component';
import {OptionalSpecsPowerCurveDataSeriesComponent} from './optional-specs-power-curve-data-series/optional-specs-power-curve-data-series.component';
import {CalculateComponent} from './calculate/calculate.component';

describe('StudyFormComponent', () => {
  let component: StudyFormComponent;
  let fixture: ComponentFixture<StudyFormComponent>;
  let getSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'design/MODE', component: UserModeComponent}
        ]),
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'}) ],
      declarations: [
        StudyFormComponent,
        UserModeComponent,
        TargetEventComponent,
        SolveForComponent,
        StatisticalTestsComponent,
        TypeOneErrorComponent,
        WithinIsuOutcomesComponent,
        WithinIsuRepeatedMeasuresComponent,
        WithinIsuClustersComponent,
        BetweenIsuPredictorsComponent,
        BetweenIsuGroupsComponent,
        GaussianCovariateComponent,
        HypothesisEffectChoiceComponent,
        HypothesisBetweenComponent,
        HypothesisWithinComponent,
        ParametersMarginalMeansComponent,
        ParametersScaleFactorComponent,
        CorrelationMatrixComponent,
        ParametersOutcomeCorrelationsComponent,
        ParametersRepeatedMeasureOutcomeStDevComponent,
        ParametersRepeatedMeasureCorrelationsComponent,
        ParametersStandardDeviationComponent,
        ParametersIntraClassCorrelationComponent,
        ParametersGaussianCovariateVarianceComponent,
        ParametersGaussianCovariateCorrelationComponent,
        ParametersVarianceScaleFactorsComponent,
        OptionalSpecsPowerMethodComponent,
        OptionalSpecsCiChoiceComponent,
        OptionalSpecsCiAssumptionsComponent,
        OptionalSpecsCiLowerTailComponent,
        OptionalSpecsCiUpperTailComponent,
        OptionalSpecsCiBetaSampleSizeComponent,
        OptionalSpecsCiBetaDesignMatrixRankComponent,
        OptionalSpecsPowerCurveChoiceComponent,
        OptionalSpecsPowerCurveAxesComponent,
        OptionalSpecsPowerCurveDataSeriesComponent,
        CalculateComponent,
        MathJaxDirective],
      providers: [ StudyService,
        { provide: Http, useClass: MockBackend },
        {provide: NGXLogger, useClass: NGXLoggerMock},
        RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    getSpy = spyOn(component, 'getStage');
    spyOn(component, 'setStage');
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Still valid?
  it('Should set the stage when next is called', () => {
    if ( component.stages ) {
      for ( let i = 1 ; i <= component.noStages; i++ ) {
        getSpy.and.returnValue(i)
        component.next();
      }
      expect(component.setStage).toHaveBeenCalledTimes(component.noStages );
    } else {
      expect(false)
    }
  });

  // TODO: Still valid?
  it('Should set the stage when back is called unless we are ate stage 1', () => {
    if ( component.stages ) {
      for ( let i = 1 ; i <= component.noStages; i++ ) {
        getSpy.and.returnValue(i)
        component.next();
      }
      expect(component.setStage).toHaveBeenCalledTimes(component.noStages );
    } else {
      expect(false)
    }
  });

  it('Should correctly set next and back boolean flags for the first stage', () => {
    getSpy.and.returnValue(1);
    component.setNextBack()
    expect(component.hasBack)
    expect(component.hasNext)
  });

  it('Should correctly set next and back boolean flags for the middle stages', () => {
    if ( component.noStages > 2 ) {
      for ( let i = 2 ; i <= component.noStages; i++ ) {
        getSpy.and.returnValue(i)
        component.setNextBack()
        expect(component.hasBack)
        expect(component.hasNext)
      }
    }
  });

  it('Should correctly set next and back boolean flags for the last stage', () => {
    getSpy.and.returnValue(component.noStages);
    component.setNextBack()
    expect(component.hasBack)
    expect(!component.hasNext)
  });

});
