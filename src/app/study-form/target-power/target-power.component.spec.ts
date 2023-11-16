import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetPowerComponent } from './target-power.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ControlHelpTextComponent} from '../control-help-text/control-help-text.component';
import { MatIconModule } from '@angular/material/icon';
import {NavigationService} from '../../shared/services/navigation.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StudyService} from '../../shared/services/study.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoggerModule} from 'ngx-logger';
import {testEnvironment} from '../../../environments/environment.test';

describe('TargetPowerComponent', () => {
  let component: TargetPowerComponent;
  let fixture: ComponentFixture<TargetPowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatIconModule,
        LoggerModule.forRoot({
          serverLoggingUrl: testEnvironment.serverLoggingUrl,
          level: testEnvironment.loglevel,
          serverLogLevel: testEnvironment.loglevel
        })
      ],
      declarations: [
        TargetPowerComponent,
        ControlHelpTextComponent
      ],
      providers: [
        StudyService,
        NavigationService,
        NgbModal,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
