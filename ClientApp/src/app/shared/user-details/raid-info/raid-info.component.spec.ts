import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidInfoComponent } from './raid-info.component';

describe('RaidInfoComponent', () => {
  let component: RaidInfoComponent;
  let fixture: ComponentFixture<RaidInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaidInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaidInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
