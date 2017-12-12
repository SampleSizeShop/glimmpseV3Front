import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSpecsCiBetaDesignMatrixRankComponent } from './optional-specs-ci-beta-design-matrix-rank.component';

describe('OptionalSpecsCiBetaDesignMatrixRankComponent', () => {
  let component: OptionalSpecsCiBetaDesignMatrixRankComponent;
  let fixture: ComponentFixture<OptionalSpecsCiBetaDesignMatrixRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalSpecsCiBetaDesignMatrixRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalSpecsCiBetaDesignMatrixRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
