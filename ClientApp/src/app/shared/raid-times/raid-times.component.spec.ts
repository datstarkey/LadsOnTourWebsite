import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidTimesComponent } from './raid-times.component';

describe('RaidTimesComponent', () => {
  let component: RaidTimesComponent;
  let fixture: ComponentFixture<RaidTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
