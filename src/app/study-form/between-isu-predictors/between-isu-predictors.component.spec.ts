import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuPredictorsComponent } from './between-isu-predictors.component';
import {StudyService} from '../study.service';
import {HttpClient} from '@angular/common/http';
import {MockBackend} from '@angular/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Predictor} from '../../shared/model/Predictor';
import {NavigationService} from '../../shared/services/navigation.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NGXLogger} from 'ngx-logger';


describe('BetweenIsuPredictorsComponent', () => {
  let component: BetweenIsuPredictorsComponent;
  let fixture: ComponentFixture<BetweenIsuPredictorsComponent>;

  const gender = new Predictor();
  gender.name = 'Gender';
  gender.valueNames = ['m', 'f'];

  const dose = new Predictor();
  dose.name = 'Dose';
  dose.valueNames = ['a', 'b', 'c'];

  const three = new Predictor();
  three.name = 'Three';
  three.valueNames = ['x', 'y', 'z'];

  const five = new Predictor();
  five.name = 'Five';
  five.valueNames = ['1', '2', '3', '4'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ BetweenIsuPredictorsComponent ],
      providers: [
        StudyService,
        NGXLogger,
        { provide: HttpClient, useClass: MockBackend },
        NavigationService,
        NgbModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenIsuPredictorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the add BetweenIsuPredictor Button if we are not currently editing a factorName', () => {
    component.setStage(component.stages.INFO);
    fixture.detectChanges();
    const desc: DebugElement = fixture.debugElement.query(By.css('#addbetweenbtn'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should not the add BetweenIsuPredictor Button if we have reached the predictors limit', () => {
    component.betweenIsuPredictors = new Array<Predictor>();
    component.setStage(component.stages.INFO);
    for ( let i = 0; i < component.maxPredictors; i++ ) {
      component.betweenIsuPredictors.push(new Predictor());
    }
    fixture.detectChanges();
    const btn: DebugElement = fixture.debugElement.query(By.css('#addbetweenbtn'));
    expect(!btn);
    const desc: DebugElement = fixture.debugElement.query(By.css('#maxPredictors'));
    const el = desc.nativeElement;
    expect(el).toBeTruthy();
  });

  it('Should add a group when we click add group', () => {
    component.setStage(component.stages.INFO);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.addName();
    component.addType();
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    fixture.detectChanges();
    expect(component.groups.length).toEqual(1);
  });

  it('Should add a group when we click add group', () => {
    component.setStage(component.stages.INFO);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.addName();
    component.addType();
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.removeGroup('a1')
    fixture.detectChanges();
    expect(component.groups.length).toEqual(0);
  });

  it('Should add a BetweenIsuPredictor to the study design and give the option to add another,' +
    ' once we have added valueNames and clicked next', () => {
    component.setStage(component.stages.INFO);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.addName();
    component.addType();
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.groupsForm.get('group').setValue('a2');
    component.addGroup();
    fixture.detectChanges();
    component.addPredictor();
    fixture.detectChanges();
    expect(component.betweenIsuPredictors.length).toEqual(1);
  });

  it('Should remove a BetweenIsuPredictor when we click the remove button', () => {
    component.setStage(component.stages.INFO);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.addName();
    component.addType();
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.groupsForm.get('group').setValue('a2');
    component.addGroup();
    fixture.detectChanges();
    component.addPredictor();
    fixture.detectChanges();
    component.removePredictor(component.betweenIsuPredictors[0]);
    expect(component.betweenIsuPredictors.length).toEqual(0);
  });

  it('Should allow us to edit a BetweenIsuPredictor when we click the edit button', () => {
    component.setStage(component.stages.INFO);
    component.includePredictors();
    component.predictorForm.get('predictorName').setValue('A');
    component.addName();
    component.addType();
    component.groupsForm.get('group').setValue('a1');
    component.addGroup();
    component.groupsForm.get('group').setValue('a2');
    component.addGroup();
    fixture.detectChanges();
    component.addPredictor()
    const predictor = component.betweenIsuPredictors[0];
    component.editPredictor(predictor);
    fixture.detectChanges();
    expect(component.betweenIsuPredictors.length).toEqual(1);
    expect(component.groups.length).toEqual(predictor.valueNames.length)
    expect(component.predictorForm.value.predictorName).toEqual(predictor.name);
  });
});
