import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlHelpTextComponent } from './control-help-text.component';
import {MatIconModule} from "@angular/material";

describe('ControlHelpTextComponent', () => {
  let component: ControlHelpTextComponent;
  let fixture: ComponentFixture<ControlHelpTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatIconModule ],
      declarations: [ ControlHelpTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlHelpTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
