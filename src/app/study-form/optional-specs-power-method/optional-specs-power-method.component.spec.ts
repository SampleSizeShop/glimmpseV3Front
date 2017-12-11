import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsPowerMethodComponent } from './optional-specs-power-method.component';
import {StudyService} from '../study.service';
import {MockBackend} from '@angular/http/testing';
import {Http} from "@angular/http";

describe('OptionalSpecsPowerMethodComponent', () => {
  let component: OptionalSpecsPowerMethodComponent;
  let fixture: ComponentFixture<OptionalSpecsPowerMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsPowerMethodComponent ],
      providers: [
        StudyService,
        {provide: Http, useClass: MockBackend}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsPowerMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
