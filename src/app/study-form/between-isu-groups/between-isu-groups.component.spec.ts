import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuGroupsComponent } from './between-isu-groups.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ISUFactors} from '../../shared/ISUFactors';
import {Predictor} from '../../shared/Predictor';
import {ActivatedRouteStub} from "../../../testing/router-stubs";
import {ActivatedRoute} from "@angular/router";
import {RelativeGroupSizeTable} from "../../shared/RelativeGroupSizeTable";

describe('BetweenIsuGroupsComponent', () => {
  let component: BetweenIsuGroupsComponent;
  let fixture: ComponentFixture<BetweenIsuGroupsComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    activatedRoute.testParamMap = {name: '0'};
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ BetweenIsuGroupsComponent ],
      providers: [
        StudyService,
        { provide: HttpClient, useClass: MockBackend },
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenIsuGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the group size form if we are solving for power and have predictors', () => {
    component.solveFor = 'POWER';
    component.isuFactors = new ISUFactors();
    component.isuFactors.variables.push(new Predictor());
    fixture.detectChanges();
    expect(component.isuFactors.predictors.length).toEqual(1);
    const desc: DebugElement = fixture.debugElement.query(By.css('#groupSizeForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should update the smallest group size', () => {
    component.solveFor = 'POWER';
    component.isuFactors = new ISUFactors();
    component.isuFactors.predictors.push(new Predictor());
    component.groupSizeForm.get('smallestGroupSize').setValue('2');
    fixture.detectChanges();
    expect(component.isuFactors.smallestGroupSize).toEqual('2');
  });
});
