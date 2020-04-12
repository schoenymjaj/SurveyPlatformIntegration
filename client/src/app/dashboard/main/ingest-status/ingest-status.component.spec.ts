import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngestStatusComponent } from './ingest-status.component';

describe('IngestStatusComponent', () => {
  let component: IngestStatusComponent;
  let fixture: ComponentFixture<IngestStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngestStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
