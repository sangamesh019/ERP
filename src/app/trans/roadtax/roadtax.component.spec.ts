import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadtaxComponent } from './roadtax.component';

describe('RoadtaxComponent', () => {
  let component: RoadtaxComponent;
  let fixture: ComponentFixture<RoadtaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadtaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadtaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
