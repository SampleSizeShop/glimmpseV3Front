import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HypothesisBetweenComponent } from './hypothesis-between.component';
import {HttpClient} from '@angular/common/http';
import {StudyService} from '../../shared/services/study.service';
import {MathJaxDirective} from '../../mathjax/mathjax.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub, RouterStub} from '../../../testing/router-stubs';
import {testEnvironment} from '../../../environments/environment.test';
import {
  LoggerConfig,
  LoggerModule,
  NGXLogger,
  NGXLoggerHttpService,
  NgxLoggerLevel,
  NGXMapperService
} from 'ngx-logger';
import {CustomContrastMatrixComponent} from '../custom-contrast-matrix/custom-contrast-matrix.component';
import { MatTooltip } from '@angular/material/tooltip';
import {NavigationService} from '../../shared/services/navigation.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {Outcome} from '../../shared/model/Outcome';

describe('HypothesisBetweenComponent', () => {
  let component: HypothesisBetweenComponent;
  let fixture: ComponentFixture<HypothesisBetweenComponent>;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  class MockISUFactors extends ISUFactors {
    constructor() {
      super();
      const outcome = new Outcome('outcome');
      this.variables.push(outcome);
    }
  }
});
