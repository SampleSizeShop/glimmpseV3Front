import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuSmallestGroupComponent } from './between-isu-smallest-group.component';
import {ISUFactors} from '../../shared/ISUFactors';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {MockBackend} from '@angular/http/testing';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteStub} from '../../../testing/router-stubs';
import {StudyService} from '../study.service';

describe('BetweenIsuSmallestGroupComponent', () => {
  let component: BetweenIsuSmallestGroupComponent;
  let fixture: ComponentFixture<BetweenIsuSmallestGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ BetweenIsuSmallestGroupComponent ],
      providers: [
        StudyService,
        { provide: HttpClient, useClass: MockBackend },
        {provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenIsuSmallestGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the group size form', () => {
    component.isuFactors = new ISUFactors();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#groupSizeForm'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });
});
