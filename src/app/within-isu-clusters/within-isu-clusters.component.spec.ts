import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithinIsuClustersComponent } from './within-isu-clusters.component';

describe('WithinIsuClustersComponent', () => {
  let component: WithinIsuClustersComponent;
  let fixture: ComponentFixture<WithinIsuClustersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithinIsuClustersComponent ]
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
