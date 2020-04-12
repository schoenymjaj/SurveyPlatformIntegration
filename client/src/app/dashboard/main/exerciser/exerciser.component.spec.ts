import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciserComponent } from './exerciser.component';

describe('ExerciserComponent', () => {
  let component: ExerciserComponent;
  let fixture: ComponentFixture<ExerciserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
