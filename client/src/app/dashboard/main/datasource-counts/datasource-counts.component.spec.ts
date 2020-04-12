import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceCountsComponent } from './datasource-counts.component';

describe('DatasourceCountsComponent', () => {
  let component: DatasourceCountsComponent;
  let fixture: ComponentFixture<DatasourceCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourceCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
