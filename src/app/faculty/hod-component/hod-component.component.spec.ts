import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HodComponentComponent } from './hod-component.component';

describe('HodComponentComponent', () => {
  let component: HodComponentComponent;
  let fixture: ComponentFixture<HodComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HodComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HodComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
