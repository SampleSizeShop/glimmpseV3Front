import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitinIsuComponent } from './witin-isu.component';

describe('WitinIsuComponent', () => {
  let component: WitinIsuComponent;
  let fixture: ComponentFixture<WitinIsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitinIsuComponent ]
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
