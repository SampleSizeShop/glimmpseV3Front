import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsCiBetaSampleSizeComponent } from './optional-specs-ci-beta-sample-size.component';

describe('OptionalSpecsCiBetaSampleSizeComponent', () => {
  let component: OptionalSpecsCiBetaSampleSizeComponent;
  let fixture: ComponentFixture<OptionalSpecsCiBetaSampleSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsCiBetaSampleSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsCiBetaSampleSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
