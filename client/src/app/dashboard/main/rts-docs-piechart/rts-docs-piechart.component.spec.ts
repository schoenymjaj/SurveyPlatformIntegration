import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CirdsPiechartComponent } from './rts-docs-piechart-component';

describe('CirdsPiechartComponent', () => {
  let component: CirdsPiechartComponent;
  let fixture: ComponentFixture<CirdsPiechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirdsPiechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirdsPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
