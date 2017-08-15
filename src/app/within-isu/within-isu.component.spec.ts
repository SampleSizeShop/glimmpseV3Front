import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitinIsuComponent } from './within-isu.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RepeatedMeasure} from '../shared/RepeatedMeasure';
import {RepeatedMeasureComponent} from '../repeated-measure/repeated-measure.component';
import {CorrelationMatrixComponent} from '../correlation-matrix/correlation-matrix.component';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('WitinIsuComponent', () => {
  let component: WitinIsuComponent;
  let fixture: ComponentFixture<WitinIsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ WitinIsuComponent, RepeatedMeasureComponent, CorrelationMatrixComponent ],
      providers: [ RepeatedMeasure, StudyService, { provide: Http, useClass: MockBackend } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitinIsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
