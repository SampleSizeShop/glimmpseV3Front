import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuGroupsComponent } from './between-isu-groups.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {ActivatedRouteStub} from '../../../testing/router-stubs';
import {ActivatedRoute} from '@angular/router';

describe('BetweenIsuGroupsComponent', () => {
  let component: BetweenIsuGroupsComponent;
  let fixture: ComponentFixture<BetweenIsuGroupsComponent>;
  let activatedRoute: ActivatedRouteStub;
  /**
  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = {index: '0'};
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
  }); **/
});
