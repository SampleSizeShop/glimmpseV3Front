import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalTestsComponent } from './statistical-tests.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';

describe('StatisticalTestsComponent', () => {
  let component: StatisticalTestsComponent;
  let fixture: ComponentFixture<StatisticalTestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalTestsComponent ],
      providers: [ StudyService, {provide: HttpClient, useClass: MockBackend} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('selectedTests should return true if value is in selectedTests', () => {
    expect(component.isSelected(component.statisticalTests.HOTELLING_LAWLEY)).toEqual(true);
  });

  it('selectedTests should return false if value is not in selectedTests', () => {
    expect(component.isSelected(component.statisticalTests.PILLAI_BARTLET)).toEqual(false);
  });

  it('should give all statistical test checkboxes active class if they are selected', () => {
    // Start with an empty set
    component.selectTest(component.statisticalTests.HOTELLING_LAWLEY)

    for (const test of Object.keys(component.statisticalTests)) {
      component.selectTest(component.statisticalTests[test]);
    }
    fixture.detectChanges();
    const activeElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.active'));
    expect(activeElements.length).toEqual(component.selectedTests.length);
  });
});
