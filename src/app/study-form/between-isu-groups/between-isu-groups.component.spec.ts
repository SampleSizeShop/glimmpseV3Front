import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuGroupsComponent } from './between-isu-groups.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {ActivatedRouteStub} from '../../../testing/router-stubs';
import {ActivatedRoute} from '@angular/router';
import {NGXLogger, NGXLoggerMock} from 'ngx-logger';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {RelativeGroupSizeTable} from '../../shared/model/RelativeGroupSizeTable';
import {ISUFactorCombination} from '../../shared/model/ISUFactorCombination';
import {CombinationId} from '../../shared/model/CombinationId';
import { MatTooltip } from '@angular/material/tooltip';
import {NavigationService} from '../../shared/services/navigation.service';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";

describe('BetweenIsuGroupsComponent', () => {
  let component: BetweenIsuGroupsComponent;
  let fixture: ComponentFixture<BetweenIsuGroupsComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = {index: '0'};
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        NgbModule,
        MatIconModule],
      declarations: [ BetweenIsuGroupsComponent,
        MatTooltip ],
      providers: [
        StudyService,
        NavigationService,
        {provide: HttpClient, useClass: MockBackend},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub },
        {provide: NGXLogger, useClass: NGXLoggerMock}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenIsuGroupsComponent);
    component = fixture.componentInstance;
    const interceptId = new CombinationId('Intercept', 'Intercept' ,  'Intercept');
    const intercept = new ISUFactorCombination([interceptId]);
    const interceptTable = new RelativeGroupSizeTable(intercept, [[intercept]]);
    component.isuFactors = new ISUFactors();
    component.isuFactors.betweenIsuRelativeGroupSizes.push(interceptTable);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
