import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinIsuRepeatedMeasuresComponent } from './within-isu-repeated-measures.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {NavigationService} from '../shared/navigation.service';

describe('WithinIsuRepeatedMeasuresComponent', () => {
  let component: WithinIsuRepeatedMeasuresComponent;
  let fixture: ComponentFixture<WithinIsuRepeatedMeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ WithinIsuRepeatedMeasuresComponent ],
      providers: [StudyService, {provide: Http, useClass: MockBackend}, NavigationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinIsuRepeatedMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
