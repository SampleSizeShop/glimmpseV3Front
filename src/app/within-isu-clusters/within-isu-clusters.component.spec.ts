import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinIsuClustersComponent } from './within-isu-clusters.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../shared/study.service';
import {Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {NavigationService} from '../shared/navigation.service';

describe('WithinIsuClustersComponent', () => {
  let component: WithinIsuClustersComponent;
  let fixture: ComponentFixture<WithinIsuClustersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [ WithinIsuClustersComponent ],
      providers: [ StudyService,  { provide: Http, useClass: MockBackend}, NavigationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithinIsuClustersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
