import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusComponent } from './status.component';
import {MatIconModule} from "@angular/material/icon";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MathJaxDirective} from "../../mathjax/mathjax.directive";
import {StudyService} from "../../shared/services/study.service";
import {MockBackend} from "@angular/http/testing";
import {HttpClient} from "@angular/common/http";

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusComponent, MathJaxDirective ],
      providers: [
        StudyService,
        {provide: HttpClient, useClass: MockBackend}
      ],
      imports: [
        NgbModule,
        MatIconModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
