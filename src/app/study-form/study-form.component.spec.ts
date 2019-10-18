import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudyFormComponent} from './study-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/services/study.service';
import {UserModeComponent} from './user-mode/user-mode.component';
import {SolveForComponent} from './solve-for/solve-for.component';
import {LoggerModule} from 'ngx-logger';
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
import {ParametersRepeatedMeasureStdevComponent} from './parameters-repeated-measure-stdev/parameters-repeated-measure-stdev.component';
import {ParametersRepeatedMeasureCorrelationsComponent} from './parameters-repeated-measure-correlations/parameters-repeated-measure-correlations.component';
import {ParametersStandardDeviationComponent} from './parameters-standard-deviation/parameters-standard-deviation.component';
import {ParametersIntraClassCorrelationComponent} from './parameters-intra-class-correlation/parameters-intra-class-correlation.component';
import {ParametersGaussianCovariateVarianceComponent} from './parameters-gaussian-covariate-variance/parameters-gaussian-covariate-variance.component';
import {ParametersGaussianCovariateCorrelationComponent} from './parameters-gaussian-covariate-correlation/parameters-gaussian-covariate-correlation.component';
import {ParametersVarianceScaleFactorsComponent} from './parameters-variance-scale-factors/parameters-variance-scale-factors.component';
import {CalculateComponent} from './calculate/calculate.component';
import {testEnvironment} from '../../environments/environment.test';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomContrastMatrixComponent} from './custom-contrast-matrix/custom-contrast-matrix.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import {StudyTitleComponent} from './study-title/study-title.component';
import {NodeVisualComponent} from '../d3/visuals/shared/node-visual/node-visual.component';
import {LinkVisualComponent} from '../d3/visuals/shared/link-visual/link-visual.component';
import {ZoomableDirective} from '../d3/directives/zoomable.directive';
import {CollapsibleTreeComponent} from '../d3/visuals/collapsible-tree/collapsible-tree.component';
import {StatusComponent} from './status/status.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ControlHelpTextComponent} from './control-help-text/control-help-text.component';

describe('StudyFormComponent', () => {
  let component: StudyFormComponent;
  let fixture: ComponentFixture<StudyFormComponent>;
  let getSpy;

  beforeEach(async(() => {
    console.log('hello');
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        NgbModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel}) ],
      declarations: [
        MatTooltip,
        StudyFormComponent,
        UserModeComponent,
        StudyTitleComponent,
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
        ParametersRepeatedMeasureStdevComponent,
        ParametersRepeatedMeasureCorrelationsComponent,
        ParametersStandardDeviationComponent,
        ParametersIntraClassCorrelationComponent,
        ParametersGaussianCovariateVarianceComponent,
        ParametersGaussianCovariateCorrelationComponent,
        ParametersVarianceScaleFactorsComponent,
        CalculateComponent,
        MathJaxDirective,
        CustomContrastMatrixComponent,
        MatTooltip,
        LinkVisualComponent,
        NodeVisualComponent,
        ZoomableDirective,
        CollapsibleTreeComponent,
        CustomContrastMatrixComponent,
        StatusComponent,
        ControlHelpTextComponent],
      providers: [ StudyService,
        ,
        RouterTestingModule ]
    })
    .compileComponents();
    console.log('hello2');
    fixture = TestBed.createComponent(StudyFormComponent);
    console.log('hello3');
    component = fixture.componentInstance;
    console.log('hello4');
    // fixture.detectChanges();
    console.log('hello5');
    getSpy = spyOn(component, 'getStage');
    console.log('hello6');
  }));

  // it('Should correctly set next and back boolean flags for the first stage', () => {
  //   getSpy.and.returnValue(1);
  //   component.setNextBack();
  //   expect(component.hasBack);
  //   expect(component.hasNext);
  //   fixture.detectChanges();
  // });
  //
  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  //   fixture.detectChanges();
  // });
  //
  // it('Should correctly set next and back boolean flags for the middle stages', () => {
  //   if ( component.noStages > 2 ) {
  //     for ( let i = 2 ; i <= component.noStages; i++ ) {
  //       getSpy.and.returnValue(i);
  //       component.setNextBack();
  //       expect(component.hasBack);
  //       expect(component.hasNext);
  //       fixture.detectChanges();
  //     }
  //   }
  // });
  //
  // it('Should correctly set next and back boolean flags for the last stage', () => {
  //   getSpy.and.returnValue(component.noStages);
  //   component.setNextBack();
  //   expect(component.hasBack);
  //   expect(!component.hasNext);
  //   fixture.detectChanges();
  // });

});
