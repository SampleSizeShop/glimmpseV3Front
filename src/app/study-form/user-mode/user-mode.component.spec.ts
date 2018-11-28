import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModeComponent } from './user-mode.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../study.service';
import {MockBackend} from '@angular/http/testing';
import {HttpClient} from '@angular/common/http';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NavigationService} from '../../shared/navigation.service';

describe('UserModeComponent', () => {
  let component: UserModeComponent;
  let fixture: ComponentFixture<UserModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ UserModeComponent ],
      providers: [ StudyService, NavigationService, { provide: HttpClient, useClass: MockBackend } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('select Guided should select guided mode', () => {
    component.selectGuided();
    fixture.detectChanges();
    expect(component.guided);
  });

  it('select Flexible should select guided mode', () => {
    component.selectFlex();
    fixture.detectChanges();
    expect(!component.guided);
  });

  it('should show Guided mode description when guided mode is selected', () => {
    component.selectGuided();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#guideddesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should show Flex mode description when flex mode is selected', () => {
    component.selectFlex();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#flexdesc'));
    const el: HTMLElement = desc.nativeElement;
    expect(el);
  });

  it('should not Flex mode description when guided mode is selected', () => {
    component.selectGuided();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#flexdesc'));
    expect(!desc);
  });

  it('should not Guided mode description when flex mode is selected', () => {
    component.selectFlex();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#guideddesc'));
    expect(!desc);
  });

  it('should give Guided button active class if Guided Mode is selected', () => {
    component.selectGuided();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('guidedbtn')
  });

  it('should give Flex button active class if Flex Mode is selected', () => {
    component.selectFlex();
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('.active'));
    const el = desc.nativeElement;
    expect(el.id).toEqual('flexbtn')
  });
});
