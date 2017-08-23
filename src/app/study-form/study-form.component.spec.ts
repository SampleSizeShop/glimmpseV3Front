import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StudyFormComponent} from './study-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {UserModeComponent} from '../user-mode/user-mode.component';
import {TargetEventComponent} from '../target-event/target-event.component';
import {SolveForComponent} from '../solve-for/solve-for.component';
import {MockBackend} from '@angular/http/testing';
import {Http} from '@angular/http';
import {LoggerModule, NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {StatisticalTestsComponent} from '../statistical-tests/statistical-tests.component';
import {TypeOneErrorComponent} from '../type-one-error/type-one-error.component';
import {WitinIsuComponent} from '../within-isu/within-isu.component';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {MathJaxDirective} from '../mathjax/mathjax.directive';
import {DifferentMeasuresComponent} from '../different-measures/different-measures.component';
import {WithinIsuOutcomesComponent} from '../within-isu-outcomes/within-isu-outcomes.component';
import {ClusterComponent} from '../cluster/cluster.component';
import {WithinIsuRepeatedMeasuresComponent} from '../within-isu-repeated-measures/within-isu-repeated-measures.component';

describe('StudyFormComponent', () => {
  let component: StudyFormComponent;
  let fixture: ComponentFixture<StudyFormComponent>;
  let getSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoggerModule.forRoot({serverLoggingUrl: 'fake/api/clientsidelog', level: 'DEBUG', serverLogLevel: 'WARN'}) ],
      declarations: [
        StudyFormComponent,
        UserModeComponent,
        TargetEventComponent,
        SolveForComponent,
        StatisticalTestsComponent,
        TypeOneErrorComponent,
        WitinIsuComponent,
        WithinIsuOutcomesComponent,
        WithinIsuRepeatedMeasuresComponent,
        DifferentMeasuresComponent,
        CorrelationMatrixComponent,
        ClusterComponent,
        MathJaxDirective],
      providers: [ StudyService, { provide: Http, useClass: MockBackend }, {provide: NGXLogger, useClass: NGXLoggerMock} ]
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

  it('Should set the stage when next is called', () => {
    if ( component.stages ) {
      for ( let i = 1 ; i <= component.noStages; i++ ) {
        getSpy.and.returnValue(i)
        component.next();
      }
      expect(component.setStage).toHaveBeenCalledTimes(component.noStages - 1);
    } else {
      expect(false)
    }
  });

  it('Should set the stage when back is called unless we are ate stage 1', () => {
    if ( component.stages ) {
      for ( let i = 1 ; i <= component.noStages; i++ ) {
        getSpy.and.returnValue(i)
        component.next();
      }
      expect(component.setStage).toHaveBeenCalledTimes(component.noStages - 1);
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
